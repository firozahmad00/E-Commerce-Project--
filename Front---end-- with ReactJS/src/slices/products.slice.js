import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialValue = {
    isLoading: false,
    data: []
};

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: initialValue,
    reducers: () => {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsData.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchProductsData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
    }
});

export const fetchProductsData = createAsyncThunk('fetchProductsData', async (cartData) => {
    console.log(cartData);
    try {
        let data = await axios.get('http://localhost:3001/v1/products');
        data.data.data.forEach(prod => {
            prod.inCart = false;
        });
        data.data.data.forEach(prod => {
            cartData.products.forEach(product => {
                if (prod.name === product.name) {
                    prod.inCart = true;
                }
            });
        });
        return data.data.data;
    } catch(error) {
        return error;
    }
});

export default productsSlice.reducer;
