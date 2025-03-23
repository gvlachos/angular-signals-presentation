import { Component, effect, inject, signal } from '@angular/core';
import { BrowserStorageService } from '../browser-storage.service';

@Component({
  selector: 'app-effect-signal',
  imports: [],
  templateUrl: './effect-signal.component.html',
  styleUrl: './effect-signal.component.css'
})
export class EffectSignalComponent {
  private storage = inject(BrowserStorageService);

  /**
   * A writable signal
   */
  protected signal = signal(100);

  /**
  * Increment the signal by 1.
  */
  protected increment = () => this.signal.update(current => current + 1);

  /**
   * An effect that logs the signal to local storage.
   */
  protected log = effect(() => this.storage.set<number>('signal-log-value', this.signal()));
}
