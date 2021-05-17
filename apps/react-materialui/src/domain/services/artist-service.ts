import { Genre } from '../types';
import { HttpClient } from './http-client';

class ArtistService extends HttpClient {
  private static classInstance?: ArtistService;

  private constructor() {
    super('http://localhost:8090');
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ArtistService();
    }

    return this.classInstance;
  }

  public all = async () => {
    try {
      const res = await this.instance.get<any>("/artists", {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      if (res.total > 0) {
        return res.results;
      }
      return []
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

  public get = async ({ queryKey }: any) => {
    /* eslint-disable no-unused-vars */
    const [, { initialData }] = queryKey;
    try {
      const res = await this.instance.get<any>(`/artists/${initialData}`, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      return res.results[0];
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

  public add = async (data: Genre) => {
    try {
      const res = await this.instance.post<any>("/artists", data, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      return res;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

  public update = async (data: Genre) => {
    try {
      const res = await this.instance.put<any>(`/artists/${data.id}`, data, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      return res;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

  public delete = async (id: number) => {
    try {
      const res = await this.instance.delete<any>(`/artists/${id}`, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      return res;
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  };

}

export const artistService = ArtistService.getInstance();
