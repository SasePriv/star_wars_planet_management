import axios from 'axios';
import { PlanetResponseApi, Planet } from './types/planet';

const API_URL = import.meta.env.VTIE_STAR_WARS_ENDPOINT
const GET_PLANETS_ENDPOINT = (page = '1') => `${API_URL}/planets/?page=${page}`

export const getPlanetListRequest = async (): Promise<Planet[]> => {
    let pageKey = '1';
    let keepFetching = true;
    const planetList: Planet[] = [];
    while (keepFetching) {
        try {
         const response = await axios.get<PlanetResponseApi>(GET_PLANETS_ENDPOINT(pageKey));
         const { data } = response;
         planetList.concat(data.results);
         if (data.next === null) {
             keepFetching = false;
             continue
         }
         pageKey += 1;
        } catch (e) {
            console.log(e)
        }
    }
    return planetList
}
