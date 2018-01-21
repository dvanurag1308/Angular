import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';

import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') f: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.editSubscription = this.store.select('shoppingList').subscribe(
      data => {
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.f.setValue({
            name: this.editedItem.name,
            quantity: this.editedItem.quantity
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  addNewIngredient(form: NgForm) {
    const value = form.value;
    const addedIngredient = new Ingredient(value.name, value.quantity);

    if (!this.editMode) {
      this.store.dispatch(new shoppingListActions.AddIngredient(addedIngredient));
    } else {
      this.store.dispatch(new shoppingListActions.UpdateIngredient(addedIngredient));
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.f.resetForm();
  }

  onDelete() {
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new shoppingListActions.StopEdit());
    this.editSubscription.unsubscribe();
    this.onClear();
  }
}
