import { Component, Type, computed, inject, signal } from '@angular/core';
import { ComponentLoaderService } from '../../invites/services/component-loader.service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NgComponentOutlet } from '@angular/common';

// TODO: Fix types at some points just want to validate

type ComponentPickerList = Array<{
  key: string;
  name: string;
  component: Type<unknown>;
}>;

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [CdkDrag, CdkDropList, NgComponentOutlet],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css',
})
export class GeneratorComponent {
  componentLoaderService = inject(ComponentLoaderService);

  availableComponents = signal(this.componentLoaderService.getComponentsList());
  availableComponentsList = computed(() => {
    return Object.entries(this.componentLoaderService.getComponentsList()).map(
      ([key, value]) => {
        return {
          key,
          name: value.name,
          component: value.component,
        };
      },
    );
  });

  pickedComponents: ComponentPickerList = [];

  componentDropped(event: CdkDragDrop<ComponentPickerList>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    console.log(event);
  }
}
