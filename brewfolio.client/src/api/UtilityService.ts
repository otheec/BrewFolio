const BASE_URL = 'http://localhost:5206/api';

export const UtilityService = {
  uploadBreweries: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/utility/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const breweries = await response.json();
    return breweries;
  },
};
