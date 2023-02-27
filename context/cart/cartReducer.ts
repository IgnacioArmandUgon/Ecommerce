import { ICartProduct } from '../../interfaces';
import { CartState } from './CartProvider';

type CartActionType =
  | {
      type: '[CART] Load cart from cookies | storage';
      payload: ICartProduct[];
    }
  | {
      type: '[CART] Add product';
      payload: ICartProduct;
    };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case '[CART] Add product':
      return { ...state };

    default:
      return state;
  }
};
