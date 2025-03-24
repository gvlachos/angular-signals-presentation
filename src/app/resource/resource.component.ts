import { Component, inject, ResourceStatus } from '@angular/core';
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
  readonly resourceStatusText = Object.keys(ResourceStatus).filter(k => isNaN(Number(k)));

  protected dataSourceApiService = inject(DataSourceApiService);

  protected error = this.dataSourceApiService.status() === this.resourceStatus.Error;

  protected next(): void {
    this.dataSourceApiService.skip.update(skip => skip + this.dataSourceApiService.limit());
  }
}
