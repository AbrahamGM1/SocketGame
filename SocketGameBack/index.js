import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from "cors";

const app = express();
const server = createServer(app);
const PORT = process.env.PORT ?? 3000;
const io = new Server(server,{
    cors:{
        origin:"*",
    },
});

//Activar cors para todas las peticiones
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Hola desde el server</h1>');
});

io.on("connection",(socket)=>{
    console.log("Un cliente se ha conectado");
    socket.on("disconnect",()=>{
        console.log("Cliente desconectado");
    });
});

server.listen(PORT, () => {
  console.log(`Aquí el server -- http://localhost:${PORT}`);
});