import {User} from './User';

export interface Deptors extends User {
  dept?: number;
}

export interface Account {
  carry_over: number;
  logs: Log[];
  total: number;
}

export interface Log {
  amount: number;
  type: number;
  description: string;
  created_at: string
}

export interface Semester {
  year: number;
  semester: 1 | 2;
}
