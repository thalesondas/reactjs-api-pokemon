import { createSlice, combineReducers } from '@reduxjs/toolkit';
import { createContext } from 'react';

const nomeSlice = createSlice({
    name: 'nome',
    initialState: { nome: '' },
    reducers: {
        setNome: (state, action) => { state.nome = action.payload }
    }
})

const tipo1Slice = createSlice({
    name: 'tipo1',
    initialState: { tipo1: '' },
    reducers: {
        setTipo1: (state, action) => { state.tipo1 = action.payload }
    }
})

const tipo2Slice = createSlice({
    name: 'tipo2',
    initialState: { tipo2: '' },
    reducers: {
        setTipo2: (state, action) => { state.tipo2 = action.payload }
    }
})

const dadosSlice = createSlice({
    name: 'dados',
    initialState: { dados: [] },
    reducers: {
        setDados: (state, action) => { state.dados = action.payload }
    }
})

const erroSlice = createSlice({
    name: 'erro',
    initialState: { erro: '' },
    reducers: {
        setErro: (state, action) => { state.erro = action.payload }
    }
})

const imagemPokemonSlice = createSlice({
    name: 'imagemPokemon',
    initialState: { imagemPokemon: '' },
    reducers: {
        setImagemPokemon: (state, action) => { state.imagemPokemon = action.payload }
    }
})

const paginacaoSlice = createSlice({
    name: 'paginacao',
    initialState: {
        paginaAtual: 1,
        itemsPorPagina: 13,
        indexUltimoItem: 13,
        indexPrimeiroItem: 0,
        itemsAtuais: []
    },
    reducers: {
        setPaginaAtual: (state, action) => { state.paginaAtual = action.payload },
        setIndexUltimoItem: (state, action) => { state.indexUltimoItem = action.payload },
        setIndexPrimeiroItem: (state, action) => { state.indexPrimeiroItem = action.payload },
        setItemsAtuais: (state, action) => { state.itemsAtuais = action.payload }
    }
})

const rootReducer = combineReducers({
    nome: nomeSlice.reducer,
    tipo1: tipo1Slice.reducer,
    tipo2: tipo2Slice.reducer,
    dados: dadosSlice.reducer,
    erro: erroSlice.reducer,
    imagemPokemon: imagemPokemonSlice.reducer,
    paginacao: paginacaoSlice.reducer
})

export const { setNome } = nomeSlice.actions;
export const { setTipo1 } = tipo1Slice.actions;
export const { setTipo2 } = tipo2Slice.actions;
export const { setDados } = dadosSlice.actions;
export const { setErro } = erroSlice.actions;
export const { setImagemPokemon } = imagemPokemonSlice.actions;
export const { setPaginaAtual } = paginacaoSlice.actions;
export const { setIndexUltimoItem } = paginacaoSlice.actions;
export const { setIndexPrimeiroItem } = paginacaoSlice.actions;
export const { setItemsAtuais } = paginacaoSlice.actions;
export default rootReducer;