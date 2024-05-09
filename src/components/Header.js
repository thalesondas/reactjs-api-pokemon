import { useState } from 'react'
import { Container, Row, Col, Image, Button, Form, Alert } from 'react-bootstrap'
import PersonalizedFormSelect from './PersonalizedFormSelect'
import PokeApiLogo from '../images/pokeapi_logo.png'
import '../assets/Header.css'

const Header = () => {

    const [erro, setErro] = useState('')
    const [nome, setNome] = useState('')
    const [tipo1, setTipo1] = useState('')
    const [tipo2, setTipo2] = useState('')
    const [dados, setDados] = useState([])

    const pesquisarNome = () => {
        setErro('')
        if(nome < 3){
            setErro('Para procurar pelo nome, precisa de pelo menos 3 caracteres.')
        } else {
            fetch('https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0')
                .then(resposta => resposta.json())
                .then(dadosGeral => dadosGeral.results)
                .then(dados => {
                    const nomeFormatado = nome.toLowerCase().trim()
                    const dadosFiltrados = dados.filter(pokemon => pokemon.name.includes(nomeFormatado))
                    if(dadosFiltrados.length === 0){
                        setErro('Nenhum Pokémon com esse nome foi encontrado.')
                    } else {
                        setDados(dadosFiltrados);
                        console.log(dadosFiltrados);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
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
                        <PersonalizedFormSelect texto='Escolha o 1º tipo'/>
                    </Col>
                    <Col>
                        <PersonalizedFormSelect texto='Escolha o 2º tipo'/>
                    </Col>
                    <Col>
                        <Button>Pesquisar pelo tipo</Button>
                    </Col>
                    <Col>
                        <Form.Control onChange={(e) => setNome(e.target.value)} type="text" placeholder="Procure pelo nome"/>
                    </Col>
                    <Col>
                        <Button onClick={pesquisarNome}>Pesquisar pelo nome</Button>
                    </Col>
                </Row>
            </Container>
            {erro && <Alert className='alert-sm mt-4' variant='danger'>{erro}</Alert>}
        </header>
    )
}

export default Header