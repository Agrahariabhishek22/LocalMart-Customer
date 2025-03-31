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
       const   products  = action.payload;
       console.log(action.payload);
       
      const categorizedProducts = {};

      
      products.forEach((product) => {
        const category = product.category.trim();
        const shopId = product.shopId.toString()
        if (!categorizedProducts[shopId]) {
          categorizedProducts[shopId] = {"All":[]};
          
        }
        if (!categorizedProducts[shopId][category]) {
          categorizedProducts[shopId][category] = [];
          
        }
        categorizedProducts[shopId][category].push(product);
        categorizedProducts[shopId]["All"].push(product);
      });
      
      console.log(categorizedProducts);
      
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
