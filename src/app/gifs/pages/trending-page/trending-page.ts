import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { List } from "../../components/list/list";
import { GifService } from '../../services/gif-service';
import { ScrollStateService } from '../../../shared/services/scroll-state-service';

@Component({
  selector: 'app-trending-page',
  //imports: [List],
  templateUrl: './trending-page.html',
  styleUrl: './trending-page.css'
})
export default class TrendingPage implements AfterViewInit {
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this._scrollStateService.trending();
  }

  _gifService = inject(GifService);
  _scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef>('groupDiv');
  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    this._scrollStateService.trending.set(scrollTop);

    if (isAtBottom) {
      this._gifService.loadTrendingGifs();
    }

  }

}
