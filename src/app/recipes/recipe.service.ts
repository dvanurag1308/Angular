import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {

    recipeAdded = new Subject<Recipe[]>();
    constructor() {}

    private recipes: Recipe[] = [];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipeAdded.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
      this.recipes[index] = recipe;
      this.recipeAdded.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipeAdded.next(this.recipes.slice());
    }

    initializeRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipeAdded.next(this.recipes.slice());
    }
}
