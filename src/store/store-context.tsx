import { createContext, useReducer, useMemo, ReactNode, ReducerState } from "react";
import { State, ACTION_TYPE, ContextType } from "../types/state";
import { INITIAL_DATA } from "../constants";
import {Planet} from "../types/planet";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const StoreContext = createContext<ContextType>({state: INITIAL_DATA, dispatch: () => {}})

export enum ACTIONS {
    ADD_PLANET_LIST = 'add_planet_list',
    TOGGLE_LOADING = 'toggle_loading',
    ADD_PlANET_TO_LIST = 'add_planet_fav',
    ADD_PEOPLE_LIST = 'add_people_list'
}

const reducer = (state: State, action: ACTION_TYPE): State => {
    switch (action.type) {
        case ACTIONS.ADD_PLANET_LIST:
            return { ...state, planetList: action.payload, planetsUrl: action.payload.map((planet: Planet) => planet.url)};
        case ACTIONS.ADD_PEOPLE_LIST:
            return { ...state, peopleList: action.payload};
        default:
            return state
    }
}

interface Props {
    children: ReactNode;
}

export const StoreContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_DATA as ReducerState<State>);
    const contextValue: ContextType = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

