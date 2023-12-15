import { Component, OnInit } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import {BehaviorSubject, debounceTime, distinctUntilChanged, tap} from 'rxjs';
import { map } from 'rxjs/operators';
import { CatsFacts } from '../../models/cats.models';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {
  cats$: BehaviorSubject<CatsFacts[]> = new BehaviorSubject<CatsFacts[]>([]);
  page = 1;
  searchText: string = '';
  originalCatsData: CatsFacts[] = [];
  params = ''
  constructor(private catsService: CatsService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.params = params['searchText'];
      })
    this.loadFacts();
  }

  loadFacts() {
    this.catsService.getCats(this.page)
      .pipe(
        map(res => res.data),
        tap(facts => {
          this.originalCatsData = [...this.originalCatsData, ...facts];
          this.filterFacts(this.params);
        })
      )
      .subscribe();
  }

  addFacts() {
    this.page++;
    this.loadFacts();
  }
  filterFacts(params: string | undefined) {
    if (params === '' || params === undefined) {
      this.cats$.next([...this.originalCatsData]);
    } else {
      const filteredCats = this.originalCatsData.filter(cat => cat.fact.includes(params));
      this.cats$.next(filteredCats);
    }
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
      })
    }

  }
}
