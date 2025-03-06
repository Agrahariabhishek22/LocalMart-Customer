import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice";
import shopsSlice from'./shopsSlice';

const store = configureStore({
  reducer: {
    customer: customerSlice,
    shops:shopsSlice,
  },
});

export default store;
