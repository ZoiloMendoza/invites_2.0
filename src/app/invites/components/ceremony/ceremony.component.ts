import { Component, Input } from '@angular/core';

interface ConfigInput {}
interface StyleInput {}

@Component({
  selector: 'app-ceremony',
  standalone: true,
  imports: [],
  templateUrl: './ceremony.component.html',
  styleUrl: './ceremony.component.css',
})
export class CeremonyComponent {
  @Input({ required: true }) config!: ConfigInput;
  @Input({ required: true }) styles!: StyleInput;
}
