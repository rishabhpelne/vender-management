import { createStore } from "redux";

const reducer = (state, action) => {
  switch (action.type) {
    case "userDetails":
      return {
        ...state,
        userDetails: action.data,
      };
    case "masterData":
      return {
        ...state,
        masterData: action.data,
      };
  }
};

// craete Store variable using createstore and pass reducer as callback to createStore
const store = createStore(reducer);

export default store;
