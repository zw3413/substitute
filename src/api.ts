// api.ts
export const fetchTextFromURL = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const text = await response.text();
      return text;
    } catch (error) {
      console.error('Error fetching text:', error);
      throw error;
    }
  };
  