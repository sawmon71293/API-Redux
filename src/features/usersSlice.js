import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const formattedUsers = (results) => results.map((user) => {
  const { name, email, picture } = user;
  return {
    uuid: uuidv4(),
    picture: picture.medium,
    name: `${name.first} ${name.last}`,
    email,
  };
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=5');
    const data = await response.json();
    return formattedUsers(data.results);
  } catch (error) {
    throw new Error('Could not fetch users');
  }
});

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        const states = state;
        states.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const states = state;
        states.isLoading = false;
        states.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        const states = state;
        states.isLoading = false;
        states.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
