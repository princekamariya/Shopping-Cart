import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add(state, action) {
            // REDUX: in core redux it says we will not directly mutate our state insted of that we return new state from our reducers like below, but here we direclty mutate our state using state.push but this is one feature of createSlice , so in createSlice we can direclty mutate our state and internally it will do just like core redux
            // return [...state,action.payload]
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload);
        },
    },
});

export const { add, remove } = cartSlice.actions;

export default cartSlice.reducer;
