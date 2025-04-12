import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService extends Socket {

 callback:EventEmitter<any> = new EventEmitter();
 nameCallback:EventEmitter<any> = new EventEmitter();


  constructor(private cookieService:CookieService) { 
    super({
      url:'http://localhost:3000',
      options:{
        query:{
          idRoom:cookieService.get('idroom'),
          playerName:cookieService.get('playername')
        }
      }
    });

    this.on('connect', () => {
      console.log('✅ Conectado al servidor de WebSockets con ID:', this.ioSocket.id);
    });

    this.on('disconnect', () => {
      
      console.log('❌ Desconectado del servidor de WebSockets');

    });

    this.listen();

  }

  listen = () =>{
    this.ioSocket.on('message', (data:any) => {
      this.callback.emit(data)
      });   

    this.ioSocket.on('playername', (playerName:any) =>{
      console.log(playerName)
      this.nameCallback.emit(playerName)
    })
  }

  emitEvent = (payload = {}) =>{
    this.ioSocket.emit('message',payload);
  }

  emitPlayerName = (playerName:String) =>{
    this.ioSocket.emit('playername',playerName)
  }



}
