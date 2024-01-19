import { Component } from '@angular/core';
import { StartBannerComponent } from '../components/start-banner/start-banner.component';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [StartBannerComponent],
  templateUrl: './core.component.html',
  styleUrl: './core.component.css',
})
export class CoreComponent {}
