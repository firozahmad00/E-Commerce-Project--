import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialValue = {
    isLoading: false,
    data: {},
    myOrders: []
};

const ordersSlice = createSlice({
    name: 'ordersSlice',
    initialState: initialValue,
    reducers: () => {

    },
    extraReducers: (builder) => {
        builder.addCase(placeOrderApi.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(placeOrderApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        }).addCase(myOrdersAPi.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(myOrdersAPi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.myOrders = action.payload;
        })
    }
});

export const placeOrderApi = createAsyncThunk('placeOrderApi', async (payload) => {
    try {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        let data = await axios.post('http://localhost:3001/v1/orders/create', payload, {headers: {Authorization: 'Bearer ' + userInfo.token}});
        return data.data.order;
    } catch(error) {
        return error;
    }
});

export const myOrdersAPi = createAsyncThunk('myOrdersAPi', async () => {
    try {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        let data = await axios.get('http://localhost:3001/v1/orders/' + userInfo.userId, {headers: {Authorization: 'Bearer ' + userInfo.token}});
        return data.data.orders;
    } catch(error) {
        return error;
    }
});

export default ordersSlice.reducer;
