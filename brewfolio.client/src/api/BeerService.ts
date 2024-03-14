import { Beer } from "../model/Beer";

interface PaginatedBeersResponse {
  totalCount: number;
  beers: Beer[];
}

const BASE_URL = 'http://localhost:5206/api';

export const BeerService = {
  getAllBeers: async (): Promise<Beer[]> => {
    const response = await fetch(`${BASE_URL}/beer`, { credentials: 'include' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data as Beer[];
  },

  getBeerById: async (id: number): Promise<Beer> => {
    const response = await fetch(`${BASE_URL}/beer/${id}`, { credentials: 'include' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const brewery = await response.json() as Beer;
    return brewery;
  },

  getPaginatedBeers: async (pageNumber: number = 1, pageSize: number = 50): Promise<PaginatedBeersResponse> => {
    const response = await fetch(`${BASE_URL}/beer/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`, { credentials: 'include' });
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

  updateBeer: async (id: number, beer: Beer, breweryId: number): Promise<void> => {
    // Mocking Brewery data with generic placeholders
    const mockedBrewery = {
      id: breweryId, // Use the provided breweryId
      name: "Mocked Brewery Name",
      longName: "Mocked Brewery Long Name",
      type: "ExampleType", // Placeholder, replace with a valid BreweryType from your backend
      status: "ExampleStatus", // Placeholder, replace with a valid BreweryStatus from your backend
      visited: true, // Example boolean value
      beers: [], // Assuming an empty array is acceptable here
    };
  
    // Include the mocked brewery in your beer object
    const beerToUpdate = {
      ...beer,
      brewery: mockedBrewery,
    };
  
    const url = `${BASE_URL}/beer/${encodeURIComponent(id)}?breweryId=${encodeURIComponent(breweryId)}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(beerToUpdate), // Send the beer object including the mocked brewery
      credentials: 'include',
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw an Error(`HTTP error! status: ${response.status}, ${errorText}`);
    }
  },
  
  
  
  
};
