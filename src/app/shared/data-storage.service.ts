import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {HttpClient, HttpRequest} from '@angular/common/http';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-d8963.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {reportProgress: true});

    return this.httpClient.request(req);
  }

  fetchRecipes() {
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-d8963.firebaseio.com/recipes.json?', {
      observe: 'body',
      responseType: 'json'
    })
      .map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.initializeRecipes(recipes);
      });
  }
}
