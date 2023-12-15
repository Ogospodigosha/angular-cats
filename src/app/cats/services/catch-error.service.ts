import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatchErrorService {
  handleHttpError(error: HttpErrorResponse) {
    console.error('Запрос реджектнулся', error);
    return throwError([]);
  }
}

