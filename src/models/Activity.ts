export enum ActivityType {
  FOUNDING_FESTIVAL = 0,
  STUDY = 1,
  ETC = 2,
}

export interface Activity {
  id?: string;
  start: string;
  end: string;
  place: string;
  type: ActivityType;
  description: string;
  participants: string[];
  private: boolean;
}
