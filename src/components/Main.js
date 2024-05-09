import { Container, Row, Col } from 'react-bootstrap'
import PokemonButton from './PokemonButton'
import '../assets/Main.css'

const Main = () => {
    return(
        <main>
            <Container>
                <Row className='text-center' >
                    <Col>
                        <PokemonButton />
                    </Col>
                    <Col >
                        <p>Teste2</p>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Main