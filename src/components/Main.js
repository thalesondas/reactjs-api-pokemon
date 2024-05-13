import { useEffect, useState } from 'react'
import { Container, Row, Col, Pagination, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setPaginaAtual, setIndexUltimoItem, setItemsAtuais, setIndexPrimeiroItem } from '../reducers/pokemonReducers'
import PokemonButton from './PokemonButton'
import '../assets/Main.css'

const Main = () => {

    const dispatch = useDispatch()
    const [paginas, setPaginas] = useState([]);

    const dados = useSelector(state => state.dados)
    const paginacao = useSelector((state) => state.paginacao)
    const imagemPokemon = useSelector(state => state.imagemPokemon)

    const paginaAtual = (pagina) => {
        dispatch(setPaginaAtual(pagina))
    }
    useEffect(() => {
        dispatch(setIndexUltimoItem(paginacao.paginaAtual * paginacao.itemsPorPagina))
    }, [paginacao.paginaAtual])
    useEffect(() => {
        dispatch(setIndexPrimeiroItem(paginacao.indexUltimoItem - paginacao.itemsPorPagina + 1))
    }, [paginacao.indexUltimoItem])
    useEffect(() => {
        dispatch(setItemsAtuais(dados.dados.slice(paginacao.indexPrimeiroItem, paginacao.indexUltimoItem + 1)))
    }, [paginacao.indexPrimeiroItem])

    useEffect(() => {
        const novasPaginas = [];
        for (let pagina = 1; pagina <= Math.ceil(dados.dados.length / paginacao.itemsPorPagina); pagina++) {
            novasPaginas.push(
                <Pagination.Item onClick={() => paginaAtual(pagina)} key={pagina} active={pagina === paginaAtual}>
                    {pagina}
                </Pagination.Item>
            );
        }
        setPaginas(novasPaginas);
    }, [dados.dados]);

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
                            {paginas}
                            <Pagination.Next onClick={() => paginaAtual(paginacao.paginaAtual + 1)} disabled={paginacao.paginaAtual === Math.ceil(dados.dados.length / paginacao.itemsPorPagina)}/>
                            <Pagination.Last onClick={() => paginaAtual(Math.ceil(dados.dados.length / paginacao.itemsPorPagina))} disabled={paginacao.paginaAtual === Math.ceil(dados.dados.length / paginacao.itemsPorPagina)} />
                        </Pagination>
                    </Col>
                    <Col>
                        <Image style={{ width: 400 }} src={imagemPokemon.imagemPokemon}></Image>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Main