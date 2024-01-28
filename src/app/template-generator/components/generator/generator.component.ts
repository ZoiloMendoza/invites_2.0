import { ComponentLoaderService } from '../../../invites/services/component-loader.service';
import { NgComponentOutlet } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FlattenInviteComponentConfig,
  InviteComponentConfig,
  InviteConfiguration,
  InviteConfigurationProps,
} from '../../../invites/types/invites';
import { GeneratorService } from '../../services/generator.service';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  Type,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { lastValueFrom } from 'rxjs';

// TODO: Fix types at some points just want to validate

type ComponentPickerList = {
  key: string;
  name: string;
  component: Type<unknown>;
  config: FlattenInviteComponentConfig;
};

type ComponentEditorProp = {
  name: string;
  key: string;
} & InviteConfigurationProps;

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    NgComponentOutlet,
    MatToolbar,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css',
})
export class GeneratorComponent {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  // Services
  route = inject(ActivatedRoute);
  componentLoaderService = inject(ComponentLoaderService);
  generatorService = inject(GeneratorService);

  //Signals
  selectedWedding = signal<string>('');
  propEditorConfig = signal<ComponentEditorProp[]>([]);
  availableComponents = signal(this.componentLoaderService.getComponentsList());
  weddingTemplateConfig = signal<InviteConfiguration>(
    {} as InviteConfiguration,
  );

  pickedComponents = computed<ComponentPickerList[]>(() => {
    const weddingTemplateConfig = this.weddingTemplateConfig();

    return Object.entries(weddingTemplateConfig).map(([key]) => {
      const component = this.availableComponents()[key];
      this.flatConfig(weddingTemplateConfig[key]);

      return {
        key,
        name: component.name,
        component: component.component,
        config: this.flatConfig(weddingTemplateConfig[key]),
      };
    });
  });

  flatConfig(
    weddingTemplateConfig: InviteComponentConfig,
  ): FlattenInviteComponentConfig {
    const flatConfig: FlattenInviteComponentConfig = {
      config: {},
      styles: weddingTemplateConfig.styles,
    };

    if (weddingTemplateConfig.config) {
      Object.entries(weddingTemplateConfig.config).forEach(([key, value]) => {
        flatConfig.config[key] = value.value || '';
      });
    }

    return flatConfig;
  }

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.selectedWedding.set(params['wedding']);
    });

    effect(async () => {
      const weddingTemplateConfig = await lastValueFrom(
        this.generatorService.getWeddingConfig(this.selectedWedding()),
      );

      this.weddingTemplateConfig.set(weddingTemplateConfig);
    });
  }

  componentDropped(event: CdkDragDrop<ComponentPickerList[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  openDrawer(key: string) {
    this.buildPropEditor(key);
    this.drawer.toggle();
  }

  buildPropEditor(componentKey: string) {
    const component = this.weddingTemplateConfig()[componentKey];
    if (component) {
      const propsToEdit = Object.entries(component.config).map(
        ([key, value]) => {
          return {
            key: componentKey,
            name: key,
            value: (value as InviteConfigurationProps)['value'],
            type: (value as InviteConfigurationProps)['type'],
          } as ComponentEditorProp;
        },
      );

      this.propEditorConfig.set(propsToEdit);
    }
  }

  saveComponentConfig() {
    this.generatorService
      .updateWeddingConfig(this.selectedWedding(), this.weddingTemplateConfig())
      .subscribe(() => {
        console.log('saved');
      });
  }

  onInputUpdate(event: KeyboardEvent, fieldName: string, componentKey: string) {
    const value = (event.target as HTMLInputElement).value;
    const newConfig = this.weddingTemplateConfig();
    newConfig[componentKey].config[fieldName].value = value;

    this.weddingTemplateConfig.set({ ...newConfig });
  }

  handleImageUpload(event: Event, fieldName: string, componentKey: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const newConfig = this.availableComponents();
        const imageUrlData = reader.result as string;
        const dimensions = newConfig[componentKey].defaults.config[fieldName]
          .dimensions || { width: 0, height: 0 };

        const resizeImage = await this.imageResizer(imageUrlData, dimensions);

        newConfig[componentKey].defaults.config[fieldName].value = resizeImage;
        this.availableComponents.set({ ...newConfig });
      };
    }
  }

  imageResizer(
    url: string,
    dimensions: { width: number; height: number },
  ): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);

          const MAX_WIDTH = dimensions.width;
          const MAX_HEIGHT = dimensions.height;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          resolve(canvas.toDataURL('image/jpeg'));
        }
      };
    });
  }
}
