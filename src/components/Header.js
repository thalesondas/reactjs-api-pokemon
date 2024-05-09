import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import PersonalizedFormSelect from './PersonalizedFormSelect'
import PokeApiLogo from '../images/pokeapi_logo.png'
import '../assets/Header.css'

const Header = () => {
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
                    <Form.Control type="text" placeholder="Procure pelo nome"/>
                    </Col>
                    <Col>
                        <Button>Pesquisar pelo nome</Button>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header