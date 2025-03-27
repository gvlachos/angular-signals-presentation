import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComputedSignalComponent } from './computed-signal/computed-signal.component';
import { EffectSignalComponent } from './effect-signal/effect-signal.component';
import { LinkedSignalComponent } from './linked-signal/linked-signal.component';
import { ResourceComponent } from './resource/resource.component';
import { WritableSignalComponent } from './writable-signal/writable-signal.component';

export interface Option {
  label: string;
  value: string;
}

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    WritableSignalComponent,
    ComputedSignalComponent,
    EffectSignalComponent,
    LinkedSignalComponent,
    ResourceComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly writableSignal = 'writable-signal';
  readonly computedSignal = 'computed-signal';
  readonly effectSignal = 'effect-signal';
  readonly linkedSignal = 'linked-signal';
  readonly resourceApi = 'resource-api';

  readonly signals: Option[] = [
    { label: 'Writable Singal', value: this.writableSignal },
    { label: 'Computed Singal', value: this.computedSignal },
    { label: 'Effect Singal', value: this.effectSignal },
    { label: 'Linked Singal', value: this.linkedSignal },
    { label: 'Resource API', value: this.resourceApi },
  ];

  private control = new FormControl('', { nonNullable: true });

  protected form = new FormGroup({ option: this.control });

  protected selected: Signal<string | undefined> = toSignal(this.control.valueChanges);
}
