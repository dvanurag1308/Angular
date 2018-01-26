import {Recipe} from '../recipe.model';
import * as fromRecipeAction from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface RecipeState extends fromApp.AppState{
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipeReducer(state: State = initialState, action: fromRecipeAction.RecipeActions) {
  switch (action.type) {
    case fromRecipeAction.ADD_RECIPE: {
      return {
        ...state,
        recipes: [...state.recipes, action.recipe]
      };
    }
    case fromRecipeAction.UPDATE_RECIPE: {
      const recipe = state.recipes[action.index];
      const updatedRecipe = {
        ...recipe,
        ...action.recipe
      };
      const recipes = [...state.recipes];
      recipes[action.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    }
    case fromRecipeAction.DELETE_RECIPE: {
      return {
        ...state,
        recipes: state.recipes.splice(action.index, 1)
      };
    }
    case fromRecipeAction.INITIALIZE_RECIPES: {
      return {
        ...state,
        recipes: [...action.recipes]
      };
    }
    default: {
      return state;
    }
  }
}
