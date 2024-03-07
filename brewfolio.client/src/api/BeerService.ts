import { Beer } from "../model/Beer";

const BASE_URL = 'http://localhost:5206/api';

export const BeerService = {
  getAllBeers: async (): Promise<Beer[]> => {
    const response = await fetch(`${BASE_URL}/beer`, {credentials: 'include'});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data as Beer[];
  },

  getBeerById: async (id: number): Promise<Beer> => {
    const response = await fetch(`${BASE_URL}/beer/${id}`, {credentials: 'include'});
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const brewery = await response.json() as Beer;
    return brewery;
  },
};
