import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./pokemonSlicers";

const store = configureStore({
    reducer: rootReducer
})

export default store;