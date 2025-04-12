import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {

  games: string[] = ['Click Game', 'Tic Tac Toe', 'Type Game']
  gameSelected: string = ''

  formJoin: FormGroup;
  formCreate: FormGroup;

  optionSelected: boolean = false;
  isCreate: boolean = false;
  isJoin: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService) {
    this.formJoin = fb.group({
      idroom: ['', [Validators.required]],
      playername: ['', [Validators.required]]
    })

    this.formCreate = fb.group({
      idroom: ['', [Validators.required]],
      playername: ['', [Validators.required]]
    })
  }

  changeDescription(game: string) {
    this.gameSelected = game;
  }

  sendFormJoin() {
    if (this.formJoin.valid) {
      const cookieRoom = this.cookieService.get('idroom')
      const cookiePlayername = this.cookieService.get('playername')

      const valueRoom = this.formJoin.value.idroom;
      const valuePlayername = this.formJoin.value.playername;


      if (cookieRoom && cookiePlayername) {

        //Si existen y son iguales a las ingresadas, no haces nada
        if (cookieRoom == valueRoom && cookiePlayername == valuePlayername) {
          this.router.navigate(['/clickgame/' + valueRoom])
        }
        //Si existen y son diferentes a las ingresadas, las reemplazas
        if (cookieRoom != valueRoom || cookiePlayername != valuePlayername) {
          this.cookieService.delete('idroom');
          this.cookieService.delete('playername')
          this.cookieService.set('idroom', this.formJoin.value.idroom)
          this.cookieService.set('playername', this.formJoin.value.playername)
          this.router.navigate(['/clickgame/' + this.formJoin.value.idroom])
        }
      } else {
        //Si no existen, las creas
        this.cookieService.set('idroom', this.formJoin.value.idroom)
        this.cookieService.set('playername', this.formJoin.value.playername)
        this.router.navigate(['/clickgame/' + this.formJoin.value.idroom])
      }

    }
    
  }

  sendFormCreate() {
    if (this.formCreate.valid) {
      const cookieRoom = this.cookieService.get('idroom')
      const cookiePlayername = this.cookieService.get('playername')

      const valueRoom = this.formCreate.value.idroom;
      const valuePlayername = this.formCreate.value.playername;
      //guarda el id en una cookie y abre la ruta del juego
      this.cookieService.set('idroom', this.formCreate.value.idroom)
      this.cookieService.set('playername', this.formCreate.value.playername)
      this.router.navigate(['/clickgame/' + this.formCreate.value.idroom])
    }
  }

  selectOption(isCreate: boolean) {

    if (this.optionSelected === false) {
      this.optionSelected = true;
    }

    if (isCreate) {
      this.isCreate = true;
      this.isJoin = false;
    } else {
      this.isCreate = false;
      this.isJoin = true;
    }
  }

}
