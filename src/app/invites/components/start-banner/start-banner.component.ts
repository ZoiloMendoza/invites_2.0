import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-start-banner',
  standalone: true,
  imports: [],
  templateUrl: './start-banner.component.html',
  styleUrl: './start-banner.component.css',
})
export class StartBannerComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) dateAndPlace!: string;
  @Input({ required: true }) place!: string;
  @Input({ required: true }) date!: string;

  testClass = {
    'test-class': 'test-class',
    'test-class-2': 'test-class-2',
    'test-class-3': 'test-class-3',
    'test-class-4': 'test-class-4',
    'test-class-5': 'test-class-5',
  };

  constructor() {}
}
