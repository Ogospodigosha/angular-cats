import {Component, EventEmitter,  Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  searchText: string = '';
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  private searchTextChangedSubject: Subject<string> = new Subject<string>();
  constructor(private router: Router, private route: ActivatedRoute) {
    this.searchTextChangedSubject.pipe(
      debounceTime(300), // Задержка в миллисекундах
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchTextChanged.emit(value);
      this.updateRouteParam(value);
    });
  }
  onSearchTextChanged(text: string) {
    console.log("TEXT", text)
    this.searchTextChanged.emit(text);
  }
  private updateRouteParam(value: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchText: value },
      queryParamsHandling: 'merge',
    });
  }
}
