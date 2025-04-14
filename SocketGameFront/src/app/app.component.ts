import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoomComponent } from './modules/room/room.component';
import { ClickgameComponent } from './modules/clickgame/clickgame.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoomComponent, ClickgameComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'socketgame';

  menu:boolean = true;
  clickgame:boolean = false;

  //Recibir los outputs de los componentes desde aqui para cambiar los booleanos
  goToGame(game:string){

    if(game == 'Click Game'){
      this.menu = false;
      this.clickgame = true;
    }

  }


}
