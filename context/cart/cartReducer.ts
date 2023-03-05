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
    }
  | {
      type: '[CART] Update products in cart';
      payload: ICartProduct[];
    };
// | {
//     type: '[CART] Update quantity';
//     payload: { product: ICartProduct; productIndex: number };
//   };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  //Mi solución
  // const getUpdatedQuantity = (payloadProduct: ICartProduct) => {
  //   const thisProduct = state.cart.find(
  //     (prod) => prod._id === payloadProduct._id && prod.size === payloadProduct.size
  //   ) as ICartProduct;
  //   return thisProduct.quantity + payloadProduct.quantity;
  // };

  switch (action.type) {
    case '[CART] Add product':
      return { ...state, cart: [...state.cart, action.payload] };

    case '[CART] Update products in cart':
      return { ...state, cart: action.payload };

    // case '[CART] Update quantity':
    //   let newStateCart = state.cart;
    //   newStateCart[action.payload.productIndex].quantity = getUpdatedQuantity(
    //     action.payload.product
    //   );
    //   return {
    //     ...state,
    //     cart: [...newStateCart],
    //   };

    case '[CART] Load cart from cookies | storage':
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
