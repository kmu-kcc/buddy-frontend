import {request} from '.';

export const signIn = async (id: string, password: string) => {
  return request.post('/member/signin', {id, password});
};

interface SignUpRequest {
  id: string;
  name: string;
  epartment: string;
  phone: string;
  email: string;
  grade: number;
  attendance: 0 | 1 | 2;
}

export const signUp = async (data: SignUpRequest) => {
  return request.post('/member/signup', {
    ...data,
  });
};

export const withdrawRequest = async (id: string) => {
  return request.post('/member/exit', {id});
};
