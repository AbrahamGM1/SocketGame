import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./modules/clickgame/clickgame.component').then((c) => c.ClickgameComponent),
    }
];
