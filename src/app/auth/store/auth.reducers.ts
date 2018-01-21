import * as authActionsImport from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token : null,
  authenticated : false
};

export function authReducer(state = initialState, action: authActionsImport.AuthActions) {
  switch (action.type) {
    case authActionsImport.SIGNUP :
      return {
        ...state,
        authenticated : true
      };
    case authActionsImport.SIGNIN :
      return {
        ...state,
        authenticated : true
      };
    case authActionsImport.LOGOUT :
      return {
        ...state,
        authenticated : false,
        token : null
      };
    case authActionsImport.SET_TOKEN :
      return {
        ...state,
        token : action.token
      };
    default :
      return state;
  }
}
