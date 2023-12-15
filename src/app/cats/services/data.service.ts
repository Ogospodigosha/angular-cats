import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {BehaviorSubject, catchError, scan} from "rxjs";
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
        catchError((error: HttpErrorResponse) => this.catchErrorService.handleHttpError(error))

      )
      .subscribe((res) => {
        this.originalCatsData.next([...this.originalCatsData.value, ...res.data]);
      });
  }

  getOriginalCatsData() {
    return this.originalCatsData.asObservable();
  }
}
