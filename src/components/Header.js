import { Container, Row, Col, Image, Button, Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setNome, setTipo1, setTipo2, setDados, setErro } from '../reducers/pokemonReducers'
import store from '../store/store'
import PersonalizedFormSelect from './PersonalizedFormSelect'
import PokeApiLogo from '../images/pokeapi_logo.png'
import '../assets/Header.css'

const Header = () => {

    const dispatch = useDispatch()

    const nome = useSelector((state) => state.nome)
    const tipo1 = useSelector((state) => state.tipo1)
    const tipo2 = useSelector((state) => state.tipo2)
    const dados = useSelector((state) => state.dados)
    const erro = useSelector((state) => state.erro)

    const pesquisarNome = () => {
        dispatch(setErro(''))
        dispatch(setDados([]))
        if(nome.nome.length < 2){
            dispatch(setErro('Para procurar pelo nome, precisa de pelo menos 2 caracteres.'))
        } else {
            fetch('https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0')
                .then(resp => resp.json())
                .then(respDadosGeral => respDadosGeral.results)
                .then(respDados => {
                    const nomeFormatado = nome.nome.toLowerCase().trim()
                    return respDados.filter(pokemon => pokemon.name.includes(nomeFormatado))
                })
                .then((respDadosFiltrados) => {
                    if(respDadosFiltrados.length === 0){
                        dispatch(setErro('Nenhum Pokémon com essas letras no nome foi encontrado.'))
                    } else {
                        dispatch(setDados(respDadosFiltrados));
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const pesquisarTipo = () => {
        dispatch(setErro(''))
        dispatch(setDados([]))
        if(tipo1.tipo1 === ''){
            dispatch(setErro('Pelo menos o 1º tipo tem que ser escolhido.'))
        } else if(tipo2.tipo2 === '') {
            fetch(`https://pokeapi.co/api/v2/type/${tipo1.tipo1}`)
                .then((resp) => resp.json())
                .then((respDados) => respDados.pokemon)
                .then((respDados2) => dispatch(setDados(respDados2)))
                .catch((err) => console.log(err))
        }
    }

    return(
        <header>
            <Container>
                <Row>
                    <Col>
                        <Image src={PokeApiLogo} alt='PokéAPI Logo'/>™
                    </Col>
                    <Col>
                        <PersonalizedFormSelect funcao={(e) => dispatch(setTipo1(e.target.value))} texto='Escolha o 1º tipo'/>
                    </Col>
                    <Col>
                        <PersonalizedFormSelect funcao={(e) => dispatch(setTipo2(e.target.value))} texto='Escolha o 2º tipo'/>
                    </Col>
                    <Col>
                        <Button onClick={pesquisarTipo}>Pesquisar pelo tipo</Button>
                    </Col>
                    <Col>
                        <Form.Control onChange={(e) => dispatch(setNome(e.target.value))} type="text" placeholder="Procure pelo nome"/>
                    </Col>
                    <Col>
                        <Button onClick={pesquisarNome}>Pesquisar pelo nome</Button>
                    </Col>
                </Row>
                {erro.erro && <Alert className='alert-sm mt-4' variant='danger'>{erro.erro}</Alert>}
            </Container>
        </header>
    )
}

export default Header