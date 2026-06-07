import { computed, Injectable, linkedSignal, resource, ResourceRef, signal } from '@angular/core';
import { DefaultLimit, StartPosition } from '../model/constants';
import { Quote } from '../model/data.model';
import { QuotesResponse } from '../model/response.model';

const IS_LOADING = 'loading';

@Injectable({
  providedIn: 'root',
})
export class DataSourceApiService {
  private quotesResponse: ResourceRef<QuotesResponse | undefined> = resource<
    QuotesResponse,
    unknown
  >({
    params: () => this.url(),
    loader: async (options) => {
      const request = options.params as string;
      const response = await fetch(request).then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      });
      return response;
    },
  });

  private data = linkedSignal({
    source: this.quotesResponse.value,
    computation: (current, previous): Quote[] => {
      const shown: Quote[] = (previous?.value ?? []) as Quote[];
      const update: Quote[] = (current?.quotes ?? []) as Quote[];
      return this.isloading() ? shown : update;
    },
  });

  public readonly limit = signal(DefaultLimit);

  public readonly skip = signal(StartPosition);

  public readonly url = computed(() => {
    return `https://dummyjson.com/quotes?limit=${this.limit()}&skip=${this.skip()}`;
  });

  public readonly isloading = computed(() => this.status() === IS_LOADING);

  public readonly status = this.quotesResponse?.status ?? '';

  public readonly quotes = this.data.asReadonly();
  // the following line is not quite equivalent to the above line
  // quotes: Signal<Quote[]> = computed(() => this.quotesResponse.value()?.quotes ?? []);

  public readonly total = computed(() => this.quotesResponse.value()?.total);

  public readonly hasMore = computed(() => {
    const total = this.total();
    if (!total) return false;

    return total > this.skip() + this.limit();
  });
}
