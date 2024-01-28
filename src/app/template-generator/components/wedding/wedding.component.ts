import { Component, inject, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ComponentLoaderService } from '../../../invites/services/component-loader.service';
import { GeneratorService } from '../../services/generator.service';
import { take } from 'rxjs';
import { WeddingType } from '../../types/wedding';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wedding',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './wedding.component.html',
  styleUrl: './wedding.component.css',
})
export class WeddingComponent {
  componentLoaderService = inject(ComponentLoaderService);
  generatorService = inject(GeneratorService);
  router = inject(Router);

  availableWeddingsForm = new FormControl('');
  createWeddingFromGroup = new FormGroup({
    weddingName: new FormControl(''),
    weddingPath: new FormControl(''),
    weddingPlanner: new FormControl(''),
    weddingPresets: new FormControl(''),
  });

  availableWeddings = signal<Array<WeddingType>>([]);
  availablePresets = signal<string[]>(
    Object.keys(this.componentLoaderService.getPresets()),
  );

  constructor() {
    this.generatorService.listWeddings().subscribe((response) => {
      this.availableWeddings.set(response.weddings);
    });
  }

  createWedding() {
    const pickedTemplate = this.createWeddingFromGroup.value.weddingPresets;

    if (!pickedTemplate || this.createWeddingFromGroup.invalid) {
      return;
    }

    const templateConfigDefault =
      this.componentLoaderService.buildConfigDefaultForPreset(pickedTemplate);

    const weddingData = {
      name: this.createWeddingFromGroup.value.weddingName as string,
      path: this.createWeddingFromGroup.value.weddingPath as string,
      active: false,
      planner: [this.createWeddingFromGroup.value.weddingPlanner as string],
      config: templateConfigDefault,
    };

    this.generatorService
      .createWedding(weddingData)
      .pipe(take(1))
      .subscribe((response) => {
        this.router.navigate([`/generator`], {
          queryParams: { wedding: response._id },
        });
      });
  }

  loadCreatorTemplate() {
    const weddingId = this.availableWeddingsForm.value;
    if (!weddingId) {
      return;
    }
  }
}
