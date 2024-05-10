import { Form } from "react-bootstrap";

const PersonalizedFormSelect= (props) => {
    return(
        <Form.Select onChange={props.funcao} >
            <option value=''>{props.texto}</option>
            <option value="normal">Normal</option>
            <option value="fire">Fogo</option>
            <option value="water">Água</option>
            <option value="grass">Grama</option>
            <option value="flying">Voador</option>
            <option value="fighting">Lutador</option>
            <option value="bug">Inseto</option>
            <option value="poison">Veneno</option>
            <option value="electric">Elétrico</option>
            <option value="ground">Terra</option>
            <option value="rock">Pedra</option>
            <option value="ice">Gelo</option>
            <option value="psychic">Psíquico</option>
            <option value="ghost">Fantasma</option>
            <option value="steel">Ferro</option>
            <option value="dragon">Dragão</option>
            <option value="dark">Sombrio</option>
            <option value="fairy">Fada</option>
        </Form.Select>
    )
}

export default PersonalizedFormSelect