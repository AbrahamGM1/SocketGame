import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService extends Socket {

  constructor(private cookieService:CookieService) { 
    super({
      url:'http://localhost:3000',
      options:{
        query:{
          idRoom:cookieService.get('idroom')
        }
      }
    });


    this.on('connect', () => {
      console.log('✅ Conectado al servidor de WebSockets con ID:', this.ioSocket.id);
    });

    this.on('disconnect', () => {
      console.log('❌ Desconectado del servidor de WebSockets');
    });

  }
}
