import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderStoreService } from '../../services/work-order-store.service';

@Component({
  selector: 'app-work-order-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-order-timeline.html',
  styleUrl: './work-order-timeline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkOrderTimeline {
  private store = inject(WorkOrderStoreService);

  workCenters = this.store.workCenters;
  orders$ = this.store.orders$;

  zoomLevel: 'day' | 'week' | 'month' = 'day';

  constructor() {}

  onZoomChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.zoomLevel = select.value as 'day' | 'week' | 'month';
  }

  trackByDocId(index: number, item: { docId: string }) {
    return item.docId;
  }
}
