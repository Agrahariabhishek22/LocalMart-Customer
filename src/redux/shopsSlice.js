import { createSlice } from "@reduxjs/toolkit";

const shopsSlice = createSlice({
  name: "shops",
  initialState: {
    shopsByCategory: {},
   
    selectedCategory: "All",
   
    productsByShop: {}, 
    
  },
  reducers: {
    
    fetchShopsSuccess: (state, action) => {
     
     
      const categorizedShops = {"All":[]};
      if (!Array.isArray(action.payload)) {
        console.error("Error: action.payload is not an array");
        return;
      }

      action.payload.forEach((shop) => {
        let matchedCategory = shop.shopCategory.trim();
        if(!shop.itemCategories.includes("All")){
          shop.itemCategories.push("All")
          shop.itemCategories.sort();
        }
        if (!categorizedShops[matchedCategory]) {
          categorizedShops[matchedCategory] = [];
        }
        categorizedShops[matchedCategory].push(shop);
        categorizedShops["All"].push(shop);
      });

      state.shopsByCategory = categorizedShops;
    },
    setSelectedCategory: (state, action) => {
      console.log("select category ",action.payload)
      state.selectedCategory = action.payload;
    },
   
    fetchProductsSuccess: (state, action) => {
       const {  products } = action.payload;
      const categorizedProducts = {"All":[]};
 
      products.forEach((product) => {
        const category = product.category.trim();
        if (!categorizedProducts[category]) {
          categorizedProducts[category] = [];
          
        }
        categorizedProducts[category].push(product);
        categorizedProducts["All"].push(product);
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
