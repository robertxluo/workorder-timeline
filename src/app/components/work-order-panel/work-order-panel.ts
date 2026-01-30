import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  WorkCenterDocument,
  WorkOrderStatus,
  PanelInitialData,
  WorkOrderFormData,
} from '../../models/documents';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  NgbDatepickerModule,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

/**
 * Custom Date Adapter to work with YYYY-MM-DD strings in our model
 */
@Injectable()
export class CustomDateAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        year: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        day: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.year +
          this.DELIMITER +
          (date.month < 10 ? '0' + date.month : date.month) +
          this.DELIMITER +
          (date.day < 10 ? '0' + date.day : date.day)
      : null;
  }
}

/**
 * Custom Date Parser/Formatter to show MM.DD.YYYY in the input as requested
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '.';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        month: parseInt(date[0], 10),
        day: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? (date.month < 10 ? '0' + date.month : date.month) +
          this.DELIMITER +
          (date.day < 10 ? '0' + date.day : date.day) +
          this.DELIMITER +
          date.year
      : '';
  }
}

@Component({
  selector: 'app-work-order-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, NgbDatepickerModule],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomDateAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  templateUrl: './work-order-panel.html',
  styleUrl: './work-order-panel.scss',
})
export class WorkOrderPanel implements OnChanges {
  @Input() isOpen = false;
  @Input() workCenters: WorkCenterDocument[] = [];
  @Input() initialData: PanelInitialData | null = null;
  @Input() error: string | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<WorkOrderFormData>();

  form: FormGroup;
  statuses: { label: string; value: WorkOrderStatus }[] = [
    { label: 'Open', value: 'open' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Complete', value: 'complete' },
    { label: 'Blocked', value: 'blocked' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        workCenterId: [null, Validators.required],
        status: ['open', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      },
      { validators: [this.dateRangeValidator] },
    );
  }

  private dateRangeValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    return start && end && end < start ? { dateRange: true } : null;
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && this.initialData) {
      this.form.patchValue({
        name: this.initialData.name || '',
        workCenterId: this.initialData.workCenterId || null,
        status: this.initialData.status || 'open',
        startDate: this.initialData.startDate || '',
        endDate: this.initialData.endDate || '',
      });
    } else if (changes['isOpen'] && !this.isOpen) {
      this.form.reset({ status: 'open' });
    }
  }

  onCancel() {
    this.close.emit();
  }

  get isEditMode(): boolean {
    return !!(this.initialData && this.initialData.docId);
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Save' : 'Create';
  }

  onCreate() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
