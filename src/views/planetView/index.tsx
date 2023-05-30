import React, {useContext, useState, useEffect} from "react";
import {ContextType} from "../../types/state";
import {ACTIONS, StoreContext} from "../../store/store-context";
import PlanetList from '../../components/planetList';
import StarWarsLogo from '../../assets/images/star-wars-logo.png';
import PlanetFilter from "../../components/planetFilter";
import CreateEditPlanetModal from "../../components/createEditPlanetModal";
import PlanetDetailsModal from "../../components/planetDetailsModal";
import ConfirmationModal from "../../components/confirmationModal";
import { PlanetForm, Planet } from "../../types/planet";
import { normalizeStr } from '../../helpers/string';
import './style.css';

interface NormalizedMap {
    normalizedName: string;
    normalizedClimate: string;
    normalizedTerrain: string;
}


function PlanetView() {
    const { state, dispatch }: ContextType = useContext(StoreContext);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [modalType, setModalType] = useState<'create' | 'edit'>('create');
    const [modalDetail, setModalDetail] = useState<boolean>(false);
    const [modalConfirmation, setModalConfirmation] = useState<boolean>(false);
    const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)
    const [planetSearchFilter, setPlanetSearchFilter] = useState<string>('')
    const [filteredProductList, setFilteredProductList] = useState<Planet[]>(state.planetList)
    const normalizedNamesMap: Map<string, NormalizedMap> = new Map();

    const initializeNormalizedNamesMap = (): void => {
        state.planetList.forEach((el: Planet) => {
          normalizedNamesMap.set(el.url, {
            normalizedName: normalizeStr(el.name),
            normalizedClimate: normalizeStr(el.climate),
            normalizedTerrain: normalizeStr(el.terrain)
          });
        });
    }

    const filterProductList = (): void => {
        let planetList: Planet[] = [...state.planetList];
        if (planetSearchFilter !== '' && normalizedNamesMap.size) {
            const token = normalizeStr(planetSearchFilter.trim());
            planetList = planetList.filter((planet: Planet) =>
                normalizedNamesMap.get(planet.url).normalizedName.includes(token)
                || normalizedNamesMap.get(planet.url).normalizedTerrain.includes(token)
                || normalizedNamesMap.get(planet.url).normalizedClimate.includes(token)
            )
        }
        setFilteredProductList(planetList)
    }

    useEffect(() => {
        initializeNormalizedNamesMap();
        filterProductList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.planetList, planetSearchFilter])

    const onCreate = (planet: Planet) => {
        const clonePlanetList = [...state.planetList]
        clonePlanetList.unshift(planet)
        dispatch({ type: ACTIONS.ADD_PLANET_LIST, payload: clonePlanetList })
        onCloseModal()
    }

    const onEdit = (planet: Planet) => {
        const clonePlanetList = [...state.planetList]
        const foundIndex = clonePlanetList.findIndex((x: Planet) => x.url === planet.url)
        clonePlanetList[foundIndex] = planet
        dispatch({ type: ACTIONS.ADD_PLANET_LIST, payload: clonePlanetList })
        onCloseModal()
    }

    const onSave = (planetForm: PlanetForm) => {
        const newPlanet: Planet = {
            name: planetForm.name,
            terrain: planetForm.terrain,
            diameter: planetForm.diameter.toString(),
            climate: planetForm.climate,
            population: planetForm.population.toString(),
            residents: planetForm.residents,
            url: planetForm.url
        }
        modalType === 'create' ? onCreate(newPlanet) : onEdit(newPlanet)
    }

    const onCloseModal = (): void => {
        setSelectedPlanet(null)
        setModalShow(false);
        setModalDetail(false);
        setModalConfirmation(false);
    }

    const editPlanet = (planet: Planet): void => {
        setModalShow(true);
        setModalType('edit')
        setSelectedPlanet(planet)
    }

    const detailPlanet = (planet: Planet): void => {
        setModalDetail(true);
        setSelectedPlanet(planet)
    }

    const deletePlanet = (planet: Planet): void => {
        setModalConfirmation(true);
        setSelectedPlanet(planet)
    }

    const onDeletePlanet = (planet: Planet): void => {
        const clonePlanetList = [...state.planetList]
        const newPlanetList = clonePlanetList.filter((x: Planet) => x.url !== planet.url)
        dispatch({ type: ACTIONS.ADD_PLANET_LIST, payload: newPlanetList })
        onCloseModal()
    }

    return (
        <div className="background-star">
            <div className="container">
                <div className="logo-container">
                    <img className="star-wars-logo" src={StarWarsLogo} alt="star wars logo"/>
                    <h1 className="title-star">Planet Management System</h1>
                </div>
                <PlanetFilter
                    add={(show: boolean) => {
                        setModalShow(show);
                        setModalType('create');
                    }}
                    setPlanetSearchFilter={setPlanetSearchFilter}
                />
                <PlanetList
                    planetList={filteredProductList}
                    detailPlanet={detailPlanet}
                    editPlanet={editPlanet}
                    deletePlanet={deletePlanet}
                />
                <CreateEditPlanetModal
                    show={modalShow}
                    onHide={onCloseModal}
                    type={modalType}
                    onSave={onSave}
                    peopleList={state.peopleList || []}
                    planet={selectedPlanet}
                    planetsUrl={state.planetsUrl}
                />
                {selectedPlanet && <PlanetDetailsModal
                    show={modalDetail}
                    onHide={onCloseModal}
                    planet={selectedPlanet}
                    peoples={state.peopleList || []}
                />}
                <ConfirmationModal
                    show={modalConfirmation}
                    onHide={onCloseModal}
                    title={"Do you want to eliminate the planet: " + (selectedPlanet?.name || '') + "?"}
                    onConfirm={selectedPlanet && (() => onDeletePlanet(selectedPlanet))}
                />
            </div>
        </div>
    )
}

export default PlanetView;
