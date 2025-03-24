import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { WebsocketService } from '../../services/websocket.service';


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
  room_id:string|null = '';

  constructor(private router:ActivatedRoute, private cookieService:CookieService, private websocket:WebsocketService){
    websocket.callback.subscribe(res =>{
      console.log(res)
      this.enemy_level = res.level;
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.room_id = this.router.snapshot.paramMap.get('idroom')
    
    if(this.room_id!==null){
      this.cookieService.set('idroom',this.room_id)
    }
  }

  levelup(){
    this.current_level++
    const level = this.current_level
    this.websocket.emitEvent({level})
  }

}
