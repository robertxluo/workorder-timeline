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
  // Genesis Hardware
  {
    docId: 'wo-1',
    docType: 'workOrder',
    data: {
      name: 'Pre-production Prep',
      workCenterId: 'wc-1',
      status: 'complete',
      startDate: '2025-12-15',
      endDate: '2025-12-22',
    },
  },
  {
    docId: 'wo-2',
    docType: 'workOrder',
    data: {
      name: 'Turbine Blade Polish',
      workCenterId: 'wc-1',
      status: 'complete',
      startDate: '2026-01-05',
      endDate: '2026-01-10',
    },
  },
  {
    docId: 'wo-3',
    docType: 'workOrder',
    data: {
      name: 'Engine Core Assembly',
      workCenterId: 'wc-1',
      status: 'in-progress',
      startDate: '2026-01-12',
      endDate: '2026-01-18',
    },
  },
  {
    docId: 'wo-4',
    docType: 'workOrder',
    data: {
      name: 'Heat Shield Testing',
      workCenterId: 'wc-1',
      status: 'open',
      startDate: '2026-02-01',
      endDate: '2026-02-05',
    },
  },

  // Rodriques Electrics
  {
    docId: 'wo-5',
    docType: 'workOrder',
    data: {
      name: 'Control Panel Wiring',
      workCenterId: 'wc-2',
      status: 'in-progress',
      startDate: '2026-01-08',
      endDate: '2026-01-14',
    },
  },
  {
    docId: 'wo-6',
    docType: 'workOrder',
    data: {
      name: 'Circuit Board Solder',
      workCenterId: 'wc-2',
      status: 'open',
      startDate: '2026-01-20',
      endDate: '2026-01-28',
    },
  },

  // Konsulting Inc
  {
    docId: 'wo-7',
    docType: 'workOrder',
    data: {
      name: 'Strategy Audit Phase 1',
      workCenterId: 'wc-3',
      status: 'complete',
      startDate: '2026-01-09',
      endDate: '2026-01-12',
    },
  },
  {
    docId: 'wo-8',
    docType: 'workOrder',
    data: {
      name: 'Operational Review',
      workCenterId: 'wc-3',
      status: 'blocked',
      startDate: '2026-01-15',
      endDate: '2026-02-15',
    },
  },

  // McMarrow Distribution
  {
    docId: 'wo-9',
    docType: 'workOrder',
    data: {
      name: 'Carrier Integration',
      workCenterId: 'wc-4',
      status: 'complete',
      startDate: '2025-12-10',
      endDate: '2025-12-18',
    },
  },
  {
    docId: 'wo-10',
    docType: 'workOrder',
    data: {
      name: 'Logistics Routing',
      workCenterId: 'wc-4',
      status: 'in-progress',
      startDate: '2026-01-05',
      endDate: '2026-01-20',
    },
  },
  {
    docId: 'wo-11',
    docType: 'workOrder',
    data: {
      name: 'Inventory Sync',
      workCenterId: 'wc-4',
      status: 'open',
      startDate: '2026-02-10',
      endDate: '2026-02-25',
    },
  },

  // Spartan Manufacturing
  {
    docId: 'wo-12',
    docType: 'workOrder',
    data: {
      name: 'Heavy Chassis Fab',
      workCenterId: 'wc-5',
      status: 'in-progress',
      startDate: '2026-01-10',
      endDate: '2026-02-10',
    },
  },

  // Naologic Production
  {
    docId: 'wo-13',
    docType: 'workOrder',
    data: {
      name: 'Final Quality Check',
      workCenterId: 'wc-6',
      status: 'open',
      startDate: '2026-01-12',
      endDate: '2026-01-13',
    },
  },
  {
    docId: 'wo-14',
    docType: 'workOrder',
    data: {
      name: 'Package & Seal',
      workCenterId: 'wc-6',
      status: 'open',
      startDate: '2026-02-20',
      endDate: '2026-02-28',
    },
  },
];
