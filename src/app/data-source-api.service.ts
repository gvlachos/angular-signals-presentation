import { resource, Injectable, signal, computed } from '@angular/core';
import { DefaultLimit, StartPosition } from './model/constants';
import { Quote } from './model/data.model';
import { QuotesResponse } from './model/response.model';

@Injectable()
export class DataSourceApiService {
  limit = signal(DefaultLimit);

  skip = signal(StartPosition);

  url = computed(() => `https://dummyjson.com/quotes?limit=${ this.limit() }&skip=${ this.skip() }`);

  quotesResponse = resource<QuotesResponse, unknown>({
    loader: async () => {
      const response: QuotesResponse = await fetch(this.url()).then(response => response.json());
      return response;
    },
  });

}
