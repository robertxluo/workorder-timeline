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
      this.pxPerDay = 113;
      this.generateColumns(30, 'day');
    } else if (this.zoomLevel === 'week') {
      // Snap to Monday
      this.startDate = DateUtils.getStartOfWeek(DateUtils.addDays(today, -60));
      this.pxPerDay = 20;
      this.generateColumns(120, 'week');
    } else {
      // Snap to 1st of the month
      this.startDate = DateUtils.getStartOfMonth(DateUtils.addDays(today, -180));
      this.pxPerDay = 4; // Use a constant px/day to avoid drift
      this.generateColumns(365, 'month');
    }

    this.updateTodayOffset();
  }

  generateColumns(totalDays: number, step: 'day' | 'week' | 'month') {
    this.columns = [];
    let current = this.startDate;

    for (let i = 0; i < totalDays; ) {
      const label = DateUtils.formatHeaderLabel(current, this.zoomLevel);
      let daysInStep = 1;

      if (step === 'week') {
        daysInStep = 7;
      } else if (step === 'month') {
        const nextMonth = DateUtils.getNextMonth(current);
        daysInStep = DateUtils.diffDays(current, nextMonth);
      }

      const width = this.pxPerDay * daysInStep;
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

  getOrdersForWorkCenter(wcId: string) {
    // In a real app, this would be optimized/memoized or handled via a selector
    return this.store.getSnapshot().filter((order) => order.data.workCenterId === wcId);
  }

  getBarStyle(order: any) {
    const left = DateUtils.diffDays(this.startDate, order.data.startDate) * this.pxPerDay;
    const days = DateUtils.diffDays(order.data.startDate, order.data.endDate) + 1;
    const width = days * this.pxPerDay;

    return {
      left: `${left}px`,
      width: `${width}px`,
    };
  }

  trackByDocId(index: number, item: { docId: string }) {
    return item.docId;
  }

  trackByColumn(index: number, item: TimelineColumn) {
    return item.date;
  }
}
