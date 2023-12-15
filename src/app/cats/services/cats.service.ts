import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environments";
import {CatsFacts, CatsFactsResponse} from "../models/cats.models";
import {BehaviorSubject, catchError} from "rxjs";
import {CatchErrorService} from "./catch-error.service";

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  constructor(private http: HttpClient, private catchErrorService: CatchErrorService) { }
  cats$: BehaviorSubject<CatsFacts[]> = new BehaviorSubject<CatsFacts[]>([]);
  originalCatsData: CatsFacts[] = [];
  getCats(page: number) {
    return this.http.get<CatsFactsResponse>(`${environment.baseUrl}?page=${page}`)
      .pipe(
        catchError((error: HttpErrorResponse) => this.catchErrorService.handleHttpError(error))
      )
  }
}
