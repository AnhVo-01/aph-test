import { configureStore } from "@reduxjs/toolkit";
import route from "./route";

export default configureStore({
  reducer: { route },
});
