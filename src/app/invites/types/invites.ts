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

export interface StartBannerType extends InviteComponent {
  config: {
    title: string;
  };
}
