// prettier-ignore
import { Component,effect,EffectRef,inject,signal,WritableSignal } from '@angular/core';
import { BrowserStorageService } from '../browser-storage.service';

@Component({
  selector: 'app-effect-signal',
  imports: [],
  templateUrl: './effect-signal.component.html',
  styleUrl: './effect-signal.component.css',
})
export class EffectSignalComponent {
  private storage = inject(BrowserStorageService);

  /**
   * An effect that logs the signal to local storage.
   */
  protected log: EffectRef = effect(() =>
    this.storage.set<number>('signal-log-value', this.signal()),
  );

  /**
   * A writable signal
   */
  protected signal: WritableSignal<number> = signal(100);

  /**
   * Increment the signal by 1.
   */
  protected increment = () => this.signal.update(current => current + 1);
}
