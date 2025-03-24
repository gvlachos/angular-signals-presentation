import { resource, Injectable, signal, computed, effect, ResourceLoaderParams, linkedSignal, WritableSignal, ResourceStatus } from '@angular/core';
import { DefaultLimit, StartPosition } from './model/constants';
import { QuotesResponse } from './model/response.model';

@Injectable({
  providedIn: 'root'
})
export class DataSourceApiService {
  limit = signal(DefaultLimit);

  skip = signal(StartPosition);

  quotesResponse = resource<QuotesResponse, unknown>({
    request: () => `https://dummyjson.com/quotes?limit=${ this.limit() }&skip=${ this.skip() }`,
    loader: async (options) => {
      const request = options.request as string;
      const response = await fetch(request).then(response => {
        if (!response.ok) { throw new Error(response.statusText); }
        return response.json();
      });
      console.log(new Date(), response)
      return response;
    },
  });

  // alternate way to define resource: does not use a request signal, works with the effect signal to load new data
  // quotesResponseAlt = resource<QuotesResponse, unknown>({
  //   loader: async () => {
  //     const url = `https://dummyjson.com/quotes?limit=${ this.limit() }&skip=${ this.skip() }`;
  //     const response = await fetch(url).then(response => {
  //       if (!response.ok) { throw new Error(response.statusText); }
  //       return response.json();
  //     });
  //     console.log(new Date(), response)
  //     return response;
  //   },
  // });

  status = this.quotesResponse.status;

  isloading = computed(() => this.status() === ResourceStatus.Loading);

  quotes = computed(() => this.quotesResponse.value()?.quotes);

  total = computed(() => this.quotesResponse.value()?.total);

  hasMore = computed(() => {
    const total = this.total();
    if (!total) return false;

    return total > this.skip() + this.limit();
  });

  // constructor(){
  //   effect(() => {
  //     this.skip();
  //     this.limit();
  //     this.quotesResponseAlt.reload();
  //   })
  // }
}
