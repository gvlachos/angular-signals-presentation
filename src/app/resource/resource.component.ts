import { Component, computed, inject, Signal, ChangeDetectionStrategy } from '@angular/core';
import { DataSourceApiService } from '../data-source-api.service';

@Component({
  selector: 'app-resource',
  imports: [],
  providers: [],
  templateUrl: './resource.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './resource.component.css',
})
export class ResourceComponent {
  protected dataSourceApiService = inject(DataSourceApiService);

  protected error: Signal<boolean> = computed(
    () => this.dataSourceApiService.status() === 'error',
  );

  protected disableNext: Signal<boolean> = computed(
    () => !this.dataSourceApiService.hasMore() || this.error(),
  );

  protected nextPage(): void {
    this.dataSourceApiService.skip.update(
      skip => skip + this.dataSourceApiService.limit(),
    );
  }
}
