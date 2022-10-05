const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

// action
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const JUICE_ORDERED = "JUICE_ORDERED";
const JUICE_RESTOCKED = "JUICE_RESTOCKED";

// action creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderJuice() {
  return {
    type: JUICE_ORDERED,
    payload: 1,
  };
}

function juiceRestock(qty = 1) {
  return {
    type: JUICE_RESTOCKED,
    payload: qty,
  };
}

// const initialState = {
//   numOfCakes: 10,
//   anotherProperty: 0,
//   juice: 13,
// };

const initialCakeState = {
  numOfCakes: 10,
};

const initialJuiceState = {
  juice: 13,
};

//  (previousState, action) => newState

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const juiceReducer = (state = initialJuiceState, action) => {
  switch (action.type) {
    case JUICE_ORDERED:
      return {
        ...state,
        juice: state.juice - 1,
      };
    case JUICE_RESTOCKED:
      return {
        ...state,
        juice: state.juice + action.payload,
      };
    default:
      return state;
  }
};

// for multiple reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  thejuice: juiceReducer,
});

// hold app state
const store = createStore(rootReducer);

// allow access to state via getState()
console.log("initial state", store.getState());

// register listerner via subscribe(listener), allow the app to subscribe the changes in the store
// store.subscribe(() => console.log("update state", store.getState()));
const unsubscribe = store.subscribe(() =>
  console.log("update state", store.getState())
);

// allow state to be updated via dispatch(action)
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(7));
// store.dispatch(juiceRestock(2));

const actions = bindActionCreators(
  { orderCake, restockCake, orderJuice, juiceRestock },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderJuice();
actions.juiceRestock(8);
// Handles unregistering of listeners via the function returned by subscribe(listener) / unsubscribe
unsubscribe();
