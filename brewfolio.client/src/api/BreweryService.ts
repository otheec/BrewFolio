import { Brewery } from "../model/Brewery";

const BASE_URL = 'http://localhost:5206/api';

export const BreweryService = {
  getAllBreweries: async (): Promise<Brewery[]> => {
    const response = await fetch(`${BASE_URL}/brewery`, { credentials: 'include' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const breweries = await response.json() as Brewery[];
    return breweries;
  },

  getBreweryById: async (id: number): Promise<Brewery> => {
    const response = await fetch(`${BASE_URL}/brewery/${id}`, { credentials: 'include' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const brewery = await response.json() as Brewery;
    return brewery;
  },

  getPaginatedBreweries: async (pageNumber: number = 1, pageSize: number = 50): Promise<{ totalCount: number, breweries: Brewery[] }> => {
    const response = await fetch(`${BASE_URL}/brewery/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`, { credentials: 'include' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { totalCount, breweries } = await response.json();
    return { totalCount, breweries: breweries as Brewery[] };
  },

  getFilteredPaginatedBreweries: async (
    statusIds: number[] = [], 
    typeIds: number[] = [], 
    pageNumber: number = 1, 
    pageSize: number = 50
  ): Promise<{ totalCount: number, breweries: Brewery[] }> => {

    const statusQuery = statusIds.map(id => `statusIds=${id}`).join('&');
    const typeQuery = typeIds.map(id => `typeIds=${id}`).join('&');
    const paginationQuery = `pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const queryParams = `${statusQuery}&${typeQuery}&${paginationQuery}`;
  
    const response = await fetch(`${BASE_URL}/brewery/filtered?${queryParams}`, { credentials: 'include' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return { 
      totalCount: data.totalCount, 
      breweries: data.breweries as Brewery[] 
    };
  },

  searchBreweriesByLongName: async (query: string, maxResults: number = 10): Promise<Brewery[]> => {
    const response = await fetch(`${BASE_URL}/brewery/search?query=${encodeURIComponent(query)}&maxResults=${maxResults}`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const breweries = await response.json() as Brewery[];
    return breweries;
  },  
  
};
