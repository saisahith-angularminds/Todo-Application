import { configureStore } from "@reduxjs/toolkit";
import {TodoReducer} from "./reducer";
import { UserReducer } from "./User/reducer";

const store = configureStore({
  reducer: {
    todo: TodoReducer,
    user:UserReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
