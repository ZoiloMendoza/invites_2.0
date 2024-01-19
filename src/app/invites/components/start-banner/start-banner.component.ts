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

  constructor() {}
}
