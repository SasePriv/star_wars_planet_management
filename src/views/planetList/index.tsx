import CardPlanetInfo from '../../components/cardPlanetInfo';
import StarWarsLogo from '../../assets/images/star-wars-logo.png';
import './style.css';
import { useEffect } from "react";

function PlanetList() {
    return (
        <div className="container">
            <div className="logo-container">
                <img className="star-wars-logo" src={StarWarsLogo} alt="star wars logo"/>
            </div>
            <CardPlanetInfo/>
        </div>
    )
}

export default PlanetList
