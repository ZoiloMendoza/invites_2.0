export interface InviteComponent {
  config?: {
    [key: string]: unknown;
  };
}

export interface InviteConfiguration {
  [key: string]: InviteComponent;
}

export interface StartBannerType extends InviteComponent {
  config: {
    title: string;
  };
}
