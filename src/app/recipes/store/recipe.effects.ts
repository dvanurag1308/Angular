import {Actions, Effect} from '@ngrx/effects';
import {HttpClient, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import {Store} from '@ngrx/store';

import * as RecipeActions from './recipe.actions';
import {Recipe} from '../recipe.model';
import {Injectable} from '@angular/core';
import * as fromRecipe from './recipe.reducers';


@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
     return this.httpClient.get<Recipe[]>('https://ng-recipe-book-d8963.firebaseio.com/recipes.json?', {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map((recipes) => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return new RecipeActions.SetRecipes(recipes);
    });

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-d8963.firebaseio.com/recipes.json',
        state.recipes, {reportProgress: true});

      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.RecipeState>) {}
}
