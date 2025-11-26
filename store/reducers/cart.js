import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
} from "../actions/type";
import { minValueOne } from "../../utils";

const init = {
  cart: [],
};

export const cartReducer = (state = init, action) => {
  switch (action.type) {
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case ADD_TO_CART:
      {
        const productId = action.product.id
        const productQty = action.qty ? action.qty : 1

        // If product already exists in cart, increment qty
        if (state.cart.findIndex((product) => product.id === productId) !== -1) {
          const cart = state.cart.reduce((cartAcc, product) => {
            if (product.id === productId) {
              const newQty = (product.qty ? product.qty : 0) + productQty
              cartAcc.push({
                ...product,
                selected_color: action.color,
                selected_size: action.size,
                qty: newQty,
                // sum = discounted price * qty
                sum: ((product.price * (100 - (product.discount || 0))) / 100) * newQty,
              })
            } else {
              cartAcc.push(product)
            }
            return cartAcc
          }, [])

          return { ...state, cart }
        }

        // New product
        const qty = action.qty ? action.qty : 1
        const discountedPrice = (action.product.price * (100 - (action.product.discount || 0))) / 100
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.product,
              selected_color: action.color,
              selected_size: action.size,
              qty,
              sum: discountedPrice * qty,
            },
          ],
        }
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.product_id),
      };

    case INCREMENT_QUANTITY: {
      const inc_productId = action.product_id
      const new_cart = state.cart.reduce((cartAcc, product) => {
        if (product.id === inc_productId) {
          const newQty = (product.qty || 0) + 1
          cartAcc.push({
            ...product,
            qty: newQty,
            sum: ((product.price * (100 - (product.discount || 0))) / 100) * newQty,
          })
        } else {
          cartAcc.push(product)
        }
        return cartAcc
      }, [])
      return { ...state, cart: new_cart }
    }

    case DECREMENT_QUANTITY: {
      const decProductId = action.product_id
      const decCart = state.cart.reduce((cartAcc, product) => {
        if (product.id === decProductId) {
          const newQty = minValueOne((product.qty || 1) - 1)
          cartAcc.push({
            ...product,
            qty: newQty,
            sum: ((product.price * (100 - (product.discount || 0))) / 100) * newQty,
          })
        } else {
          cartAcc.push(product)
        }
        return cartAcc
      }, [])

      return { ...state, cart: decCart }
    }

    default:
      return state;
  }
};

export default cartReducer;
