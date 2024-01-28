import { Type } from '@angular/core';
import { InviteConfigurationProps } from '../../invites/types/invites';

export interface ComponentLoaderDefault {
  config: {
    [key: string]: InviteConfigurationProps;
  };
  styles: {
    [key: string]: string;
  };
}

export interface ComponentLoader {
  [key: string]: {
    name: string;
    component: Type<unknown>;
    defaults: ComponentLoaderDefault;
  };
}
