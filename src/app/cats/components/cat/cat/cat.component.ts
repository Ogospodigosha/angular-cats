import {Component, Input} from '@angular/core';
import {CatsFacts} from "../../../models/cats.models";

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent {
  @Input() cat!: CatsFacts;
}
