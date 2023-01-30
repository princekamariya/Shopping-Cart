import { createSlice } from "@reduxjs/toolkit";

const STATUES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
});
const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        status: STATUES.IDLE,
    },
    reducers: {
        setProducts(state, action) {
            // Do not do this NEVER : We can't call asyncronous calls from inside reducers because reducers calls are syncronous it is pure function we can't perform side effect from reducer so for geeting this data from this api req we use thunk middleware
            // const res = await fetch("https://fakestoreapi.com/products");
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setProducts, setStatus } = productSlice.actions;

export default productSlice.reducer;

// Thunks:
// Thunk is a function which returns a function and that returned function will be asyncronous
// Apart from that that return function has two parameters that is dispatch and getState 
// dispacth: for dispatching an action to make changes in state
// getState: used to get current state inside our thunk like Below:
// const prop = getState().data
export function fetchProducts() {
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUES.LOADING));
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            dispatch(setProducts(data));
            dispatch(setStatus(STATUES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUES.ERROR));
        }
    };
}
