import { Component, computed, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-linked-signal',
  imports: [FormsModule],
  templateUrl: './linked-signal.component.html',
  styleUrl: './linked-signal.component.css'
})
export class LinkedSignalComponent {
  private readonly data = [...Array(100).keys()].map(key => ({id: key, value: `item ${key}`}));


  /**
   * A signal that is a private view of the data.
   */
  private items = signal(this.data);


  /**
   * A signal to hold the search term.
   */
  protected search = signal('');


  /**
   * A readonly view of the search term.
   */
  protected searchTerm = this.search.asReadonly();


  /**
   * A computed signal that return the first search result.
   */
  protected searchResult = computed(() => {
      const value = this.search();
      const item = value ? this.items().find(item => item.value.includes(value)) : undefined;
      return item;
    }
  );


  /**
   * A linked signal that filters the data when the search signal changes.
   */
  protected currentPage = linkedSignal({
    source: this.search,
    computation: (current, previous?: {source: string, value: number}) => {

      if (!current?.length) 1;

      const value = this.search();
      const index = value ? this.items().findIndex(item => item.value.includes(value)) : 0;
      const page = index >= 0 ? Math.floor(index / 10) : -1;
      const result = page >= 0 ? page + 1 : (previous?.value ?? 1);

      return result;
    },
  });


  /**
   * A computed signal that displays the items on the current page.
  */
  protected displayedItems = computed(() => {
    return this.items().slice((this.currentPage() - 1) * 10, this.currentPage() * 10);
  });


  /**
   * Set the next page.
   */
  protected previousPage() {
    this.currentPage.update((p) => p > 1 ? p - 1 : 1);
  }


  /**
   * Set the previous page.
   */
  protected nextPage() {
    this.currentPage.update((p) => p + 1);
  }
}
