import React from "react";
import { Planet } from './planet'
import { ACTIONS } from "../store/store-context";
import {People} from "./people";

export type State = {
    planetList: Planet[];
    loading: boolean;
    peopleList: People[];
    planetsUrl: string[]
}

export type ACTION_TYPE =
    | { type: ACTIONS.ADD_PLANET_LIST, payload: Planet[] }
    | { type: ACTIONS.TOGGLE_LOADING; payload: boolean }
    | { type: ACTIONS.ADD_PlANET_TO_LIST; payload: Planet }
    | { type: ACTIONS.ADD_PEOPLE_LIST; payload: People[] }

export type ContextType = {
    state: State,
    dispatch: React.Dispatch<ACTION_TYPE>;
}
