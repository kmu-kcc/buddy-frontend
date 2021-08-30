export enum Attendance {
  ATTENDING = 0,
  LEAVE_OF_ABSENCE = 1,
  GRADUATED = 2,
}

export interface UserRole {
  activity_management: boolean;
  member_management: boolean;
  fee_management: boolean;
}

export interface User {
  id: string;
  password?: string;
  name: string;
  department: string;
  phone: string;
  email: string;
  grade: number;
  attendance: Attendance;
  role: UserRole;
  approved?: boolean;
  on_delete?: boolean;
  created_at?: string;
  updated_at?: string;
  //  locally used
  checked?: boolean;
}

export interface Credentials {
  access_token: string;
  expired_at: string;
}
