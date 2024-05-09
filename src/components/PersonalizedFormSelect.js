import { Form } from "react-bootstrap";

const PersonalizedFormSelect= (props) => {
    return(
        <Form.Select>
            <option>{props.texto}</option>
            <option value="">Normal</option>
            <option value="">Fogo</option>
            <option value="">Água</option>
            <option value="">Grama</option>
            <option value="">Voador</option>
            <option value="">Lutador</option>
            <option value="">Inseto</option>
            <option value="">Veneno</option>
            <option value="">Elétrico</option>
            <option value="">Terra</option>
            <option value="">Pedra</option>
            <option value="">Gelo</option>
            <option value="">Psíquico</option>
            <option value="">Fantasma</option>
            <option value="">Ferro</option>
            <option value="">Dragão</option>
            <option value="">Sombrio</option>
            <option value="">Fada</option>
        </Form.Select>
    )
}

export default PersonalizedFormSelect