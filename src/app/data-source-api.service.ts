import { computed,Injectable,linkedSignal,resource,ResourceRef,ResourceStatus,signal,Signal,WritableSignal } from '@angular/core';
import { DefaultLimit, StartPosition } from './model/constants';
import { Quote } from './model/data.model';
import { QuotesResponse } from './model/response.model';

@Injectable({
  providedIn: 'root',
})
export class DataSourceApiService {
  private quotesResponse: ResourceRef<QuotesResponse | undefined> = resource<
    QuotesResponse,
    unknown
  >({
    request: () => this.url(),
    loader: async options => {
      const request = options.request as string;
      const response = await fetch(request).then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      });
      return response;
    },
  });

  private data: WritableSignal<Quote[]> = linkedSignal({
    source: this.quotesResponse.value,
    computation: (current, previous): Quote[] => {
      const shown: Quote[] = (previous?.value ?? []) as Quote[];
      const update: Quote[] = (current?.quotes ?? []) as Quote[];
      return this.isloading() ? shown : update;
    },
  });

  limit: WritableSignal<number> = signal(DefaultLimit);

  skip: WritableSignal<number> = signal(StartPosition);

  url: Signal<string> = computed(
    () =>
      `https://dummyjson.com/quotes?limit=${this.limit()}&skip=${this.skip()}`,
  );

  isloading: Signal<boolean> = computed(
    () => this.status() === ResourceStatus.Loading,
  );

  status: Signal<ResourceStatus> = this.quotesResponse.status;

  quotes: Signal<Quote[]> = computed(() => this.data());

  total: Signal<number | undefined> = computed(
    () => this.quotesResponse.value()?.total,
  );

  hasMore: Signal<boolean> = computed(() => {
    const total = this.total();
    if (!total) return false;

    return total > this.skip() + this.limit();
  });
}
