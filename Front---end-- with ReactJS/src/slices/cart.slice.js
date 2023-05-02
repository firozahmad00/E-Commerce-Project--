import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialValue = {
    isLoading: false,
    products: localStorage.getItem('cart-products') ? JSON.parse(localStorage.getItem('cart-products')) : []
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initialValue,
    reducers: {
        add: (state, action) => {
            state.products.push(action.payload);
            localStorage.setItem('cart-products', JSON.stringify(state.products));
        },
        remove: (state, action) => {
            const filteredProducts = state.products.filter(product => product.name !== action.payload);
            localStorage.setItem('cart-products', JSON.stringify(filteredProducts));
            return {...state, products: filteredProducts};
        },
        incrementProductQuantity: (state, action) => {
            state.products.forEach((product) => { 
                if (product.name === action.payload) {
                    product.quantity = product.quantity + 1;
                } 
            });
            localStorage.setItem('cart-products', JSON.stringify(state.products));
        },
        decrementProductQuantity: (state, action) => {
            state.products.forEach((product) => { 
                if (product.name === action.payload && product.quantity > 1) {
                    product.quantity = product.quantity - 1;
                } 
            });
            localStorage.setItem('cart-products', JSON.stringify(state.products));
        }
    }
});

export const { add, remove, incrementProductQuantity, decrementProductQuantity } = cartSlice.actions;

export default cartSlice.reducer;
