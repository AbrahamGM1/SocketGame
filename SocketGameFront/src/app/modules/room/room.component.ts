import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {

  games:string[] = ['Click Game', 'Tic Tac Toe', 'Type Game']
  currentDescription:string = ''

  changeDescription(game:string){
    this.currentDescription = game;
  }

}
