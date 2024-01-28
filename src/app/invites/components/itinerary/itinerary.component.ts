import { Component, Input } from '@angular/core';

interface ConfigInput {}
interface StyleInput {}

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.css',
})
export class ItineraryComponent {
  @Input({ required: true }) config!: ConfigInput;
  @Input({ required: true }) styles!: StyleInput;
}
