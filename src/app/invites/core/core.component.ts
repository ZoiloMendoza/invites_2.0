import { Component, computed, effect, inject, signal } from '@angular/core';
import { StartBannerComponent } from '../components/start-banner/start-banner.component';
import {
  FlattenInviteComponentConfig,
  InviteComponentConfig,
  InviteConfiguration,
} from '../types/invites';
import { ComponentLoaderService } from '../services/component-loader.service';
import { NgComponentOutlet } from '@angular/common';
import { WeddingConfigService } from '../services/wedding-config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [StartBannerComponent, NgComponentOutlet],
  templateUrl: './core.component.html',
  styleUrl: './core.component.css',
})
export class CoreComponent {
  route = inject(ActivatedRoute);
  inviteComponents = inject(ComponentLoaderService).getComponents();

  selectedWedding = signal<string>('');

  componetList = computed(() => {
    return Object.keys(this.inviteConfig() || {});
  });

  inviteConfig = signal<Record<string, FlattenInviteComponentConfig>>(
    {} as Record<string, FlattenInviteComponentConfig>,
  );
  inviteLoaded = signal<boolean>(false);

  constructor(private weddingConfigService: WeddingConfigService) {
    const path = this.route.snapshot.params['path'];
    const invitationId = this.route.snapshot.queryParams['invitationId'];

    this.route.queryParams.subscribe((params) => {
      this.selectedWedding.set(params['wedding']);
    });

    effect(() => {
      this.weddingConfigService
        .getWeddingConfig({ path, invitationId })
        .subscribe((config) => {
          this.inviteConfig.set(this.flatConfig(config.wedding.config));
          this.inviteLoaded.set(true);
        });
    });
  }

  flatConfig(
    weddingTemplateConfig: InviteConfiguration,
  ): Record<string, FlattenInviteComponentConfig> {
    const flatConfig: Record<string, FlattenInviteComponentConfig> = {};

    Object.entries(weddingTemplateConfig).forEach(([key, value]) => {
      flatConfig[key] = {
        config: {},
        styles: value.styles,
      };
      Object.entries(value.config).forEach(([key2, value2]) => {
        flatConfig[key].config[key2] = value2['value'] || '';
      });
    });

    return flatConfig;
  }
}
