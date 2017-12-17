import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {

    recipeAdded = new Subject<Recipe[]>();
    constructor(private shoppingListService: ShoppingListService) {}

    private recipes: Recipe[] = [
        new Recipe('Pasta',
                    'Making pasta',
                    'http://images.indianexpress.com/2015/05/macaroni-main.jpg',
                    [
                        new Ingredient('Cheese', 1),
                        new Ingredient('Macroons', 2)
                    ]),
        new Recipe('Burger',
                    'Making Burger',
                    'http://intimesoft.com/wp-content/uploads/2017/01/fast-food.jpg',
                    [
                        new Ingredient('Chicken', 1),
                        new Ingredient('Tomatoes', 2),
                        new Ingredient('Bread', 2)
                    ])
      ];

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
}
