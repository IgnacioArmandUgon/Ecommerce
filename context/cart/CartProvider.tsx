import React, { FC, useEffect, useReducer } from 'react';
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

  useEffect(() => {
    const cartFromCookies = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];

    return dispatch({
      type: '[CART] Load cart from cookies | storage',
      payload: cartFromCookies,
    });
  }, []);

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const isProductInCart = state.cart.some((p) => p._id === product._id);
    if (!isProductInCart) {
      return dispatch({
        type: '[CART] Update products in cart',
        payload: [...state.cart, product],
      });
    }
    const isProductInCartAndDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );

    if (!isProductInCartAndDifferentSize) {
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
