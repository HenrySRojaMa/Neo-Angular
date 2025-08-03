import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { Gif, GiphyRps } from '../interfaces/giphy-response';
import { GifMapper } from '../mapper/gif-mapper';
import { map, tap } from 'rxjs';


const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const history = localStorage.getItem('history');
  return history ? JSON.parse(history) : {};
};

@Injectable({
  providedIn: 'root'
})
export class GifService {
  envs = environment;
  private http = inject(HttpClient);
  trendinGifs = signal<Gif[]>([]);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
  trendinGifsLoading = signal(false);
  trendinPage = signal(0);
  gifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendinGifs().length; i += 3) {
      groups.push(this.trendinGifs().slice(i, i + 3));
    }
    return groups;
  });

  constructor(){
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    if (this.trendinGifsLoading()) return;
    this.trendinGifsLoading.set(true);
    this.http.get<GiphyRps>(`${this.envs.giphyURL}/gifs/trending`, {
      params: {
        api_key: this.envs.giphyApiKey,
        limit: 18,
        offset: this.trendinPage() * 18
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendinGifs.update(x => [...x, ...gifs]);
      this.trendinPage.update(x => x += 1);
      this.trendinGifsLoading.set(false);
    });
  }

  searchGifs(query: string) {
    return this.http.get<GiphyRps>(`${this.envs.giphyURL}/gifs/search`, {
      params: {
        api_key: this.envs.giphyApiKey,
        q: query,
        limit: 18
      }
    }).pipe(
      map(({ data }) => data),
      map((gifs) => GifMapper.mapGiphyItemsToGifArray(gifs)),
      tap(items => {
        this.searchHistory.update(x => ({
          ...x,
          [query.toLocaleLowerCase()]: items
        }))
      })
    );
  }

  cleanGifs() {
    this.trendinGifs.set([]);
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

  saveToLocalStorage = effect(() => {
    localStorage.setItem('history', JSON.stringify(this.searchHistory()));
  });

}
