import { BreweryStatus } from "../model/BreweryStatus";

const BASE_URL = 'http://localhost:5206/api';

export const BreweryStatusService = {
  getAllStatuses: async (): Promise<BreweryStatus[]> => {
    const response = await fetch(`${BASE_URL}/brewerystatus`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const statuses = await response.json() as BreweryStatus[];
    return statuses;
  },
};
