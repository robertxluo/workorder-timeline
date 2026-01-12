import { WorkCenterDocument, WorkOrderDocument } from '../models/documents';

export const WORK_CENTERS: WorkCenterDocument[] = [
  {
    docId: 'wc-1',
    docType: 'workCenter',
    data: { name: 'Genesis Hardware' },
  },
  {
    docId: 'wc-2',
    docType: 'workCenter',
    data: { name: 'Rodriques Electrics' },
  },
  {
    docId: 'wc-3',
    docType: 'workCenter',
    data: { name: 'Konsulting Inc' },
  },
  {
    docId: 'wc-4',
    docType: 'workCenter',
    data: { name: 'McMarrow Distribution' },
  },
  {
    docId: 'wc-5',
    docType: 'workCenter',
    data: { name: 'Spartan Manufacturing' },
  },
  {
    docId: 'wc-6',
    docType: 'workCenter',
    data: { name: 'Naologic Production' },
  },
];

export const WORK_ORDERS: WorkOrderDocument[] = [
  // Extrusion Line A (Multiple non-overlapping)
  {
    docId: 'wo-1',
    docType: 'workOrder',
    data: {
      name: 'Order #1001',
      workCenterId: 'wc-1',
      status: 'complete',
      startDate: '2023-10-23',
      endDate: '2023-10-25',
    },
  },
  {
    docId: 'wo-2',
    docType: 'workOrder',
    data: {
      name: 'Order #1005',
      workCenterId: 'wc-1',
      status: 'in-progress',
      startDate: '2023-10-27',
      endDate: '2023-10-30',
    },
  },

  // CNC Machine 1
  {
    docId: 'wo-3',
    docType: 'workOrder',
    data: {
      name: 'Order #1002',
      workCenterId: 'wc-2',
      status: 'open',
      startDate: '2023-10-24',
      endDate: '2023-10-28',
    },
  },

  // Assembly Station
  {
    docId: 'wo-4',
    docType: 'workOrder',
    data: {
      name: 'Order #1003',
      workCenterId: 'wc-3',
      status: 'blocked',
      startDate: '2023-10-23',
      endDate: '2023-10-29',
    },
  },

  // Quality Control
  {
    docId: 'wo-5',
    docType: 'workOrder',
    data: {
      name: 'Order #1004',
      workCenterId: 'wc-4',
      status: 'complete',
      startDate: '2023-10-22',
      endDate: '2023-10-24',
    },
  },

  // Packaging Line
  {
    docId: 'wo-6',
    docType: 'workOrder',
    data: {
      name: 'Order #1006',
      workCenterId: 'wc-5',
      status: 'open',
      startDate: '2023-10-28',
      endDate: '2023-11-01',
    },
  },

  // Extrusion Line A (Another one)
  {
    docId: 'wo-7',
    docType: 'workOrder',
    data: {
      name: 'Order #1007',
      workCenterId: 'wc-1',
      status: 'open',
      startDate: '2023-11-01',
      endDate: '2023-11-03',
    },
  },

  // Shipping Bay
  {
    docId: 'wo-8',
    docType: 'workOrder',
    data: {
      name: 'Order #1008',
      workCenterId: 'wc-6',
      status: 'in-progress',
      startDate: '2023-10-26',
      endDate: '2023-10-27',
    },
  },
];
