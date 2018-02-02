import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/take';

import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import {Observable} from 'rxjs/Observable';
import * as fromRecipe from '../store/recipe.reducers';
import * as fromRecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.RecipeState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
    });
  }

  addToShoppingList() {
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.State) => {
        this.store.dispatch(new shoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }

  deleteRecipe() {
    this.store.dispatch(new fromRecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
