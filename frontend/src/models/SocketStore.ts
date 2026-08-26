import { makeAutoObservable } from 'mobx';
import type {ClientMessage, ServerMessage} from '../../../types/socet.type'

export class SocketStore {
    socket: WebSocket | null = null;
    isConnected = false;
    private listeners: Array<(data: any) => void> = [];
    private messageQueue: any[] = [];

    get lis() {
        return this.socket;
    }

    constructor() {
        makeAutoObservable(this);
    }

    connect(url: string) {
        if (this.socket) return;

        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            this.setIsConnected(true);
            console.log('WS подключен');
        };

        this.socket.onmessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);

                // ВСЕГДА добавляй в очередь
                this.messageQueue.push(data);
                
                // И отправи всем текущим слушателям
                this.listeners.forEach((callback) => callback(data));
            } catch (e) {
                console.error('Ошибка парсинга WS сообщения:', e);
            }
        };

        this.socket.onclose = () => {
            this.setIsConnected(false);
            this.socket = null;
            console.log('WS отключен');
        };

        this.socket.onerror = (error) => {
            console.error('Ошибка WebSocket:', error);
        };
    }

    setIsConnected(status: boolean) {
        this.isConnected = status;
    }

    send(data: ClientMessage) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('Сокет не подключен или находится в процессе соединения', {
                socketExists: !!this.socket,
                readyState: this.socket?.readyState
            });
        }
    }

    onMessage(callback: (data: ServerMessage) => void) {
        this.listeners.push(callback);
        
        const queue = [...this.messageQueue];
        this.messageQueue = [];
        queue.forEach((data) => {
            callback(data);
        });
        
        return () => {
            const index = this.listeners.indexOf(callback);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
}