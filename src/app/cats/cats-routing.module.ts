import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CatsComponent } from "./components/cats/cats.component";

const routes: Routes = [
  { path: '', component: CatsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatsRoutingModule { }
