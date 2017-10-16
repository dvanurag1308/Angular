import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeClicked = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Pasta', 'Making pasta', 'http://images.indianexpress.com/2015/05/macaroni-main.jpg'),
    new Recipe('Burger', 'Making Burger', 'http://intimesoft.com/wp-content/uploads/2017/01/fast-food.jpg')
  ];
  constructor() { }

  onRecipeClicked(recipeSelected: Recipe){
    this.recipeClicked.emit(recipeSelected);
  }
  ngOnInit() {
  }

}
