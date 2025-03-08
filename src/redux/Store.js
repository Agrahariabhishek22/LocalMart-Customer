import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice";
import shopsSlice from'./shopsSlice';
import cartSlice from './cartSlice'
import wishlistSlice from './wishlistSlice'

const store = configureStore({
  reducer: {
    customer: customerSlice,
    shops:shopsSlice,
    cart:cartSlice,
    wishlist:wishlistSlice,
  },
});

export default store;
