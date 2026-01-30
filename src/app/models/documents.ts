export type WorkOrderStatus = 'open' | 'in-progress' | 'complete' | 'blocked';

export interface WorkCenterDocument {
  docId: string;
  docType: 'workCenter';
  data: {
    name: string;
  };
}

export interface WorkOrderDocument {
  docId: string;
  docType: 'workOrder';
  data: {
    name: string;
    workCenterId: string;
    status: WorkOrderStatus;
    startDate: string; // YYYY-MM-DD
    endDate: string; // YYYY-MM-DD
  };
}

/** Form data emitted when saving a work order */
export interface WorkOrderFormData {
  name: string;
  workCenterId: string;
  status: WorkOrderStatus;
  startDate: string;
  endDate: string;
}

/** Initial data passed to the work order panel (for create or edit) */
export interface PanelInitialData extends WorkOrderFormData {
  docId?: string;
}
