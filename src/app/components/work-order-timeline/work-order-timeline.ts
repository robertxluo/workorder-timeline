import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderStoreService } from '../../services/work-order-store.service';
import * as DateUtils from '../../utils/date-utils';

interface TimelineColumn {
  date: string;
  label: string;
  width: number;
}

@Component({
  selector: 'app-work-order-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-order-timeline.html',
  styleUrl: './work-order-timeline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkOrderTimeline implements OnInit {
  private store = inject(WorkOrderStoreService);

  workCenters = this.store.workCenters;
  orders$ = this.store.orders$;

  zoomLevel: 'day' | 'week' | 'month' = 'day';
  startDate: string = '';
  columns: TimelineColumn[] = [];
  pxPerDay: number = 48;
  todayOffset: number = 0;

  ngOnInit() {
    this.initTimeline();
  }

  initTimeline() {
    const today = DateUtils.getTodayISO();

    // Set ranges & scale based on zoom
    if (this.zoomLevel === 'day') {
      this.startDate = DateUtils.addDays(today, -14);
      this.pxPerDay = 100; // Wider for Day view
      this.generateColumns(30, 'day');
    } else if (this.zoomLevel === 'week') {
      this.startDate = DateUtils.addDays(today, -60);
      this.pxPerDay = 20;
      this.generateColumns(120, 'week');
    } else {
      this.startDate = DateUtils.addDays(today, -180);
      this.pxPerDay = 8;
      this.generateColumns(360, 'month');
    }

    this.updateTodayOffset();
  }

  generateColumns(totalDays: number, step: 'day' | 'week' | 'month') {
    this.columns = [];
    let current = this.startDate;

    for (let i = 0; i < totalDays; ) {
      const label = DateUtils.formatHeaderLabel(current, this.zoomLevel);

      let width = 113;
      let daysInStep = 1;

      if (step === 'week') {
        width = this.pxPerDay * 7;
        daysInStep = 7;
      } else if (step === 'month') {
        width = 113;
        daysInStep = 30;
      }

      this.columns.push({ date: current, label, width });
      current = DateUtils.addDays(current, daysInStep);
      i += daysInStep;
    }
  }

  updateTodayOffset() {
    const today = DateUtils.getTodayISO();
    const diff = DateUtils.diffDays(this.startDate, today);
    this.todayOffset = diff * this.pxPerDay;
  }

  onZoomChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.zoomLevel = select.value as 'day' | 'week' | 'month';
    this.initTimeline();
  }

  trackByDocId(index: number, item: { docId: string }) {
    return item.docId;
  }

  trackByColumn(index: number, item: TimelineColumn) {
    return item.date;
  }
}
