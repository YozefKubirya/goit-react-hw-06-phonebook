import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "./filterSlice";
import { persistedContactReducer } from "./contactSlice";
import { persistStore,FLUSH,
      REHYDRATE,
      PAUSE,
      PERSIST,
      PURGE,
      REGISTER, } from "redux-persist";

export const store = configureStore({
      reducer:{
      contacts:persistedContactReducer,
      filter:filterReducer
},

middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
})

export const persistor = persistStore(store);