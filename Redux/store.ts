import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./reducer";

const store = configureStore({
  reducer: {
    todo: TodoReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
