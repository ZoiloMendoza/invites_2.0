import { InviteComponentConfig } from '../../invites/types/invites';

export interface CreateWeddingRequest {
  name: string;
  path: string;
  planner: string[];
  active: boolean;
  config: { [key: string]: InviteComponentConfig };
}

export interface WeddingType {
  _id: string;
  name: string;
  path: string;
  active: boolean;
  notifications: {
    maxPerDay: number;
    lastSent: Date;
  };
  planners: string[];
  config: object;
  messageStrings: {
    date: string;
    hi: string;
    goodbye: string;
  };
}
