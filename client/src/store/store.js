import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducers';

const userInfoFromStorage = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : null;

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: {
        user: { userInfo: userInfoFromStorage }
    }
})

export default store;