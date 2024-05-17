import { useEffect, useState } from 'react'
import { Container, Row, Col, Pagination, Image, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setPaginaAtual, setIndexUltimoItem, setItemsAtuais, setIndexPrimeiroItem } from '../reducers/pokemonReducers'
import PokemonButton from './PokemonButton'
import '../assets/Main.css'

const Main = () => {

    const dispatch = useDispatch()

    const [paginas, setPaginas] = useState([]);
    const [animation, setAnimation] = useState('')

    const dados = useSelector(state => state.dados)
    const paginacao = useSelector(state => state.paginacao)
    const pokemon =useSelector(state => state.pokemon)
    const erro = useSelector(state => state.erro)

    const nomePokemonFormatado = pokemon.nomePokemon.charAt(0).toUpperCase() + pokemon.nomePokemon.slice(1)
    const tipo1PokemonFormatado = pokemon.tipo1Pokemon.charAt(0).toUpperCase() + pokemon.tipo1Pokemon.slice(1)
    const tipo2PokemonFormatado = pokemon.tipo2Pokemon ? pokemon.tipo2Pokemon.charAt(0).toUpperCase() + pokemon.tipo2Pokemon.slice(1) : ''

    const paginaAtual = pagina => {
        dispatch(setPaginaAtual(pagina))
    }
    useEffect(() => {
        dispatch(setIndexUltimoItem(paginacao.paginaAtual * paginacao.itemsPorPagina))
    }, [paginacao.paginaAtual])
    useEffect(() => {
        dispatch(setIndexPrimeiroItem(paginacao.indexUltimoItem - paginacao.itemsPorPagina))
    }, [paginacao.indexUltimoItem])
    useEffect(() => {
        dispatch(setItemsAtuais(dados.dados.slice(paginacao.indexPrimeiroItem, paginacao.indexUltimoItem)))
    }, [paginacao.indexPrimeiroItem])

    useEffect(() => {
        const novasPaginas = [];
        for (let pagina = 1; pagina <= Math.ceil((dados.dados.length - 1) / paginacao.itemsPorPagina); pagina++) {
            novasPaginas.push(
                <Pagination.Item onClick={() => paginaAtual(pagina)} key={pagina} active={pagina === paginacao.paginaAtual}>
                    {pagina}
                </Pagination.Item>
            );
        }
        setPaginas(novasPaginas);
    }, [paginacao.itemsAtuais]);

    useEffect(() => {
        setAnimation('fade-left')
        setTimeout(() => {
            setAnimation('')
        }, 900)
    }, [pokemon.imagemPokemon])

    return(
        <main>
            {erro.erro && <Alert className='alert-sm mt-4' variant='danger'>{erro.erro}</Alert>}
            {!erro.erro && 
                <>
                    <Container className='mb-3 mt-4'>
                        <Row className='text-center' style={{ height: '540px' }}>
                            <Col className='d-flex flex-column align-items-center justify-content-center'>
                                {paginacao.itemsAtuais && paginacao.itemsAtuais.map((pokemon) => (
                                    <PokemonButton marginBottom='mb-1' nome={pokemon} />
                                ))}
                            </Col>
                            <Col>
                                <div className={`${animation}`}>
                                    <h1>{nomePokemonFormatado}</h1>
                                    <Image className='mx-auto img-pokemon' src={pokemon.imagemPokemon}></Image>
                                    {pokemon.tipo1Pokemon &&
                                        <div className={`div-pokemon ${pokemon.tipo1Pokemon}`}>
                                            <span>{tipo1PokemonFormatado}</span>
                                        </div>
                                    }
                                    {pokemon.tipo2Pokemon && 
                                        <div className={`div-pokemon ms-4 ${pokemon.tipo2Pokemon}`}>
                                            <span>{tipo2PokemonFormatado}</span>
                                        </div>
                                    }
                                </div>
                            </Col>
                        </Row>
                        {paginas.length > 0 &&
                            <Pagination className='d-flex justify-content-center mt-3'>
                                <Pagination.First onClick={() => paginaAtual(1)} disabled={paginacao.paginaAtual === 1}/>
                                <Pagination.Prev onClick={() => paginaAtual(paginacao.paginaAtual - 1)} disabled={paginacao.paginaAtual === 1}/>
                                {paginas}
                                <Pagination.Next onClick={() => paginaAtual(paginacao.paginaAtual + 1)} disabled={paginacao.paginaAtual === Math.ceil(dados.dados.length / paginacao.itemsPorPagina)}/>
                                <Pagination.Last onClick={() => paginaAtual(Math.ceil(dados.dados.length / paginacao.itemsPorPagina))} disabled={paginacao.paginaAtual === Math.ceil(dados.dados.length / paginacao.itemsPorPagina)} />
                            </Pagination>
                        }
                    </Container>
                </>
            }
        </main>
    )
}

export default Main