import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';

import * as shoppingListActions from '../store/shopping-list.actions';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') f: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  shoppingListStore: Observable<{ingredients: Ingredient[]}>;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListStore = this.store.select('shoppingList');
    this.editSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.shoppingListStore.subscribe((val: {ingredients: Ingredient[]}) => {
          this.editedItem = val.ingredients[index];
          this.f.setValue({
            name: this.editedItem.name,
            quantity: this.editedItem.quantity
          });
        });
    });
  }

  addNewIngredient(form: NgForm) {
    const value = form.value;
    const addedIngredient = new Ingredient(value.name, value.quantity);

    if (!this.editMode) {
      this.store.dispatch(new shoppingListActions.AddIngredient(addedIngredient));
      // this.shoppingListService.addIngredient(addedIngredient);
    } else {
      this.shoppingListService.updateIngredient(this.editedItemIndex, addedIngredient);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.f.resetForm();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }
}
