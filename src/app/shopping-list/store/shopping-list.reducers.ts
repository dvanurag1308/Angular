
import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActionsImport from './shopping-list.actions';


const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActionsImport.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActionsImport.ADD_INGREDIENT:
      console.log(action.ingredient);
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient]
      };
    default :
      return state;
  }
}
