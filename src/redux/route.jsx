import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appRoutes: [],
  currentRoute: undefined,
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setAppRoutes: (state, action) => {
      state.appRoutes = action.payload;
    },
    setCurrentRoute: (state, action) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { setAppRoutes, setCurrentRoute } = routeSlice.actions;

export default routeSlice.reducer;
