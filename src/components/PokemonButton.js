import { setImagemPokemon, setNomePokemon, setTipo1Pokemon, setTipo2Pokemon } from '../redux/pokemonSlicers'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

const PokemonButton = (props) => {

    const dispatch = useDispatch()

    const nomeFormatado = props.nome.charAt(0).toUpperCase() + props.nome.slice(1)

    const escolherPokemon = (nome) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${nome}/`)
            .then(resp => resp.json())
            .then(dados => {
                dispatch(setImagemPokemon(dados.sprites.front_default))
                dispatch(setNomePokemon(dados.name))
                dispatch(setTipo1Pokemon(dados.types[0].type.name))
                dispatch(setTipo2Pokemon(dados.types[1] ? dados.types[1].type.name : ''))
            })
            .catch(err => console.log(err))
    }

    return(
        <Button onClick={() => escolherPokemon(props.nome)} className={props.marginBottom}>{nomeFormatado}</Button>
    )
}

export default PokemonButton