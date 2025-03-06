import { createSlice } from "@reduxjs/toolkit";

const shopsSlice = createSlice({
  name: "shops",
  initialState: {
    shopsByCategory: {},
    allShops: [],
    selectedCategory: null,
    selectedShop: null, // ✅ Store selected shop
    loading: false,
    error: null,
  },
  reducers: {
    fetchShopsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchShopsSuccess: (state, action) => {
      state.loading = false;
      state.allShops = action.payload;

      const categorizedShops = {};
      if (!Array.isArray(action.payload)) {
        console.error("Error: action.payload is not an array");
        return;
      }

      action.payload.forEach((shop) => {
        let matchedCategory = shop.shopCategory.trim();
        if (!categorizedShops[matchedCategory]) {
          categorizedShops[matchedCategory] = [];
        }
        categorizedShops[matchedCategory].push(shop);
      });

      state.shopsByCategory = categorizedShops;
    },
    fetchShopsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedShop: (state, action) => {
      state.selectedShop = action.payload; // ✅ Store selected shop
    },
  },
});

export const { fetchShopsStart, fetchShopsSuccess, fetchShopsFailure, setSelectedCategory, setSelectedShop } = shopsSlice.actions;
export default shopsSlice.reducer;
