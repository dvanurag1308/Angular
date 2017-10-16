import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('recipeItem') recipe : Recipe;

  @Output() recipeIsClicked = new EventEmitter<void>();
  constructor() { }

  recipeClicked() {
    this.recipeIsClicked.emit();
  }

  ngOnInit() {
  }

}
