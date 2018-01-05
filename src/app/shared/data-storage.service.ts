import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', 'ds').append('', '');
    // return this.httpClient.put('https://ng-recipe-book-d8963.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers
    // });

    // const req = new HttpRequest('PUT', 'https://ng-recipe-book-d8963.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {reportProgress: true, params: new HttpParams().set('auth', token)});
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-d8963.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {reportProgress: true});

    return this.httpClient.request(req);
  }

  fetchRecipes() {
    const token = this.authService.getToken();
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-d8963.firebaseio.com/recipes.json?auth=' + token)
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-d8963.firebaseio.com/recipes.json?auth=' + token, {
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
