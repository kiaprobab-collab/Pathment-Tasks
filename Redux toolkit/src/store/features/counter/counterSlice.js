import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.value += 1;
        },
        // Action willl be used when data is coming
        decrement: (state, action) => {
            state.value -= 1;
        },
        changeName: (state, action) => {
            console.log(action)
            state.value = action.payload
        }
    }          
})

export const {increment, decrement, changeName} = counterSlice.actions

export default counterSlice.reducer