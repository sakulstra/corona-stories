import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

type State = {
  light: boolean;
};

const initialState: State = {
  light: true
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
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware())
);
