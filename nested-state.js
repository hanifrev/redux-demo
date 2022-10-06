const redux = require("redux");

const { createStore } = require("redux");

const initialState = {
  name: "Martin Mendez",
  address: {
    street: "Main St 666",
    city: "Boston",
    state: "MA",
  },
};

const STREET_UPDATED = "STREET_UPDATED";
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return {
        ...state,
        address: {
          ...state.address,
          street: action.payload,
        },
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("updated state", store.getState());
});
store.dispatch(updateStreet("Alexander St 90"));
unsubscribe();
