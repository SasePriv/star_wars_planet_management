import { Planet } from "../../types/planet";
import CardPlanetInfo from '../cardPlanetInfo';
import './style.css'

interface Props {
    planetList: Planet[]
}

function PlanetList({ planetList }: Props) {
    return (
        <div className="card-list">
            {planetList.map((planet: Planet, index:number) => (
                <CardPlanetInfo planet={planet} key={index}/>
            ))}
        </div>
    )
}

export default PlanetList