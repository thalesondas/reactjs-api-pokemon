import { setImagemPokemon } from '../reducers/pokemonReducers'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

const PokemonButton = (props) => {

    const dispatch = useDispatch()

    const nomeFormatado = props.nome.charAt(0).toUpperCase() + props.nome.slice(1)

    const escolherPokemon = (nome) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${nome}/`)
            .then(resp => resp.json())
            .then(resp => resp.sprites.front_default)
            .then(resp => dispatch(setImagemPokemon(resp)))
            .catch(err => console.log(err))
    }

    return(
        <Button onClick={() => escolherPokemon(props.nome)} className={props.marginBottom}>{nomeFormatado}</Button>
    )
}

export default PokemonButton