import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface CartProps {
  cart: ICartProduct[];
  addProductToCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as CartProps);
