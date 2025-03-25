// prettier-ignore
import { Component,computed,inject,ResourceStatus,Signal,} from '@angular/core';
import { DataSourceApiService } from '../data-source-api.service';

@Component({
  selector: 'app-resource',
  imports: [],
  providers: [],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.css',
})
export class ResourceComponent {
  readonly resourceStatus = ResourceStatus;
  readonly resourceStatusText = Object.keys(ResourceStatus).filter(k =>
    isNaN(Number(k)),
  );

  protected dataSourceApiService = inject(DataSourceApiService);

  protected error: Signal<boolean> = computed(
    () => this.dataSourceApiService.status() === ResourceStatus.Error,
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
