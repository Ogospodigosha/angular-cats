import {Component, EventEmitter,  Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  searchText: string = '';
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) {}
  onSearchTextChanged(text: string) {
    console.log("TEXT", text)
    this.searchTextChanged.emit(text);
  }
}
