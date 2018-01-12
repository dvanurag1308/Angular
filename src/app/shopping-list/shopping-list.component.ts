import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromShoppingList from './store/shopping-list.reducers';
import * as shoppingListActions from './store/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingListStore: Observable<{ingredients: Ingredient[]}>;
  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.shoppingListStore = this.store.select('shoppingList');
  }

  editIngredient(id: number) {
    this.store.dispatch(new shoppingListActions.StartEdit(id));
  }
}
