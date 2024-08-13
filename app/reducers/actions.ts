import { ExpectedAsProductTypes as Product } from "../types/foreignTypes";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";

export const addToCart = (product: Product) => ({
  type: ADD_TO_CART as typeof ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId: number) => ({
  type: REMOVE_FROM_CART as typeof REMOVE_FROM_CART,
  payload: productId,
});

export const clearCart = () => ({
  type: CLEAR_CART as typeof CLEAR_CART,
});

export const updateQuantity = (productId: number, quantity: number) => ({
  type: UPDATE_QUANTITY as typeof UPDATE_QUANTITY,
  payload: { productId, quantity },
});
