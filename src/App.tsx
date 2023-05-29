import {useContext, useEffect} from "react";
import PlanetView from './views/planetView';
import {ACTIONS, StoreContext } from "./store/store-context";
import {getPlanetListRequest, getPeopleListRequest} from "./api";
import {Planet} from "./types/planet";
import {ContextType} from "./types/state";
import {People} from "./types/people";

function App() {
    const { dispatch }: ContextType = useContext(StoreContext);

    useEffect(() => {
        dispatch({ type: ACTIONS.TOGGLE_LOADING, payload: true })
        getPlanetListRequest()
            .then((planetList: Planet[]) => {
                dispatch({ type: ACTIONS.ADD_PLANET_LIST, payload: planetList })
                dispatch({ type: ACTIONS.TOGGLE_LOADING, payload: false })
        });
        dispatch({ type: ACTIONS.TOGGLE_LOADING, payload: true })
        getPeopleListRequest()
            .then((peopleList: People[]) => {
                dispatch({ type: ACTIONS.ADD_PEOPLE_LIST, payload: peopleList })
                dispatch({ type: ACTIONS.TOGGLE_LOADING, payload: false })
            })
    }, [])

  return (
        <PlanetView/>
  )
}

export default App
