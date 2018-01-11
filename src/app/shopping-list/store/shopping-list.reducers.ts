
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
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient]
      };
    case ShoppingListActionsImport.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.ingredients]
      };
    case ShoppingListActionsImport.UPDATE_INGREDIENT: {
      const ingredientsReceived = state.ingredients;
      ingredientsReceived[action.index] = action.ingredient;
      return {
        ...state,
        ingredients: ingredientsReceived
      };
    }
    case ShoppingListActionsImport.DELETE_INGREDIENT: {
      const ingredientsReceived = state.ingredients;
      ingredientsReceived.splice(action.index, 1);
      return {
        ...state,
        ingredients: ingredientsReceived
      };
    }
    default :
      return state;
  }
}
