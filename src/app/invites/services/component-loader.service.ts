import { Injectable, Type } from '@angular/core';

import { StartBannerComponent } from '../components/start-banner/start-banner.component';
import { FamilyInfoComponent } from '../components/family-info/family-info.component';
import { AttireComponent } from '../components/attire/attire.component';
import { CeremonyComponent } from '../components/ceremony/ceremony.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { GiftTableComponent } from '../components/gift-table/gift-table.component';
import { ItineraryComponent } from '../components/itinerary/itinerary.component';
import { ReceptionComponent } from '../components/reception/reception.component';
import { SuggestionsComponent } from '../components/suggestions/suggestions.component';

@Injectable({
  providedIn: 'root',
})
export class ComponentLoaderService {
  getComponents() {
    return {
      'start-banner': StartBannerComponent,
      'family-info': FamilyInfoComponent,
      'gift-table': GiftTableComponent,
      attire: AttireComponent,
      ceremony: CeremonyComponent,
      confirmation: ConfirmationComponent,
      itinerary: ItineraryComponent,
      reception: ReceptionComponent,
      suggestions: SuggestionsComponent,
    } as { [key: string]: Type<unknown> };
  }
}
