import { Component, Input } from '@angular/core';

interface ConfigInput {}
interface StyleInput {}

@Component({
  selector: 'app-attire',
  standalone: true,
  imports: [],
  templateUrl: './attire.component.html',
  styleUrl: './attire.component.css',
})
export class AttireComponent {
  @Input({ required: true }) config!: ConfigInput;
  @Input({ required: true }) styles!: StyleInput;
}
