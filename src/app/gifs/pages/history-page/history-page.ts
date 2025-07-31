import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gif-service';
import { List } from "../../components/list/list";

@Component({
  selector: 'app-history-page',
  imports: [List],
  templateUrl: './history-page.html',
  styleUrl: './history-page.css'
})
export default class HistoryPage {
  // query = inject(ActivatedRoute).params.subscribe((params) => {
  //   console.log(params['query']);
  // });

  query = toSignal(inject(ActivatedRoute).params.pipe(
    map(params => params['query'] ?? '')
  ));

  _gifService = inject(GifService);

  history = computed(() => {
    return this._gifService.getHistoryGifs(this.query());
  })

}
