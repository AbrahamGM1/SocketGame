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

    const {idRoom, playerName} = socket.handshake.query;

    console.log(`Hola usuario:${playerName} bienvenido a la sala -${idRoom}-`)

    socket.join(idRoom, playerName);

    socket.on('message', (res)=>{
      const data = res;
      console.log(res)

      //El socket.to sirve para enviar los datos a todos los usuarios del grupo menos al autor
      socket.to(idRoom).emit('message',data)
    })


    socket.on('playername', (res) =>{
      const data = res;
      socket.to(idRoom).emit('playername',data)
    })

})

server.listen(3000,()=>{
    console.log('Funcionando desde el puerto 3000')
})