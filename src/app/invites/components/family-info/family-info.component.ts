import { Component, Input } from '@angular/core';

interface ConfigInput {
  name_1: string;
  name_2: string;
  name_3: string;
  name_4: string;
  frase_1: string;
  frase_2: string;
  // Agrega otras propiedades según sea necesario
}
interface StyleInput {
  name: string;
  frase: string;
  // Agrega otras propiedades según sea necesario
}

@Component({
  selector: 'app-family-info',
  standalone: true,
  imports: [],
  templateUrl: './family-info.component.html',
  styleUrl: './family-info.component.css',
})
export class FamilyInfoComponent {
  @Input({ required: true }) config!: ConfigInput;
  @Input({ required: true }) styles!: StyleInput;
}
