import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () =>
            import('./modules/room/room.component').then((c) => c.RoomComponent),

    },
    {
        path: 'clickgame/:idroom',
        loadComponent: () =>
            import('./modules/clickgame/clickgame.component').then((c) => c.ClickgameComponent),
    }
];
