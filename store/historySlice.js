import { createSlice } from "@reduxjs/toolkit";


const historySlice = createSlice({
    name: 'history',
    initialState: {
        items:[]
    },
    reducers: {
        addHistoryItem: (state, action) => {
                console.log("Test")
        }
    }
})

export default historySlice.reducer;
export const {addHistoryItem} = historySlice.actions;