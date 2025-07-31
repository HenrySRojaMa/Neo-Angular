import { Component, inject, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { GifService } from '../../services/gif-service';
import { Gif } from '../../interfaces/giphy-response';

@Component({
  selector: 'app-search-page',
  imports: [List],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export default class SearchPage {

  gifs = signal<Gif[]>([])
  _gifService = inject(GifService);

  onSearch(query: string) {
    this.gifs.set([]);
    this._gifService.searchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    });
  }

}
