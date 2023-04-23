import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/usersSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
