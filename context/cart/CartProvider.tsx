import React, { FC, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';
import Cookies from 'js-cookie';
export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addProductToCart = (product: ICartProduct) => {
    const isProductInCart = state.cart.some((p) => p._id === product._id);
    if (!isProductInCart) {
      console.log('entré 1');
      return dispatch({
        type: '[CART] Update products in cart',
        payload: [...state.cart, product],
      });
    }
    const isProductInCartAndDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );

    if (!isProductInCartAndDifferentSize) {
      console.log('entré 2');
      return dispatch({
        type: '[CART] Update products in cart',
        payload: [...state.cart, product],
      });
    }
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;
      p.quantity += product.quantity;
      return p;
    });
    console.log('entré 3');
    console.log({ updatedProducts });
    return dispatch({
      type: '[CART] Update products in cart',
      payload: updatedProducts,
    });
  };
  return (
    <CartContext.Provider value={{ ...state, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
