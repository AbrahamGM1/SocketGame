import { Component } from '@angular/core';

@Component({
  selector: 'app-clickgame',
  standalone: true,
  imports: [],
  templateUrl: './clickgame.component.html',
  styleUrl: './clickgame.component.scss'
})
export class ClickgameComponent {

  current_level:number = 0;
  enemy_level:number = 0;

  levelup(){
    this.current_level++
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setInterval(()=>{
      if(this.enemy_level<=99){
        this.enemy_level++
      }
    },100)
  }
}
