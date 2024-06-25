import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import expireReducer from "redux-persist-expire";
import rootReducer from "./reducers";

// Define persistConfig
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["store"], // Exclude the 'store' object from persistence
  transforms: [
    expireReducer("root", {
      expireSeconds: 3600, // 1 hour
      autoExpire: true,
    }),
  ],
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor
export const persistor = persistStore(store);

export default store;
