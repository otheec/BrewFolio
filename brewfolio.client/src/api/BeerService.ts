import { Beer } from "../model/Beer";

const BASE_URL = 'http://localhost:5206/api'; // Adjust based on your environment setup

export const BeerService = {
  getAllBeers: async (): Promise<Beer[]> => {
    const response = await fetch(`${BASE_URL}/beer`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data as Beer[];
  },

  getBeerById: async (id: number): Promise<Beer> => {
    const response = await fetch(`${BASE_URL}/beer/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const brewery = await response.json() as Beer;
    return brewery;
  },
};
