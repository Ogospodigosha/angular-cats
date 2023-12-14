import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environments";
import {CatsFactsResponse} from "../models/cats.models";

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  constructor(private http: HttpClient) { }
  getCats(page: number) {
    return this.http.get<CatsFactsResponse>(`${environment.baseUrl}?page=${page}`)
  }
}
