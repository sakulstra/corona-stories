import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

type State = {
  light: boolean;
  user: any;
};

const initialState: State = {
  light: true,
  user: null
};

const reducer = (state: State = initialState, action): State => {
  switch (action.type) {
    case "TURN_OFF_LIGHT":
      return {
        ...state,
        light: false
      };
    case "TURN_ON_LIGHT":
      return {
        ...state,
        light: true
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    case "UNSET_USER":
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware())
);
