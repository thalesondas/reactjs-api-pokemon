import { createSlice, combineReducers } from '@reduxjs/toolkit';

const nomeSlice = createSlice({
    name: 'nome',
    initialState: { nome: '' },
    reducers: {
        setNome: (state, action) => { (state.nome = action.payload) }
    }
})

const tipo1Slice = createSlice({
    name: 'tipo1',
    initialState: { tipo1: '' },
    reducers: {
        setTipo1: (state, action) => { (state.tipo1 = action.payload) }
    }
})

const tipo2Slice = createSlice({
    name: 'tipo2',
    initialState: { tipo2: '' },
    reducers: {
        setTipo2: (state, action) => { (state.tipo2 = action.payload) }
    }
})

const dadosSlice = createSlice({
    name: 'dados',
    initialState: { dados: [] },
    reducers: {
        setDados: (state, action) => { (state.dados = action.payload) }
    }
})

const erroSlice = createSlice({
    name: 'erro',
    initialState: { erro: '' },
    reducers: {
        setErro: (state, action) => { (state.erro = action.payload) }
    }
})

const rootReducer = combineReducers({
    nome: nomeSlice.reducer,
    tipo1: tipo1Slice.reducer,
    tipo2: tipo2Slice.reducer,
    dados: dadosSlice.reducer,
    erro: erroSlice.reducer
})

export const { setNome } = nomeSlice.actions;
export const { setTipo1 } = tipo1Slice.actions;
export const { setTipo2 } = tipo2Slice.actions;
export const { setDados } = dadosSlice.actions;
export const { setErro } = erroSlice.actions;
export default rootReducer;