import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { WritableSignalComponent } from './writable-signal/writable-signal.component';
import { ComputedSignalComponent } from './computed-signal/computed-signal.component';
import { EffectSignalComponent } from './effect-signal/effect-signal.component';
import { LinkedSignalComponent } from './linked-signal/linked-signal.component';

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
    LinkedSignalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly writableSignal = 'writable-signal';
  readonly computedSignal = 'computed-signal';
  readonly effectSignal = 'effect-signal';
  readonly linkedSignal = 'linked-signal';

  readonly signals: Option[] = [
    {label: 'Writable Singal', value: this.writableSignal},
    {label: 'Computed Singal', value: this.computedSignal},
    {label: 'Effect Singal', value: this.effectSignal},
    {label: 'Linked Singal', value: this.linkedSignal},
  ];

  protected form: FormGroup = new FormGroup({
    option: new FormControl('')
  });
}
