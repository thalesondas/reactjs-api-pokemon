import { Image } from 'react-bootstrap'
import PokeApiLogo from '../images/pokeapi_logo.png'
import '../assets/Footer.css'

const Footer = () => {
    return(
        <footer>
            <Image src={PokeApiLogo} alt='PokéAPI Logo'/>™
        </footer>
    )
}

export default Footer