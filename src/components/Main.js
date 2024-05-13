import { useEffect } from 'react'
import { Container, Row, Col, Pagination, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setPaginaAtual, setIndexUltimoItem, setItemsAtuais, setIndexPrimeiroItem } from '../reducers/pokemonReducers'
import PokemonButton from './PokemonButton'
import '../assets/Main.css'

const Main = () => {

    const dispatch = useDispatch()

    const dados = useSelector(state => state.dados)
    const erro = useSelector((state) => state.erro)
    const paginacao = useSelector((state) => state.paginacao)

    const paginaAtual = (pagina) => {
        dispatch(setPaginaAtual(pagina))
    }
    useEffect(() => {
        dispatch(setIndexUltimoItem(paginacao.paginaAtual * paginacao.itemsPorPagina))
    }, [paginacao.paginaAtual])
    useEffect(() => {
        dispatch(setIndexPrimeiroItem(paginacao.indexUltimoItem - paginacao.itemsPorPagina))
    }, [paginacao.indexUltimoItem])
    useEffect(() => {
        dispatch(setItemsAtuais(dados.dados.slice(paginacao.indexPrimeiroItem, paginacao.indexUltimoItem + 1)))
    }, [paginacao.indexPrimeiroItem])

    const debugar = () => {
        console.log('dados ' + dados.dados)
        console.log('erro ' + erro.erro)
        console.log('paginaAtual ' + paginacao.paginaAtual)
        console.log('ultimoIndex ' + paginacao.indexUltimoItem)
        console.log('primeiroIndex ' + paginacao.indexPrimeiroItem)
        console.log('itemsPorPagina ' + paginacao.itemsPorPagina)
        console.log('itemsAtuais ' + paginacao.itemsAtuais)
    }

    return(
        <main>
            <Container className='mb-3 mt-4'>
                <Row className='text-center'>
                    <Col className='d-flex flex-column'>    
                        {paginacao.itemsAtuais && paginacao.itemsAtuais.map((pokemon) => (
                            <PokemonButton marginBottom='mb-1' nome={pokemon} />
                        ))}
                        <Pagination className='d-flex justify-content-center mt-2'>
                            <Pagination.First onClick={() => paginaAtual(1)} disabled={paginacao.paginaAtual === 1}/>
                            <Pagination.Prev onClick={() => paginaAtual(paginacao.paginaAtual - 1)} disabled={paginacao.paginaAtual === 1}/>
                            
                            <Pagination.Next onClick={() => paginaAtual(paginacao.paginaAtual + 1)} disabled={paginacao.paginaAtual === Math.ceil(dados.dados.length / paginacao.itemsPorPagina)}/>
                            <Pagination.Last onClick={() => paginaAtual(Math.ceil(dados.dados.length / paginacao.itemsPorPagina))} disabled={paginacao.paginaAtual === Math.ceil(dados.dados.length / paginacao.itemsPorPagina)} />
                        </Pagination>
                    </Col>
                    <Col >
                        <Button onClick={debugar} >Debugger</Button>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Main