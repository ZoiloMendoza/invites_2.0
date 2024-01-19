import { Component, computed, inject } from '@angular/core';
import { StartBannerComponent } from '../components/start-banner/start-banner.component';
import { InviteConfiguration } from '../types/invites';
import { ComponentLoaderService } from '../services/component-loader.service';
import { NgComponentOutlet } from '@angular/common';
import { WeddingConfigService } from '../services/wedding-config.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [StartBannerComponent, NgComponentOutlet],
  templateUrl: './core.component.html',
  styleUrl: './core.component.css',
})
export class CoreComponent {
  inviteComponents = inject(ComponentLoaderService).getComponents();

  componetList = computed(() => {
    return Object.keys(this.inviteConfig());
  });

  inviteConfig = toSignal(
    this.weddingConfigService.getWeddingConfig('65a0b97fc7f02cbbbee982c5'),
    { initialValue: {} as InviteConfiguration },
  );

  constructor(private weddingConfigService: WeddingConfigService) {}
}
