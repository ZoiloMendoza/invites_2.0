import { Component, Input } from '@angular/core';

interface ConfigInput {}
interface StyleInput {}

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
})
export class ConfirmationComponent {
  @Input({ required: true }) config!: ConfigInput;
  @Input({ required: true }) styles!: StyleInput;
}
