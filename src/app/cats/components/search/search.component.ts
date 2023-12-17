import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchText: string = '';
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const savedSearchText = this.route.snapshot.queryParams['searchText'] || localStorage.getItem('searchText');
    if (savedSearchText) {
      this.searchText = savedSearchText;
      this.emitSearchText();
    }
  }

  onSearchTextChanged() {
    localStorage.setItem('searchText',this.searchText);
    this.emitSearchText();
  }

  private emitSearchText() {
    this.searchTextChanged.emit(this.searchText);
  }
}
