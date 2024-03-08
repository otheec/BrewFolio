import { Beer } from "../model/Beer";

interface PaginatedBeersResponse {
  totalCount: number;
  beers: Beer[];
}

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

  getPaginatedBeers: async (pageNumber: number = 1, pageSize: number = 50): Promise<PaginatedBeersResponse> => {
    const response = await fetch(`${BASE_URL}/beer/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`, {credentials: 'include'});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json() as PaginatedBeersResponse;
    return data;
  },

  addBeer: async (beer: Beer, breweryId: number): Promise<{ id: number }> => {
    const url = `${BASE_URL}/beer?breweryId=${encodeURIComponent(breweryId)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(beer),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
    }
    return await response.json();
  },

  deleteBeer: async (id: number) => {
    const url = `${BASE_URL}/beer/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  },

};
