import { Component,computed,signal,Signal,WritableSignal } from '@angular/core';

@Component({
  selector: 'app-computed-signal',
  imports: [],
  templateUrl: './computed-signal.component.html',
  styleUrl: './computed-signal.component.css',
})
export class ComputedSignalComponent {
  /**
   * A writable signal
   */
  protected signal: WritableSignal<number> = signal(100);

  /**
   * A computed signal that is twice the value of the writable signal.
   */
  protected double: Signal<number> = computed(() => this.signal() * 2);

  /**
   * Increment the signal by 1.
   */
  protected increment = () => this.signal.update(current => current + 1);
}
