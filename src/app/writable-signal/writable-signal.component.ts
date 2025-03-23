import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-writable-signal',
  imports: [],
  templateUrl: './writable-signal.component.html',
  styleUrl: './writable-signal.component.css'
})
export class WritableSignalComponent {

  /**
   * A signal that can be written to.
   */
  protected signal = signal(100);


  /**
   * A readonly view of the signal.
   */
  protected view = this.signal.asReadonly();


  /**
   * Set the signal to a new value.
   */
  protected set = (value: number) => this.signal.set(value);


  /**
  * Increment the signal by 1.
  */
  protected increment = () => this.signal.update(current => current + 1);

}
