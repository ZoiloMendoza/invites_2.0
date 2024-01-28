import { Routes } from '@angular/router';
import { CoreComponent } from './invites/core/core.component';
import { GeneratorComponent } from './template-generator/components/generator/generator.component';
import { WeddingComponent } from './template-generator/components/wedding/wedding.component';

export const routes: Routes = [
  { path: 'invitation', component: CoreComponent },
  { path: 'generator', component: GeneratorComponent },
  { path: 'weddingCreator', component: WeddingComponent },
];
