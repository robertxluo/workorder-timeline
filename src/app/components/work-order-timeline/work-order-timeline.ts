import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderStoreService } from '../../services/work-order-store.service';
import * as DateUtils from '../../utils/date-utils';
import { WorkOrderPanel } from '../work-order-panel/work-order-panel';

interface TimelineColumn {
  date: string;
  label: string;
  width: number;
}

@Component({
  selector: 'app-work-order-timeline',
  standalone: true,
  imports: [CommonModule, WorkOrderPanel],
  templateUrl: './work-order-timeline.html',
  styleUrl: './work-order-timeline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkOrderTimeline implements OnInit, AfterViewInit {
  private store = inject(WorkOrderStoreService);

  @ViewChild('gridArea') gridArea!: ElementRef<HTMLDivElement>;

  workCenters = this.store.workCenters;
  orders$ = this.store.orders$;

  zoomLevel: 'day' | 'week' | 'month' = 'day';
  startDate: string = '';
  columns: TimelineColumn[] = [];
  pxPerDay: number = 48;
  todayOffset: number = 0;

  activeMenuId: string | null = null;

  isPanelOpen = false;
  panelInitialData: any = null;
  overlapError: string | null = null;

  hoverOffset: number | null = null;
  hoverWcId: string | null = null;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.activeMenuId = null;
  }

  ngOnInit() {
    this.initTimeline();
  }

  ngAfterViewInit() {
    this.scrollToToday();
  }

  scrollToToday() {
    setTimeout(() => {
      if (this.gridArea) {
        const container = this.gridArea.nativeElement;
        const scrollPos = this.todayOffset - container.clientWidth / 2;
        container.scrollTo({
          left: scrollPos,
          behavior: 'smooth',
        });
      }
    }, 100);
  }

  onGridClick(wcId: string, event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const daysOffset = Math.floor(x / this.pxPerDay);
    const clickedDate = DateUtils.addDays(this.startDate, daysOffset);

    this.openCreatePanel(wcId, clickedDate);
  }

  onMouseMove(wcId: string, event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const daysOffset = Math.floor(x / this.pxPerDay);

    this.hoverOffset = daysOffset * this.pxPerDay;
    this.hoverWcId = wcId;
  }

  onMouseLeave() {
    this.hoverOffset = null;
    this.hoverWcId = null;
  }

  openCreatePanel(wcId: string, date: string) {
    this.panelInitialData = {
      workCenterId: wcId,
      startDate: date,
      endDate: date,
      name: '',
      status: 'open',
    };
    this.isPanelOpen = true;
  }

  onSaveOrder(data: any) {
    const isOverlap = this.store.isOverlap(data, this.panelInitialData?.docId);
    if (isOverlap) {
      this.overlapError = 'This work order overlaps with an existing one on this work center.';
      return;
    }

    this.overlapError = null;
    if (this.panelInitialData?.docId) {
      this.store.updateOrder(this.panelInitialData.docId, data);
    } else {
      this.store.createOrder(data);
    }
    this.isPanelOpen = false;
  }

  onClosePanel() {
    this.isPanelOpen = false;
    this.overlapError = null;
  }

  openEditPanel(order: any) {
    this.overlapError = null;
    this.panelInitialData = {
      docId: order.docId,
      workCenterId: order.data.workCenterId,
      startDate: order.data.startDate,
      endDate: order.data.endDate,
      name: order.data.name,
      status: order.data.status,
    };
    this.isPanelOpen = true;
  }

  initTimeline() {
    const today = DateUtils.getTodayISO();

    // Set ranges & scale based on zoom
    if (this.zoomLevel === 'day') {
      this.startDate = DateUtils.addDays(today, -14);
      this.pxPerDay = 113;
      this.generateColumns(500, 'day');
    } else if (this.zoomLevel === 'week') {
      // Snap to Monday
      this.startDate = DateUtils.getStartOfWeek(DateUtils.addDays(today, -60));
      this.pxPerDay = 20;
      this.generateColumns(365, 'week');
    } else {
      // Snap to 1st of the month
      this.startDate = DateUtils.getStartOfMonth(DateUtils.addDays(today, -180));
      this.pxPerDay = 4; // Use a constant px/day to avoid drift
      this.generateColumns(500, 'month');
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

  toggleMenu(orderId: string, event: Event) {
    event.stopPropagation();
    this.activeMenuId = this.activeMenuId === orderId ? null : orderId;
  }

  deleteOrder(orderId: string, event: Event) {
    event.stopPropagation();
    this.store.deleteOrder(orderId);
    this.activeMenuId = null;
  }

  getOrdersForWorkCenter(wcId: string) {
    // In a real app, this would be optimized/memoized or handled via a selector
    return this.store.getSnapshot().filter((order) => order.data.workCenterId === wcId);
  }

  hasActiveOrderWithMenu(wcId: string): boolean {
    return this.getOrdersForWorkCenter(wcId).some((order) => order.docId === this.activeMenuId);
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

  get totalWidth(): number {
    return this.columns.reduce((sum, col) => sum + col.width, 0);
  }

  trackByColumn(index: number, item: TimelineColumn) {
    return item.date;
  }
}
