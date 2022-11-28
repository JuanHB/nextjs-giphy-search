import envVars from '../config/environment';
import { getCaughtErrorMessage } from './getCaughtErrorMessage';

export type GiphyItem = {
  id: string,
  title: string,
  images: {
    original: {
      url: string
    }
  }
}

export default class GiphyApiFetcher {

  static async search(query: string): Promise<GiphyItem[]> {
    const apiUrl = `${this.getApiUrl('search')}&q=${query}`
    return await this.fetcher(apiUrl);
  }

  static async trending(): Promise<GiphyItem[]> {
    const apiUrl = `${this.getApiUrl('trending')}`
    return await this.fetcher(apiUrl);
  }

  static getApiUrl(endpoint: 'trending' | 'search') {
    if(!envVars.giphyApiToken){
      console.warn('Your .env file is missing the NEXT_PUBLIC_GIPHY_API_TOKEN variable!');
    }
    return `https://api.giphy.com/v1/gifs/${endpoint}?api_key=${envVars.giphyApiToken}`;
  }

  static async fetcher(url: string) {
    try {
      const res = await fetch(url);
      const { data } = await res.json();
      return data;
    } catch (error) {
      // do something with the errors, display toasts, messages, etc...
      console.log(getCaughtErrorMessage(error));
    }
  }
}
