import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface CartProps {
  cart: ICartProduct[];
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;

  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

export const CartContext = createContext({} as CartProps);
