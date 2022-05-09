import {
  CART_CLEAR_SUCCESS,
  // CART_ADD_ITEM,
  // CART_CLEAR_ITEMS,
  CART_CREATE_FAIL,
  CART_CREATE_REQUEST,
  CART_CREATE_SUCCESS,
  CART_DELETE_FAIL,
  CART_DELETE_REQUEST,
  CART_DELETE_SUCCESS,
  CART_LIST_FAIL,
  CART_LIST_MY_RESET,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  // CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../Constants/CartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    //LIST
    // case CART_LIST_REQUEST:
    //   return { loading: true, cartItems: [] };
    case CART_LIST_SUCCESS:
      return { loading: false, cartItems: action.payload };
    case CART_LIST_FAIL:
      return { loading: false, error: action.payload };
    // case CART_DELETE_SUCCESS:
    //   const newCart = [...state.cartItems].map(cartItem => cartItem._id !== action.payload)
    //   return { loading: false, successdelete: true, message: action.payload, cartItems: [...newCart] };

    //create
    // case CART_CREATE_REQUEST:
    //   return { loading: true, cartItems: [...state.cartItems] };
    // case CART_CREATE_SUCCESS:
    //   // const item = action.payload;
    //   // const existItem = state.cartItems.find((x) => x.product === item.product);
    //   return {
    //         ...state,
    //         cartItems: [...action.payload],
    //       };
    //   // if (existItem) {
    //   //   return {
    //   //     ...state,
    //   //     loading: false,
    //   //     cartItems: state.cartItems.map((x) =>
    //   //       x.product === existItem.product ? item : x
    //   //     ),
    //   //   };
    //   // } else {
    //   //   return {
    //   //     ...state,
    //   //     cartItems: [...state.cartItems, item],
    //   //   };
    //   // }
    // case CART_CREATE_FAIL:
    //   return { loading: false, error: action.payload };






    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    // case CART_CLEAR_ITEMS:
    //   return {
    //     ...state,
    //     cartItems: [],
    //   };
    case CART_LIST_MY_RESET:
      return { cartItems: [] };

    //test rerender
    // case CART_DELETE_SUCCESS:
    //   const newCart = [...state.cartItems].map(cartItem => cartItem._id !== action.payload)
    //      return {loading: false, successdelete: true, message: action.payload, cartItems: newCart };

    default:
      return state;
  }
};


export const DeleteCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_DELETE_REQUEST:
      return { loading: true };
    case CART_DELETE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case CART_DELETE_FAIL:
      return { loading: false, error: true };
    case CART_CLEAR_SUCCESS:
      return { loading: false, success: true }
    default:
      return state;
  }
};



export const CreateCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_CREATE_REQUEST:
      return { loading: true };
    case CART_CREATE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case CART_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}