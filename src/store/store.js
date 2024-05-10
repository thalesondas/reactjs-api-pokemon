import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/pokemonReducers";

const store = configureStore({
    reducer: rootReducer
})

export default store;