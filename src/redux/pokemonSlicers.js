import { createSlice, combineReducers } from '@reduxjs/toolkit';

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

const pesquisaSlice = createSlice({
    name: 'pesquisa',
    initialState:{
        nome: '',
        tipo1: '',
        tipo2: ''
    },
    reducers: {
        setNome: (state, action) => { state.nome = action.payload },
        setTipo1: (state, action) => { state.tipo1 = action.payload },
        setTipo2: (state, action) => { state.tipo2 = action.payload }
    }
})

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: { 
        nomePokemon: '',
        tipo1Pokemon: '',
        tipo2Pokemon: '',
        imagemPokemon: '' },
    reducers: {
        setNomePokemon: (state, action) => { state.nomePokemon = action.payload },
        setTipo1Pokemon: (state, action) => { state.tipo1Pokemon = action.payload },
        setTipo2Pokemon: (state, action) => { state.tipo2Pokemon = action.payload },
        setImagemPokemon: (state, action) => { state.imagemPokemon = action.payload }
    }
})

const paginacaoSlice = createSlice({
    name: 'paginacao',
    initialState: {
        paginaAtual: 0,
        itemsPorPagina: 13,
        indexUltimoItem: 0,
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
    dados: dadosSlice.reducer,
    erro: erroSlice.reducer,
    pesquisa: pesquisaSlice.reducer,
    pokemon: pokemonSlice.reducer,
    paginacao: paginacaoSlice.reducer
})

export const { setDados } = dadosSlice.actions;
export const { setErro } = erroSlice.actions;
export const { setNome } = pesquisaSlice.actions;
export const { setTipo1 } = pesquisaSlice.actions;
export const { setTipo2 } = pesquisaSlice.actions;
export const { setNomePokemon } = pokemonSlice.actions;
export const { setTipo1Pokemon } = pokemonSlice.actions;
export const { setTipo2Pokemon } = pokemonSlice.actions;
export const { setImagemPokemon } = pokemonSlice.actions;
export const { setPaginaAtual } = paginacaoSlice.actions;
export const { setIndexUltimoItem } = paginacaoSlice.actions;
export const { setIndexPrimeiroItem } = paginacaoSlice.actions;
export const { setItemsAtuais } = paginacaoSlice.actions;
export default rootReducer;