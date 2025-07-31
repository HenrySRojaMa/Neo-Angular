import { Component, inject, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { GifService } from '../../services/gif-service';

@Component({
  selector: 'app-trending-page',
  imports: [List],
  templateUrl: './trending-page.html',
  styleUrl: './trending-page.css'
})
export default class TrendingPage {

  _gifService = inject(GifService);

  constructor() {
    this._gifService.loadTrendingGifs();
  }

}
