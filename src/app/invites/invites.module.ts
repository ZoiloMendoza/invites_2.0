import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponent } from './core/core.component';
import { StartBannerComponent } from './components/start-banner/start-banner.component';

@NgModule({
  declarations: [CoreComponent, StartBannerComponent],
  imports: [CommonModule],
  exports: [CoreComponent, StartBannerComponent],
})
export class InvitesModule {}
