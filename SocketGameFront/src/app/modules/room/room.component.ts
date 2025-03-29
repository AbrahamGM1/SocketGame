import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {

  games:string[] = ['Click Game', 'Tic Tac Toe', 'Type Game']
  gameSelected:string = ''

  formJoin:FormGroup;
  formCreate:FormGroup;

  optionSelected:boolean = false;
  isCreate:boolean = false;
  isJoin:boolean = false;

  constructor(private fb:FormBuilder, private router:Router){
    this.formJoin = fb.group({
      idroom: ['',[Validators.required]]
    })

    this.formCreate = fb.group({
      idroom: ['',[Validators.required]]
    })
  }

  changeDescription(game:string){
    this.gameSelected = game;
  }

  sendFormJoin(){
    if (this.formJoin.valid) {
      this.router.navigate(['/clickgame/'+this.formJoin.value.idroom])
    } 
  }

  sendFormCreate(){
    if(this.formCreate.valid){
      this.router.navigate(['/clickgame/'+this.formCreate.value.idroom])
    }
  }

  selectOption(isCreate:boolean){

    if(this.optionSelected === false) {
      this.optionSelected = true;
    }

    if(isCreate){
      this.isCreate = true;
      this.isJoin = false;
    } else {
      this.isCreate = false;
      this.isJoin = true;
    }
  }

}
