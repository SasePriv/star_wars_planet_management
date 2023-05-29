import { Planet } from './types/planet';
import { People } from "./types/people";
import { fetchAllPages } from './helpers/http';

const API_URL = import.meta.env.VITE_STAR_WARS_ENDPOINT;
const GET_PLANETS_ENDPOINT = (page = 1): string => `${API_URL}/planets/?page=${page}`;
const GET_PEOPLES_ENDPOINT = (page = 1): string => `${API_URL}/people/?page=${page}`;

export const getPlanetListRequest = async(): Promise<Planet[]> => {
  return await fetchAllPages<Planet>(GET_PLANETS_ENDPOINT);
};

export const getPeopleListRequest = async(): Promise<People[]> => {
  return await fetchAllPages<People>(GET_PEOPLES_ENDPOINT);
};
