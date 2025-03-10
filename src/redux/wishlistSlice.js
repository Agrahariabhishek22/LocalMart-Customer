import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.some((item) => item.id === action.payload.id)) {
        state.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state)); // ✅ Save to localStorage
    },
    removeFromWishlist: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) state.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(state)); // ✅ Save to localStorage
    },
  },
});

export const { addToWishlist,removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
