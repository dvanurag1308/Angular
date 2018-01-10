import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingListStore: Observable<{ingredients: Ingredient[]}>;
  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: {
    ingredients: Ingredient[]
    }}>) { }

  ngOnInit() {
    this.shoppingListStore = this.store.select('shoppingList');
  }

  editIngredient(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
}
