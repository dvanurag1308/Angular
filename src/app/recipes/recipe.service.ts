import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { element } from 'protractor';

@Injectable()
export class RecipeService {

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
}
