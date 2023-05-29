import axios, { AxiosResponse } from 'axios';

export const fetchAllPages =  async <T>(endpoint: (page: number) => string): Promise<T[]> => {
  let pageKey = 1;
  let keepFetching = true;
  const results: T[] = [];
  while (keepFetching) {
    try {
      const response: AxiosResponse<{ results: T[]; next: string | null, previous: string | null, count: number }> = await axios.get(endpoint(pageKey));
      const { data } = response;
      results.push(...data.results);

      if (data.next === null) {
        keepFetching = false;
        continue;
      }

      pageKey += 1;
    } catch (e) {
      console.log(e);
      keepFetching = false;
    }
  }

  return results;
}



