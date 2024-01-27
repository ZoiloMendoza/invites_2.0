export type InviteComponent = Record<string, unknown>;

export type InviteConfiguration = Record<string, InviteComponent>;

export interface StartBannerType extends InviteComponent {
  config: {
    title: string;
  };
}
