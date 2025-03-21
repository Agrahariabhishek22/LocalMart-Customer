import { createSlice } from "@reduxjs/toolkit";

const shopsSlice = createSlice({
  name: "shops",
  initialState: {
    shopsByCategory: {},
   
    selectedCategory: null,
   
    productsByShop: {}, 
    
  },
  reducers: {
    
    fetchShopsSuccess: (state, action) => {
      state.loading = false;
     
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
    setSelectedCategory: (state, action) => {
      console.log("select category ",action.payload)
      state.selectedCategory = action.payload;
    },
   
    fetchProductsSuccess: (state, action) => {
       const {  products } = action.payload;
      const categorizedProducts = {};
 
      products.forEach((product) => {
        const category = product.category.trim();
        if (!categorizedProducts[category]) {
          categorizedProducts[category] = [];
        }
        categorizedProducts[category].push(product);
      });

      state.productsByShop = categorizedProducts;
    },
  },
});

export const {
  fetchShopsStart,
  fetchShopsSuccess,
  fetchShopsFailure,
  setSelectedCategory,
  setSelectedShop,
  fetchProductsSuccess,
} = shopsSlice.actions;

export default shopsSlice.reducer;
