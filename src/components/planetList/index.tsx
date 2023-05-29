import { Planet } from "../../types/planet";
import CardPlanetInfo from '../cardPlanetInfo';
import './style.css'

interface Props {
    planetList: Planet[]
    detailPlanet: (planet: Planet) => void
    editPlanet: (planet: Planet) => void
    deletePlanet: (planet: Planet) => void
}

function PlanetList({ planetList, detailPlanet, editPlanet, deletePlanet }: Props) {
    return (
        <div className="card-list">
            {planetList.map((planet: Planet, index:number) => (
                <CardPlanetInfo
                    planet={planet}
                    key={index}
                    onEdit={editPlanet}
                    onDelete={deletePlanet}
                    onDetail={detailPlanet}
                />
            ))}
        </div>
    )
}

export default PlanetList;
