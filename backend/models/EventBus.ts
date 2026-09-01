import type {GameEvent, GameEventPayloads} from "../types/GameEventPayloads.ts";

type EventCallback<T> = (payload: T) => void;

export class EventBus {
    private listeners: Record<GameEvent, Function[]> = {} as Record<GameEvent, Function[]>;

    on<K extends GameEvent>(event: K, callback: EventCallback<GameEventPayloads[K]>): () => void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(callback);

        return () => this.off(event, callback);
    }

    off<K extends GameEvent>(event: K, callback: EventCallback<GameEventPayloads[K]>): void {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event]!.filter((cb) => cb !== callback);
    }

    emit<K extends keyof GameEventPayloads>(event: K, payload: GameEventPayloads[K]): void {
        const callbacks = this.listeners[event];
        if (callbacks) {
            callbacks.forEach((callback) => callback(payload));
        }
    }
}

export const events = new EventBus();