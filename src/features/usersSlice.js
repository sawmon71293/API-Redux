import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=5");
    const data = await response.json();
    return formattedUsers(data.results);
  } catch (error) {
    throw new Error("Could not fetch users");
  }
});

const formattedUsers = (results) => {
  return results.map((user) => {
    const { name, email, picture } = user;
    return {
      uuid: uuidv4(),
      picture: picture.medium,
      name: `${name.first} ${name.last}`,
      email,
    };
  });
};

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
