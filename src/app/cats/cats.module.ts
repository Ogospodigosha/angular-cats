import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CatsRoutingModule} from "./cats-routing.module";
import { CatComponent } from './components/cat/cat/cat.component';
import {FormsModule} from "@angular/forms";
import { SearchComponent } from './components/search/search.component';



@NgModule({
  declarations: [
    CatComponent,
    SearchComponent
  ],
  exports: [
    CatComponent,
    SearchComponent
  ],
  imports: [
    CommonModule, CatsRoutingModule, FormsModule
  ]
})
export class CatsModule { }
