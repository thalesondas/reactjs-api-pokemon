import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import PokemonButton from './PokemonButton'
import '../assets/Main.css'

const Main = () => {

    const dados = useSelector((state) => state.dados)

    return(
        <main>
            <Container className='mb-3 mt-4'>
                <Row className='text-center'>
                    <Col className='d-flex flex-column'>
                        {dados.dados && dados.dados.map((pokemon) => (
                            <PokemonButton marginBottom='mb-1' nome={pokemon.name}></PokemonButton>
                        ))}
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