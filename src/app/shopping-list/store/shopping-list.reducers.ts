
import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActionsImport from './shopping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
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
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.ingredient
      };
      const oldIngredients = [...state.ingredients];
      oldIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case ShoppingListActionsImport.DELETE_INGREDIENT: {
      const ingredientsReceived = [...state.ingredients];
      ingredientsReceived.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: ingredientsReceived,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case ShoppingListActionsImport.START_EDIT: {
      return {
        ...state,
        editedIngredient: {...state.ingredients[action.index]},
        editedIngredientIndex: action.index
      };
    }
    case ShoppingListActionsImport.STOP_EDIT : {
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    }
    default :
      return state;
  }
}
