import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { WebsocketService } from '../../services/websocket.service';
import { interval, Subscription } from 'rxjs';


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
  timer:number = 10;
  player_name:string = 'Player 1'
  guest_name:string = 'Player 2'

  private subscription!: Subscription

  constructor(private router:ActivatedRoute, private cookieService:CookieService, private websocket:WebsocketService){
    websocket.callback.subscribe(res =>{
      console.log(res)
      this.enemy_level = res.level;
    })

    websocket.nameCallback.subscribe(name =>{
      this.guest_name = name; 
      websocket.emitPlayerName(this.player_name)
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.room_id = this.router.snapshot.paramMap.get('idroom')
    this.player_name = this.cookieService.get('playername')

    
    if(this.room_id!==null){
      this.cookieService.set('idroom',this.room_id)
    }

    //Manda el nombre del jugador al socket para que le aparezca el nombre al otro jugador
    this.websocket.emitPlayerName(this.player_name)
    /**
     * 
    this.subscription = interval(1000).subscribe(()=>{
      if(this.timer!==0){
        this.timer -=1;
      }
      if(this.timer == 0){
        alert('winner')
        this.subscription.unsubscribe();
      }
    })

    
     */
  }

  levelup(){
    this.current_level++
    const level = this.current_level
    this.websocket.emitEvent({level})
  }

}
