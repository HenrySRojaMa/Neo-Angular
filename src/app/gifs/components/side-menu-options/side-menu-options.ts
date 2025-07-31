import { Component, inject, signal } from '@angular/core';
import { MenuOption } from '../../interfaces/side-menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../services/gif-service';

@Component({
  selector: 'app-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
  styleUrl: './side-menu-options.css'
})
export class SideMenuOptions {

  _gifService = inject(GifService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      route: '/search',
      subLabel: 'Buscar Gifs'
    },
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      route: '/trending',
      subLabel: 'Gifs Populares'
    }
  ];
}
