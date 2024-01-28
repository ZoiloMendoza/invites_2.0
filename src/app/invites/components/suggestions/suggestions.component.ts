import { Component, Input } from '@angular/core';

interface ConfigInput {}
interface StyleInput {}

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
})
export class SuggestionsComponent {
  @Input({ required: true }) config!: ConfigInput;
  @Input({ required: true }) styles!: StyleInput;
}
