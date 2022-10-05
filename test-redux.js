const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const EMPEROR_ORDER = "EMPEROR_ORDER";
const EMPEROR_RESTOCK = "EMPEROR_RESTOCK";
const OPETH_ORDER = "OPETH_ORDER";
const OPETH_RESTOCK = "OPETH_RESTOCK";
const BVRTAN_ORDER = "BVRTAN_ORDER";
const BVRTAN_RESTOCK = "BVRTAN_RESTOCK";

function orderEmperor(qty = 1) {
  return {
    type: EMPEROR_ORDER,
    payload: qty,
  };
}

function restokeEmperor(qty = 1) {
  return {
    type: EMPEROR_RESTOCK,
    payload: qty,
  };
}

function orderOpeth(qty = 1) {
  return {
    type: OPETH_ORDER,
    payload: qty,
  };
}

function restockOpeth(qty = 1) {
  return {
    type: OPETH_RESTOCK,
    payload: qty,
  };
}

const initialEmperorShirt = {
  emperorShirt: 10,
};
const initialOpethShirt = {
  opethShirt: 7,
};

const emperorReducer = (state = initialEmperorShirt, action) => {
  switch (action.type) {
    case EMPEROR_ORDER:
      return {
        ...state,
        emperorShirt: state.emperorShirt - action.payload,
      };
    case EMPEROR_RESTOCK:
      return {
        ...state,
        emperorShirt: state.emperorShirt + action.payload,
      };
    default:
      return state;
  }
};

const opethReducer = (state = initialOpethShirt, action) => {
  switch (action.type) {
    case OPETH_ORDER:
      return {
        ...state,
        opethShirt: state.opethShirt - action.payload,
      };
    case OPETH_RESTOCK:
      return {
        ...state,
        opethShirt: state.opethShirt + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  emperor: emperorReducer,
  opeth: opethReducer,
});

const store = createStore(rootReducer);

console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("update stock", store.getState());
});

// store.dispatch(orderEmperor(2));
// store.dispatch(restokeEmperor(4));

const actions = bindActionCreators(
  { orderEmperor, orderOpeth, restokeEmperor, restockOpeth },
  store.dispatch
);

actions.orderEmperor(3);
actions.orderOpeth(2);
actions.restokeEmperor(1);
actions.restockOpeth(1);

unsubscribe();
