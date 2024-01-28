import { Component, Input } from '@angular/core';

interface ConfigInput {}
interface StyleInput {}

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css',
})
export class ReceptionComponent {
  @Input({ required: true }) config!: ConfigInput;
  @Input({ required: true }) styles!: StyleInput;
}
