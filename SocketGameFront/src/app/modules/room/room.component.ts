import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  //Listado de los juegos para los botones
  games: string[] = ['Click Game', 'Tic Tac Toe', 'Type Game']

  //Cambiar el this.games[0] por uno vacio cuando haya mas de un juego
  gameSelected: string = this.games[0]

  //Las 2 opciones de formularios
  formJoin: FormGroup;
  formCreate: FormGroup;

  //Para saber si seleccionó una opción por primera vez
  optionSelected: boolean = false;

  //Si se uso el formulario de crear o el de unirse
  isCreate: boolean = false;
  isJoin: boolean = false;

  //Evento que le avisará al App Component cual juego mostrar.
  @Output() game = new EventEmitter<string>();


  //Crea las validaciones de los 2 formularios
  constructor(private fb: FormBuilder, private cookieService: CookieService) {
    this.formJoin = fb.group({
      idroom: ['', [Validators.required]],
      playername: ['', [Validators.required]]
    })

    this.formCreate = fb.group({
      idroom: ['', [Validators.required]],
      playername: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    //Borrar las cookies con el menú principal
    this.cookieService.deleteAll();
  }

  //Para mostrar cual juego fue seleccionado dentro de la descripción, mas adelante se le dara utilidad para cambiar entre juegos
  changeDescription(game: string) {
    this.gameSelected = game;
  }

  //Guarda el nombre de usuario y el id de la sala en una cookie para aue el juego seleccionado los use para hacer la conexion al socket
  sendFormJoin() {
    if (this.formJoin.valid) {
      const cookieRoom = this.cookieService.get('idroom')
      const cookiePlayername = this.cookieService.get('playername')

      const valueRoom = this.formJoin.value.idroom;
      const valuePlayername = this.formJoin.value.playername;


      if (cookieRoom && cookiePlayername) {

        //Si existen y son iguales a las ingresadas, no haces nada
        if (cookieRoom == valueRoom && cookiePlayername == valuePlayername) {
          //Emite el juego seleccionado al App Component
          this.game.emit(this.gameSelected)
          ///ROUTER
        }
        //Si existen y son diferentes a las ingresadas, las reemplazas
        if (cookieRoom != valueRoom || cookiePlayername != valuePlayername) {
          this.cookieService.delete('idroom');
          this.cookieService.delete('playername')
          this.cookieService.set('idroom', this.formJoin.value.idroom)
          this.cookieService.set('playername', this.formJoin.value.playername)
          //Emite el juego seleccionado al App Component
          this.game.emit(this.gameSelected)
          ///ROUTER
        }
      } else {
        //Si no existen, las creas
        this.cookieService.set('idroom', this.formJoin.value.idroom)
        this.cookieService.set('playername', this.formJoin.value.playername)
        //Emite el juego seleccionado al App Component
        this.game.emit(this.gameSelected)
        ///ROUTER
      }

    }

  }

  //Guarda el nombre de usuario y el id de la sala en una cookie para aue el juego seleccionado los use para hacer la conexion al socket
  sendFormCreate() {
    if (this.formCreate.valid) {
      const cookieRoom = this.cookieService.get('idroom')
      const cookiePlayername = this.cookieService.get('playername')

      const valueRoom = this.formCreate.value.idroom;
      const valuePlayername = this.formCreate.value.playername;

      if (cookieRoom && cookiePlayername) {

        //Si existen y son iguales a las ingresadas, no haces nada
        if (cookieRoom == valueRoom && cookiePlayername == valuePlayername) {
          //Emite el juego seleccionado al App Component
          this.game.emit(this.gameSelected)
          ///ROUTER
        }
        //Si existen y son diferentes a las ingresadas, las reemplazas
        if (cookieRoom != valueRoom || cookiePlayername != valuePlayername) {
          this.cookieService.delete('idroom');
          this.cookieService.delete('playername')
          this.cookieService.set('idroom', this.formCreate.value.idroom)
          this.cookieService.set('playername', this.formCreate.value.playername)
          //Emite el juego seleccionado al App Component
          this.game.emit(this.gameSelected)
          ///ROUTER
        }
      } else {
        //Si no existen, las creas
        this.cookieService.set('idroom', this.formCreate.value.idroom)
        this.cookieService.set('playername', this.formCreate.value.playername)
        //Emite el juego seleccionado al App Component
        this.game.emit(this.gameSelected)
        ///ROUTER
      }
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
