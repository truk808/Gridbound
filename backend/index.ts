import express from "express";
import { ExpressPeerServer } from "peer";

const app = express();
const PORT = process.env.PORT || 8000;

// Запуск HTTP-сервера Express
const server = app.listen(PORT, () => {
    console.log(`Сигнальный сервер запущен на порту ${PORT}`);
});

// Подключаем PeerServer к запущенному HTTP-серверу Express
const peerServer = ExpressPeerServer(server, {
    path: "/myapp",
    allow_discovery: true,
});

// Монтируем PeerServer как middleware
app.use("/peerjs", peerServer);

// Опционально: отслеживание подключений и отключений на стороне сервера
peerServer.on("connection", (client) => {
    console.log(`Игрок подключился. Peer ID: ${client.getId()}`);
});

peerServer.on("disconnect", (client) => {
    console.log(`Игрок отключился. Peer ID: ${client.getId()}`);
});