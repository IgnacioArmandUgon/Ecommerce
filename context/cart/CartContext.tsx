import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface CartProps {
  cart: ICartProduct[];
}

export const CartContext = createContext({} as CartProps);
