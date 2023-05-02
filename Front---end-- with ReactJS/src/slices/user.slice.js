import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialValue = {
    isLoading: false, 
    data: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
    error: null,
    userInfo: {}
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialValue,
    reducers: {
        logout: (state, action) => {
            state.data = {};
            localStorage.removeItem('userInfo');   
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        }).addCase(userRegister.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(userRegister.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.type === 'success') {
                state.data = action.payload.data;
            } else {
                console.log(action.payload);
                state.error = action.payload.data;
            }
        }).addCase(getUserDataById.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getUserDataById.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload)
            state.userInfo = action.payload;
        })
    }
});
 
export const userLogin = createAsyncThunk('userLogin', async (payload) => {
    try {
        let data = await axios.post('http://localhost:3001/v1/users/login', payload)
        console.log(data);
        localStorage.setItem('userInfo', JSON.stringify(data.data.data));
        return data.data.data;
    } catch(error) {
        console.log(error);
        return error;
    }
});

export const userRegister = createAsyncThunk('userRegister', async (payload) => {
    try {
        let data = await axios.post('http://localhost:3001/v1/users/register', payload)
        localStorage.setItem('userInfo', JSON.stringify(data.data.data));
        return {type: 'success', data: data.data.data};
    } catch(error) {
        console.log(error);
        return {type: 'failure', data: error.response.data};
    }
});

export const getUserDataById = createAsyncThunk('profileInfo', async () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        let data = await axios.get('http://localhost:3001/v1/users/' + userInfo.userId);
        console.log(data);
        return data.data.user;
    } catch(error) {
        return error;
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
