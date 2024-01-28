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
import { ComponentLoader } from '../../template-generator/types/generator';
import { InviteConfiguration } from '../types/invites';

const INVITATION_PRESETS: { [key: string]: string[] } = {
  default: [
    'start-banner',
    'family-info',
    'gift-table',
    'attire',
    'ceremony',
    'confirmation',
    'itinerary',
    'reception',
    'suggestions',
  ],
};

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

  getComponentsList(): ComponentLoader {
    return {
      'start-banner': {
        name: 'StartBannerComponent',
        component: StartBannerComponent,
        defaults: {
          config: {
            title: {
              value: 'Title',
              type: 'text',
            },
            dateAndPlace: {
              value: 'Sábado 09 de Marzo 2024,San Luis Potosí',
              type: 'text',
            },
            date: {
              value: '2021-01-01',
              type: 'date',
            },
            backgroundImage: {
              value: null,
              type: 'image',
              dimensions: {
                width: 1024,
                height: 768,
              },
            },
          },
          styles: {
            title: 'tittle',
            dateAndPlace: 'dateAndPlace',
            countdown: 'countdown',
            textContainer: 'textContainer',
            containCountdown: 'containCountdown',
          },
        },
      },
      'family-info': {
        name: 'FamilyInfoComponent',
        component: FamilyInfoComponent,
        defaults: {
          config: {
            name_1: { value: 'Name 1', type: 'text' },
            name_2: { value: 'Name 2', type: 'text' },
            name_3: { value: 'Name 2', type: 'text' },
            name_4: { value: 'Name 2', type: 'text' },
            frase_1: { value: 'Frase 1', type: 'text' },
            frase_2: { value: 'Frase 2', type: 'text' },
          },
          styles: {
            frase: 'frase',
            name: 'name',
          },
        },
      },
      'gift-table': {
        name: 'GiftTableComponent',
        component: GiftTableComponent,
        defaults: {
          config: {},
          styles: {},
        },
      },
      attire: {
        name: 'AttireComponent',
        component: AttireComponent,
        defaults: {
          config: {},
          styles: {},
        },
      },
      ceremony: {
        name: 'CeremonyComponent',
        component: CeremonyComponent,
        defaults: {
          config: {},
          styles: {},
        },
      },
      confirmation: {
        name: 'ConfirmationComponent',
        component: ConfirmationComponent,
        defaults: {
          config: {},
          styles: {},
        },
      },
      itinerary: {
        name: 'ItineraryComponent',
        component: ItineraryComponent,
        defaults: {
          config: {},
          styles: {},
        },
      },
      reception: {
        name: 'ReceptionComponent',
        component: ReceptionComponent,
        defaults: {
          config: {},
          styles: {},
        },
      },
      suggestions: {
        name: 'SuggestionsComponent',
        component: SuggestionsComponent,
        defaults: {
          config: {},
          styles: {},
        },
      },
    };
  }

  getPresets() {
    return INVITATION_PRESETS;
  }

  buildConfigDefaultForPreset(preset: string): InviteConfiguration {
    const presetKeys = INVITATION_PRESETS[preset];

    if (!presetKeys) {
      throw new Error(`Preset ${preset} not found`);
    }

    const config: InviteConfiguration = {};
    const components = this.getComponentsList();

    presetKeys.forEach((key) => {
      config[key] = components[key].defaults;
    });

    return config;
  }
}
