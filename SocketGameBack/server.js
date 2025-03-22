const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:4200", // Permitir solo el frontend de Angular
      methods: ["GET", "POST"]
    }
  });


io.on('connection',(socket)=>{
    const idConnection = socket.id;

    const {idRoom} = socket.handshake.query;

    console.log(`Hola usuario:${idConnection} bienvenido a la sala -${idRoom}-`)
})

server.listen(3000,()=>{
    console.log('Funcionando desde el puerto 3000')
})