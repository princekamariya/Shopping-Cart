import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUES = Object.freeze({
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
        // setProducts(state, action) {
        //     // Do not do this NEVER : We can't call asyncronous calls from inside reducers because reducers calls are syncronous it is pure function we can't perform side effect from reducer so for geeting this data from this api req we use thunk middleware
        //     // const res = await fetch("https://fakestoreapi.com/products");
        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     state.status = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUES.ERROR;
            });
    },
});

export const { setProducts, setStatus } = productSlice.actions;

export default productSlice.reducer;

// Thunks:
// so this is second way we can use thunk but if we use this way then we need to add extra property that is extraReducers in productSlice that will be function in that we get builder from redux toolkit and here in createAsyncThunk first we need to give unique isentifier
// as first parameter so here that is products/fetch and secodn is async function and this works like promises.
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
});

// Thunk is a function which returns a function and that returned function will be asyncronous
// Apart from that that return function has two parameters that is dispatch and getState
// dispacth: for dispatching an action to make changes in state
// getState: used to get current state inside our thunk like Below:
// const prop = getState().data

// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUES.LOADING));
//         try {
//             const res = await fetch("https://fakestoreapi.com/products");
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUES.ERROR));
//         }
//     };
// }
