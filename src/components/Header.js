import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setNome, setTipo1, setTipo2, setDados, setErro, setPaginaAtual, setIndexUltimoItem, setIndexPrimeiroItem, setItemsAtuais } from '../redux/pokemonSlicers'
import PersonalizedFormSelect from './PersonalizedFormSelect'
import PokeApiLogo from '../images/pokeapi_logo.png'
import '../assets/Header.css'

const Header = () => {

    const dispatch = useDispatch()

    const pesquisa = useSelector(state => state.pesquisa)

    const pesquisarNome = () => {
        dispatch(setErro(''))
        dispatch(setDados([]))
        if(pesquisa.nome.length < 2){
            dispatch(setErro('Para procurar pelo nome, precisa de pelo menos 2 caracteres.'))
            dispatch(setItemsAtuais([]))
        } else {
            fetch('https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0')
                .then(resp => resp.json())
                .then(respDadosGeral => respDadosGeral.results)
                .then(respDados => respDados.map(pokemon => pokemon.name))
                .then(respDadosMap => respDadosMap.filter(pokemon => pokemon.includes(pesquisa.nome)))
                .then(respDadosFiltrado => {
                    if(respDadosFiltrado.length === 0){
                        dispatch(setErro('Nenhum Pokémon com essas letras no nome foi encontrado.'))
                    } else {
                        dispatch(setDados(respDadosFiltrado));
                        dispatch(setPaginaAtual(1))
                        dispatch(setIndexUltimoItem(13))
                        dispatch(setIndexPrimeiroItem(0))
                        dispatch(setItemsAtuais(respDadosFiltrado.slice(0, 13)))
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const pesquisarTipo = async() => {
        dispatch(setErro(''))
        dispatch(setDados([]))
        if(pesquisa.tipo1 === ''){
            dispatch(setErro('Pelo menos o 1º tipo tem que ser escolhido.'))
            dispatch(setItemsAtuais([]))
        } else if(pesquisa.tipo2 === '') {
            fetch(`https://pokeapi.co/api/v2/type/${pesquisa.tipo1}`)
                .then(resp => resp.json())
                .then(respDadosGeral => respDadosGeral.pokemon)
                .then(respDados => respDados.map(pokemon => pokemon.pokemon.name))
                .then(respDadosFinal => {
                    dispatch(setDados(respDadosFinal))
                    dispatch(setPaginaAtual(1))
                    dispatch(setIndexUltimoItem(13))
                    dispatch(setIndexPrimeiroItem(0))
                    dispatch(setItemsAtuais(respDadosFinal.slice(0, 13)))
                })
                .catch(err => console.log(err))
        } else if(pesquisa.tipo1 === pesquisa.tipo2){
            try{
                const pokemonFiltrado= []

                const resp = await fetch(`https://pokeapi.co/api/v2/type/${pesquisa.tipo1}`)
                const dados = await resp.json()
                const pokemon = dados.pokemon

                await Promise.all(
                    pokemon.map(async (pokemon) => {
                        const url = pokemon.pokemon.url;
                        const respLoop = await fetch(url);
                        const dadosLoop = await respLoop.json();

                        if(dadosLoop.types.length === 1){
                            pokemonFiltrado.push(dadosLoop.name)
                        }
                    })
                )

                dispatch(setDados(pokemonFiltrado))
                dispatch(setPaginaAtual(1))
                dispatch(setIndexUltimoItem(13))
                dispatch(setIndexPrimeiroItem(0))
                dispatch(setItemsAtuais(pokemonFiltrado.slice(0, 13)))
            }
            catch (err) {
                console.log(err)
            }               
        } else {
            try{
                const [resp1, resp2] = await Promise.all([
                    fetch(`https://pokeapi.co/api/v2/type/${pesquisa.tipo1}`),
                    fetch(`https://pokeapi.co/api/v2/type/${pesquisa.tipo2}`)
                ])

                const respDados1 = await resp1.json();
                const respDados2 = await resp2.json();

                const dadosTipo1Map = respDados1.pokemon.map(pokemon => pokemon.pokemon.name);
                const dadosTipo2Map = respDados2.pokemon.map(pokemon => pokemon.pokemon.name);

                const dadosFinal = dadosTipo1Map.filter(nome => dadosTipo2Map.includes(nome))

                if(dadosFinal.length === 0){
                    dispatch(setErro('Nenhum Pokémon com essa combinação de tipos foi encontrado.'))
                    dispatch(setItemsAtuais([]))
                } else {
                    dispatch(setDados(dadosFinal))
                    dispatch(setPaginaAtual(1))
                    dispatch(setIndexUltimoItem(13))
                    dispatch(setIndexPrimeiroItem(0))
                    dispatch(setItemsAtuais(dadosFinal.slice(0, 13)))
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    return(
        <header className='d-flex justify-content-center align-items-center'>
            <Container fluid>
                <Row>
                    <Col>
                        <Image src={PokeApiLogo} alt='PokéAPI Logo'/>™
                    </Col>
                    <Col>
                        <PersonalizedFormSelect funcao={e => dispatch(setTipo1(e.target.value))} texto='Escolha o 1º tipo'/>
                    </Col>
                    <Col>
                        <PersonalizedFormSelect funcao={e => dispatch(setTipo2(e.target.value))} texto='Escolha o 2º tipo'/>
                    </Col>
                    <Col>
                        <Button onClick={pesquisarTipo}>Pesquisar pelo tipo</Button>
                    </Col>
                    <Col>
                        <Form.Control onChange={e => dispatch(setNome(e.target.value))} type="text" placeholder="Procure pelo nome"/>
                    </Col>
                    <Col>
                        <Button onClick={pesquisarNome}>Pesquisar pelo nome</Button>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header