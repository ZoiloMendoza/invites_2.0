import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponent } from './core/core.component';
import { StartBannerComponent } from './components/start-banner/start-banner.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [CoreComponent, StartBannerComponent],
  imports: [CommonModule, HttpClient],
  exports: [CoreComponent, StartBannerComponent],
})
export class InvitesModule {}
