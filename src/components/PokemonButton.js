import { Button } from 'react-bootstrap'

const PokemonButton = (props) => {

    const nomeFormatado = props.nome.charAt(0).toUpperCase() + props.nome.slice(1)

    return(
        <Button className={props.marginBottom}>{nomeFormatado}</Button>
    )
}

export default PokemonButton