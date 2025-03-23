import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-computed-signal',
  imports: [],
  templateUrl: './computed-signal.component.html',
  styleUrl: './computed-signal.component.css'
})
export class ComputedSignalComponent {

  /**
   * A writable signal
   */
  protected signal = signal(100);

  /**
   * A computed signal that is twice the value of the writable signal.
   */
  protected double = computed(() => this.signal() * 2);

  /**
  * Increment the signal by 1.
  */
  protected increment = () => this.signal.update(current => current + 1);

}
