import CardPlanetInfo from '../../components/cardPlanetInfo';
import StarWarsLogo from '../../assets/images/star-wars-logo.png';
import './style.css';
import {useContext, useEffect} from "react";
import {ContextType} from "../../types/state";
import {StoreContext} from "../../store/store-context";

function PlanetList() {
    const {  state }: ContextType = useContext(StoreContext);

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
