import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';



export const Store = createContext();
const initialState = {
    darkMode : Cookies.get('darkMode') === 'ON' ? true : false,
    cart: {
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
        
        shippingAddress: Cookies.get('shippingAddress') ? JSON.stringify(Cookies.get('shippingAddress')) : {},

        paymentMethod: Cookies.get('paymentMethod') ? Cookies.get('paymentMethod') : '',
    },
    // userInfo: ()=> {
    //     let userInfo = null;
    //     try {
    // // Parse a JSON
    // userInfo = JSON.parse(Cookies.get('userInfo')); 
    // } catch (e) {
    // userInfo = Cookies.get('userInfo');
    // }
    // return userInfo;
    // } 
    userInfo: Cookies.get('userInfo') ? Cookies.get('userInfo') : null,
};

function reducer(state, action) {
    switch(action.type) {
        case 'DARK_MODE_ON':
            return{ ...state, darkMode: true };
        case 'DARK_MODE_OFF':
            return{ ...state, darkMode: false};
        case 'CART_ADD_ITEM': {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(item => item._id === newItem._id);
            const cartItems = existItem ? state.cart.cartItems.map((item) => item.name === existItem.name ? newItem : item) : [...state.cart.cartItems, newItem];
            Cookies.set('cartItems' , JSON.stringify(cartItems));
            return {...state, cart: {...state.cart, cartItems } };
        };
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter((item)=> item._id !== action.payload._id);
            Cookies.set('cartItems' , JSON.stringify(cartItems));
            return {...state, cart: {...state.cart, cartItems } };
        };
        case 'USER_LOGIN':
            return { ...state, userInfo: action.payload };
        case 'USER_LOGOUT':
            return { ...state, userInfo:null, cart: { cartItems: [] } };

        case 'USER_REGISTER':
            return { ...state, userInfo: action.payload };
        
        case 'SAVE_SHIPPING_ADDRESS':
            return { ...state, cart: { ...state.cart, shippingAddress: action.payload}, 
            };

        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state,
                cart: { ...state.cart, paymentMethod: action.payload }
            };
        
        default:
            return state;
    }
}


export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}