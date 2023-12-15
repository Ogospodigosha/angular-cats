import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environments";
import {CatsFacts, CatsFactsResponse} from "../models/cats.models";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  constructor(private http: HttpClient) { }
  cats$: BehaviorSubject<CatsFacts[]> = new BehaviorSubject<CatsFacts[]>([]);
  originalCatsData: CatsFacts[] = [];
  getCats(page: number) {
    return this.http.get<CatsFactsResponse>(`${environment.baseUrl}?page=${page}`)
  }
}
