const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:4200", // Permitir solo el frontend de Angular
      methods: ["GET", "POST"]
    }
  });

const rooms = []


io.on('connection',(socket)=>{

    const idConnection = socket.id;
    const {idRoom, playerName} = socket.handshake.query;

    //Buscamos si existe la sala dentro del objeto donde se guardan
    const currentRoom = rooms.find((newroom) => { return newroom.room == idRoom})
    //Aquí podría salir undefined si es que no encontró nada
    console.log("El objeto de la sala encontró lo siguiente: ", currentRoom)

    //Si existe la sala dentro del objeto, deberemos comparar si hay espacio disponible dentro de la sala
    if(currentRoom){
      console.log("Cantidad de jugadores en esta sala: ", currentRoom.players.length)
      //Si hay espacio disponible, agrega un jugador mas
      if(currentRoom.players.length<2 ){
        currentRoom.players.push({name:playerName, id:idConnection}) 
      } else {
        console.log('Ya no hay espacios disponibles dentro de la sala')
        socket.disconnect()
      }
    }

    //Si no existe la sala dentro del objeto, lo creamos.
    if(!currentRoom){
      const newRoom = {room:idRoom, players:[{name:playerName, id:idConnection}]}
      rooms.push(newRoom)
      console.log('Se ha creado una sala dentro del objeto: ', rooms)
    }

    console.log(`Hola usuario:${playerName} bienvenido a la sala -${idRoom}- tu ID es: ${idConnection}`)
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