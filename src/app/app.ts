import { Component } from '@angular/core';
import { WorkOrderTimeline } from './components/work-order-timeline/work-order-timeline';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkOrderTimeline],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
