import { Component, input } from '@angular/core';
import { ListItem } from "../list-item/list-item";
import { Gif } from '../../interfaces/giphy-response';

@Component({
  selector: 'app-list',
  imports: [ListItem],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  List = input.required<Gif[]>();
}
