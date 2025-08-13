import { configureStore } from "@reduxjs/toolkit";
import route from "./route";

export const store = configureStore({
  reducer: { route },
});
