import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {

    recipeAdded = new Subject<Recipe[]>();
    constructor(private shoppingListService: ShoppingListService) {}

    private recipes: Recipe[] = [];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
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
