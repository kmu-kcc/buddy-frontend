import {getRequest} from '.';
import {Attendance} from '../../models/User';

// buddy/back-end/docs/member에 명세 되어있는 내용 중 기능에 따라 members.ts와 해당 페이지(auth.ts)에 나눠져있습니다.
// 주석으로 백엔드/독스/멤버 중 어디에 명세되어있는지와 몇번째 api인지 명세되어있습니다
// 추가적으로 회원 가입 탈퇴에 직접적으로 관련이 있지만 organazation 페이지들에 들어가기 힘들 api들이 있습니다.

export interface SignInRequest {
  id: string;
  password: string;
}

// 1. SignIn(member spec 1번 api) - 회원 로그인
export const signIn = (data: SignInRequest) => {
  return getRequest().post('/member/signin', {
    ...data,
  });
};

// 2. SignUp(member spec 2번 api) - 회원 가입 신청
export interface SignUpRequest {
  id: string;
  name: string;
  department: string;
  phone: string;
  email: string;
  grade: number;
  attendance: 0 | 1 | 2;
}

export const signUp = (data: SignUpRequest) => {
  return getRequest().post('/member/signup', {
    ...data,
  });
};

export interface WithdrawRequest {
  id: string;
}

// 5. Exit(member spec 5번 api) - 회원 탈퇴 신청
export const withdrawRequest = (data: WithdrawRequest) => {
  return getRequest().put('/member/exit', {
    ...data,
  });
};

export interface GetMyRequest {
  id: string;
  password: string;
}

// 8. My(member spec 8번 api) - 내 정보 불러오기
export const getMy = (data: GetMyRequest) => {
  return getRequest().post('/member/my', {
    ...data,
  });
};

// 10. Update(member spec 10번 api) - 회원 정보 갱신
export interface UpdateMemberRequest {
  id: string;
  update: {
      password?: string;
      department?: string;
      phone?: string;
      email?: string;
      grade?: number;
      attendance?: Attendance;
  }
}

export const updateMember = (data: UpdateMemberRequest) => {
  return getRequest().put('/member/update', {
    ...data,
  });
};
