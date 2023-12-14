import { Component, OnInit } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import {BehaviorSubject,  tap} from 'rxjs';
import { map } from 'rxjs/operators';
import { CatsFacts } from '../../models/cats.models';
import {ActivatedRoute, Router} from "@angular/router";

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
  constructor(private catsService: CatsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadFacts();
  }

  loadFacts() {
    this.catsService.getCats(this.page)
      .pipe(
        map(res => res.data),
        tap(facts => {
          this.originalCatsData = [...this.originalCatsData, ...facts];
          this.filterFacts();
        })
      )
      .subscribe();
  }

  addFacts() {
    this.page++;
    this.loadFacts();
  }
  filterFacts() {
    if (this.searchText.trim() === '') {
      this.cats$.next([...this.originalCatsData]);
    } else {
      const filteredCats = this.originalCatsData.filter(cat => cat.fact.includes(this.searchText));
      this.cats$.next(filteredCats);
    }
  }

  onSearchTextChanged(searchText: string) {
    this.searchText = searchText;
    this.filterFacts();
  }
}
