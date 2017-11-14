import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";

export class RecipeService {
    
    private recipes: Recipe[] = [
        new Recipe('Pasta', 'Making pasta', 'http://images.indianexpress.com/2015/05/macaroni-main.jpg'),
        new Recipe('Burger', 'Making Burger', 'http://intimesoft.com/wp-content/uploads/2017/01/fast-food.jpg')
      ];
      
    selectedRecipe = new EventEmitter<Recipe>();

    getRecipes() {
        return this.recipes.slice();
    }
}