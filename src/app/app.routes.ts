import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page'),
        children: [
            {
                path: 'search',
                loadComponent: () => import('./gifs/pages/search-page/search-page')
            },
            {
                path: 'trending',
                loadComponent: () => import('./gifs/pages/trending-page/trending-page')
            },
            {
                path: 'history/:query',
                loadComponent: () => import('./gifs/pages/history-page/history-page')
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }

];
