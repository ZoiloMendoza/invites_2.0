import { Component, Input } from '@angular/core';

interface ConfigInput {}
interface StyleInput {}

@Component({
  selector: 'app-gift-table',
  standalone: true,
  imports: [],
  templateUrl: './gift-table.component.html',
  styleUrl: './gift-table.component.css',
})
export class GiftTableComponent {
  @Input({ required: true }) config!: ConfigInput;
  @Input({ required: true }) styles!: StyleInput;
}
