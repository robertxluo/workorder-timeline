import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WORK_CENTERS, WORK_ORDERS } from '../data/sample-data';
import { WorkCenterDocument, WorkOrderDocument } from '../models/documents';

@Injectable({
  providedIn: 'root',
})
export class WorkOrderStoreService {
  readonly workCenters: WorkCenterDocument[] = WORK_CENTERS;

  private ordersSubject = new BehaviorSubject<WorkOrderDocument[]>(WORK_ORDERS);
  readonly orders$ = this.ordersSubject.asObservable();

  constructor() {
    // @upgrade: Implement localStorage persistence here.
    // On load: Check localStorage using a specific key (e.g., 'work-orders') and initialize ordersSubject with parsed data if available.
    // On change: Subscribe to orders$ and save to localStorage on every update (debounce for performance).
  }

  getSnapshot(): WorkOrderDocument[] {
    return this.ordersSubject.getValue();
  }

  deleteOrder(docId: string) {
    const currentOrders = this.getSnapshot();
    const updatedOrders = currentOrders.filter((order) => order.docId !== docId);
    this.ordersSubject.next(updatedOrders);
  }

  createOrder(data: WorkOrderDocument['data']) {
    const currentOrders = this.getSnapshot();
    const newOrder: WorkOrderDocument = {
      docId: `wo-${Date.now()}`,
      docType: 'workOrder',
      data: { ...data },
    };
    this.ordersSubject.next([...currentOrders, newOrder]);
  }

  updateOrder(docId: string, data: WorkOrderDocument['data']) {
    const currentOrders = this.getSnapshot();
    const updatedOrders = currentOrders.map((order) =>
      order.docId === docId ? { ...order, data: { ...data } } : order
    );
    this.ordersSubject.next(updatedOrders);
  }

  isOverlap(
    data: { workCenterId: string; startDate: string; endDate: string },
    excludeId?: string
  ): boolean {
    const orders = this.getSnapshot();
    return orders.some((order) => {
      if (excludeId && order.docId === excludeId) return false;
      if (order.data.workCenterId !== data.workCenterId) return false;

      // Overlap if !(newStart > existingEnd || newEnd < existingStart)
      const isAfter = data.startDate > order.data.endDate;
      const isBefore = data.endDate < order.data.startDate;

      return !(isAfter || isBefore);
    });
  }
}
