import { WeddingType } from '../../template-generator/types/wedding';

export enum GuestConfirmationStatusEnum {
  pending = 'pending',
  confirmed = 'confirmed',
  declined = 'declined',
}

export interface GuestConfirmationType {
  status: GuestConfirmationStatusEnum;
  date: Date;
}

export interface GuestType {
  name: string;
  whatsapp: string[];
  isPrimaryContact: boolean;
  confirmation: GuestConfirmationType;
  sendInvitation: boolean;
}

export interface InviteType {
  name: string;
  guest: GuestType[];
  notification: {
    sentAt: Date;
    result: string;
    source: string;
  }[];
  size: number;
  owner: string;
}

export type InviteComponent = Record<string, unknown>;

export type InviteConfiguration = Record<string, InviteComponentConfig>;

export type InviteConfigurationProps = {
  value: string | null;
  type: string;
  dimensions?: {
    width: number;
    height: number;
  };
};

export type InviteComponentConfig = {
  config: Record<string, InviteConfigurationProps>;
  styles: Record<string, unknown>;
};

export type FlattenInviteComponentConfig = {
  config: Record<string, string>;
  styles: Record<string, unknown>;
};

export type InvitationResponse = {
  wedding: WeddingType;
  invite: InviteType;
};

export interface StartBannerType extends InviteComponent {
  config: {
    title: string;
  };
}
