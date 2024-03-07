import { Brewery } from "../model/Brewery";

const BASE_URL = 'http://localhost:5206/api';

export const BreweryService = {
  getAllBreweries: async (): Promise<Brewery[]> => {
    const response = await fetch(`${BASE_URL}/brewery`, {credentials: 'include'});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const breweries = await response.json() as Brewery[];
    return breweries;
  },

  getBreweryById: async (id: number): Promise<Brewery> => {
    const response = await fetch(`${BASE_URL}/brewery/${id}`, {credentials: 'include'});
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const brewery = await response.json() as Brewery;
    return brewery;
  },

  getPaginatedBreweries: async (pageNumber: number = 1, pageSize: number = 50): Promise<{totalCount: number, breweries: Brewery[]}> => {
    const response = await fetch(`${BASE_URL}/brewery/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`, {credentials: 'include'});
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { totalCount, breweries } = await response.json();
    return { totalCount, breweries: breweries as Brewery[] };
  },
};
