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

  constructor() {}

  getSnapshot(): WorkOrderDocument[] {
    return this.ordersSubject.getValue();
  }

  deleteOrder(docId: string) {
    const currentOrders = this.getSnapshot();
    const updatedOrders = currentOrders.filter((order) => order.docId !== docId);
    this.ordersSubject.next(updatedOrders);
  }
}
