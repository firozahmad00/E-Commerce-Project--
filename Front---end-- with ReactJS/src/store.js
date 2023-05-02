import { configureStore } from '@reduxjs/toolkit';
import ProductsReducer from './slices/products.slice';
import CartReducer from './slices/cart.slice';
import UserReducer from './slices/user.slice';
import OrderReducer from './slices/order.slice';

const store = configureStore({
    reducer: {
        products: ProductsReducer,
        cart: CartReducer,
        userInfo: UserReducer,
        orderInfo: OrderReducer
    }
});

export default store;