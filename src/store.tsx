import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {  persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(
    createStateSyncMiddleware({
      blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
    }),thunk
  )
);

initMessageListener(store);




export default store;
