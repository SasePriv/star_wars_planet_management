import React from "react";
import { Planet } from './planet'
import { ACTIONS } from "../store/store-context";

export type State = {
    planetList: Planet[];
    loading: boolean;
    planetFav: Planet[];
}

export type ACTION_TYPE =
    | { type: ACTIONS.ADD_PLANET_LIST, payload: Planet[] }
    | { type: ACTIONS.TOGGLE_LOADING; payload: boolean }
    | { type: ACTIONS.ADD_PlANET_FAV; payload: Planet }
    | { type: ACTIONS.DELETE_PLANET_FAV; payload: Planet }
    | { type: ACTIONS.EDIT_PLANET_FAV; payload: Planet }

export type ContextType = {
    state: State,
    dispatch: React.Dispatch<ACTION_TYPE>;
}
