import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || {};
  } catch {
    return {};
  }
};

const saveState = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadState(),
  reducers: {
    addToCart: (state, action) => {
      const { shopId, item } = action.payload;

      if (!state[shopId]) {
        state[shopId] = { shopName: item.shopName, items: {} };
      }
      
      if (!state[shopId].items[item._id]) {
        state[shopId].items[item._id] = { ...item, quantity: 1 };
      } else {
        state[shopId].items[item._id].quantity += 1;
      }

      saveState(state); // ✅ Save updated state to localStorage
    },

    removeFromCart: (state, action) => {
      const { shopId, itemId } = action.payload;

      if (state[shopId]?.items[itemId]) {
        delete state[shopId].items[itemId];
        if (Object.keys(state[shopId].items).length === 0) {
          delete state[shopId];
        }
      }

      saveState(state); // ✅ Save updated state to localStorage
    },

    increaseQuantity: (state, action) => {
      const { shopId, itemId } = action.payload;

      if (state[shopId]?.items[itemId]) {
        state[shopId].items[itemId].quantity += 1;
      }

      saveState(state); // ✅ Save updated state to localStorage
    },

    decreaseQuantity: (state, action) => {
      const { shopId, itemId } = action.payload;

      if (state[shopId]?.items[itemId]) {
        if (state[shopId].items[itemId].quantity > 1) {
          state[shopId].items[itemId].quantity -= 1;
        } else {
          delete state[shopId].items[itemId];
          if (Object.keys(state[shopId].items).length === 0) {
            delete state[shopId];
          }
        }
      }

      saveState(state); // ✅ Save updated state to localStorage
    },

    clearCart: (state, action) => {
      const shopId = action.payload;
      if (state[shopId]) {
        delete state[shopId];
      }

      saveState(state); // ✅ Save updated state to localStorage
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
