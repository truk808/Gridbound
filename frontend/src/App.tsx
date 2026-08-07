import './App.css';
import { useEffect } from "react";
import Peer from "peerjs";

declare global {
    interface Window {
        Peer: any;
    }
}

export function App() {

    useEffect(() => {
        // const PeerConstructor = window.Peer;
        //
        // // 1. Проверяем, загрузился ли скрипт из index.html
        // if (!PeerConstructor) {
        //     console.error("PeerJS script not loaded yet from CDN");
        //     return;
        // }

        // 2. Создаем экземпляр через NEW
        const peer = new Peer({
            host: 'localhost',
            port: 9000,
            path: '/myapp',
            secure: false
        });

        peer.on("open", function (id: string) {
            console.log("My peer ID is: " + id);
        });

        peer.on('error', (err: any) => {
            console.error('PeerJS Error Type:', err.type);
            console.error('Error Message:', err.message);
            console.error('Error:', err);
        });


        // 3. Закрываем peer при размонтировании (важно для React)
        return () => {
            peer.destroy();
        };

    }, []);

    function click() {
        console.log("click");
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", width: "300px", height:"500px", backgroundColor: "green" }}>

            </div>
            <input type="text"/>
            <button onClick={click}>+</button>
        </div>
    );
}