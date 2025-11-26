import { createStore, compose, applyMiddleware } from "redux";

// middlewares
import thunk from "redux-thunk";

// Import custom components
import rootReducer from "./reducers/rootReducers";

const middleware = [thunk];

const isClient = typeof window !== "undefined";

// Only create a persisted reducer on the client to avoid accessing localStorage during SSR
let reducerToUse = rootReducer;
if (isClient) {
  const { persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default; // localStorage for web
  const persistConfig = { key: 'root', storage };
  reducerToUse = persistReducer(persistConfig, rootReducer);
}

let store = createStore(
  reducerToUse,
  compose(
    applyMiddleware(...middleware),
    // For working redux dev tools in chrome
    isClient && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  )
);

let persistor = null;
if (isClient) {
  const { persistStore } = require('redux-persist');
  persistor = persistStore(store);
}

export { store, persistor };
