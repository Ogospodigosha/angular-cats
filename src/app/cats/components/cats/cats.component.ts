import { Component, OnInit } from '@angular/core';

import {BehaviorSubject, debounceTime, distinctUntilChanged, map} from 'rxjs';
import { CatsFacts } from '../../models/cats.models';
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {
  cats$: BehaviorSubject<CatsFacts[]> = new BehaviorSubject<CatsFacts[]>([]);
  page = 1;
  searchText: string = '';
  params = '';

  constructor(private catsService: DataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.params = params['searchText'];
    });

    this.catsService.getOriginalCatsData().subscribe((originalCatsData) => {
      this.filterFacts(this.params);
    });

    this.loadFacts();
  }

  loadFacts() {
    this.catsService.getCats(this.page);
  }

  addFacts() {
    this.page++;
    this.loadFacts();
  }
  filterFacts(params: string | undefined) {
    const filterCondition = (cat: CatsFacts) => params === '' || params === undefined || cat.fact.includes(params);

    const filteredCats$ = this.catsService.getOriginalCatsData().pipe(
      map(cats => cats.filter(filterCondition))
    );

    filteredCats$.subscribe(filteredCats => {
      this.cats$.next(filteredCats);
    });
  }
  onSearchTextChanged(searchText: string) {
    this.searchText = searchText;
    if (this.searchText === '') {
      const navigationExtras: NavigationExtras = {
        relativeTo: this.route,
        replaceUrl: true,
      };
      this.router.navigate([], navigationExtras);
    } else {
      this.route.params
        .pipe(
          debounceTime(1000),
          distinctUntilChanged()
        ).subscribe(() => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { searchText: this.searchText },
          queryParamsHandling: 'merge'
        });
        this.route.queryParams.subscribe(() => {
            this.filterFacts(this.params);
        });
      });
    }
  }
}
