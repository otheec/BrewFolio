import { BreweryType } from "../model/BreweryType";

const BASE_URL = 'http://localhost:5206/api';

export const BreweryTypeService = {
  getAllTypes: async (): Promise<BreweryType[]> => { // Fixed method name to reflect its purpose
    const response = await fetch(`${BASE_URL}/brewerytype`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const types = await response.json() as BreweryType[];
    return types;
  },
};
