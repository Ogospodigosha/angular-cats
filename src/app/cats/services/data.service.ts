import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {BehaviorSubject, catchError, scan, tap} from "rxjs";
import { environment } from "../../../environments/environments";
import { CatsFacts, CatsFactsResponse } from "../models/cats.models";
import { CatchErrorService } from "./catch-error.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private originalCatsData: BehaviorSubject<CatsFacts[]> = new BehaviorSubject<CatsFacts[]>([]);

  constructor(private http: HttpClient, private catchErrorService: CatchErrorService) {}

  getCats(page: number) {
    return this.http.get<CatsFactsResponse>(`${environment.baseUrl}?page=${page}`)
      .pipe(
        tap((res: CatsFactsResponse) => {
          const currentData = this.originalCatsData.value;
          this.originalCatsData.next([...currentData, ...res.data]);
        }),
        catchError((error: HttpErrorResponse) => this.catchErrorService.handleHttpError(error)),
      ).subscribe(res =>{});
  }


  getOriginalCatsData() {
    return this.originalCatsData.asObservable();
  }
}
