import { Routes } from '@angular/router';
import { CoreComponent } from './invites/core/core.component';
import { GeneratorComponent } from './template-generator/generator/generator.component';

export const routes: Routes = [
  { path: 'invitation', component: CoreComponent },
  { path: 'generator', component: GeneratorComponent },
];
