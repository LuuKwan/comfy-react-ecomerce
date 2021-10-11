import { act } from "react-dom/test-utils";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, color, product } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id + color); // this return a copy

    // if item is found
    if (tempItem) {
      //because there is no way to access the tempItem to modify its properties,
      //we need to map the cart again to find the matched item in order to modify it
      //and return the modified array into temporary cart
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max_of_stock) {
            newAmount = cartItem.max_of_stock;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      //assign value of tempCart into cart
      return { ...state, cart: tempCart };
    } else {
      // if item cannot be found, add the item into cart
      const newItem = {
        id: id + color,
        name: product.name,
        amount,
        color,
        image: product.images[0].url,
        price: product.price,
        max_of_stock: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
    return { ...state };
  }
  //REMOVE SINGLE ITEM
  if (action.type === REMOVE_CART_ITEM) {
    const newCart = state.cart.filter((item) => {
      return item.id !== action.payload;
    });
    return { ...state, cart: newCart };
  }
  //TOGGLE CART ITEM AMOUNT
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const newCart = state.cart.map((item) => {
      if (item.id === id) {
        return { ...item, amount: value };
      }
      return item;
    });
    return { ...state, cart: newCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  //COUNT_CART_TOTALS
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_amount += amount * price;
        total.total_items += amount;
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_items, total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
