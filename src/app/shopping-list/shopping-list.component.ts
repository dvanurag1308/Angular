import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient [] = [];
  shoppingSubscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingSubscription = this.shoppingListService.ingredientAdded.subscribe((updatedIngredients: Ingredient[]) => {
      this.ingredients = updatedIngredients;
    });
  }

  ngOnDestroy() {
    this.shoppingSubscription.unsubscribe();
  }

  editIngredient(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
}
