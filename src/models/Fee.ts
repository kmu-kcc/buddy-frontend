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

export interface Payers {
    id: string;
    password?: string;
    name: string;
    department: string;
    phone: string;
    email: string;
    grade: number;
    attendance: Attendance;
    role?: UserRole;
    approved?: boolean;
    on_delete?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
  }

export interface Deptors {
    id: string;
    password?: string;
    name: string;
    department: string;
    phone: string;
    email: string;
    grade: number;
    attendance: Attendance;
    role?: UserRole;
    approved?: boolean;
    on_delete?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
  }

export interface SearchFee {
    carry_over: number;
    logs: Logs;
    total: number;
}

export interface Logs {
  amount: number;
  type: number;
  description?: string;
  created_at?: string
}