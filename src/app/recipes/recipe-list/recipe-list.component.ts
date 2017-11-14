import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeClicked = new EventEmitter<Recipe>();
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService) { }

  onRecipeClicked(recipeSelected: Recipe){
    this.recipeClicked.emit(recipeSelected);
  }
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

}
