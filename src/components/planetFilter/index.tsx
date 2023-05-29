import { MdAddCircle } from 'react-icons/md';
import './style.css';
import React from "react";

interface PlanetFilterProps {
    add: (boolean: boolean) => void;
    setPlanetSearchFilter: (input: string) => void;
}

function PlanetFilter({ add, setPlanetSearchFilter }: PlanetFilterProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      setPlanetSearchFilter(value)
    }

    return(
        <div className="filter-container">
            <div className="filter-content">
                <input onChange={handleChange} className="search" placeholder="Search" type="text" name="search"/>
                <MdAddCircle onClick={() => add(true)} className="add-icon" title="Add new planet" size="25"/>
            </div>
        </div>
    )
}

export default PlanetFilter;
