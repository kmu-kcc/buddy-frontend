import {request} from '.';

// buddy/back-end/docs/member에 명세 되어있는 내용 중 기능에 따라 members.ts와 해당 페이지(auth.ts)에 나눠져있습니다.
// 주석으로 백엔드/독스/멤버 중 어디에 명세되어있는지와 몇번째 api인지 명세되어있습니다
// 추가적으로 회원 가입 탈퇴에 직접적으로 관련이 있지만 organazation 페이지들에 들어가기 힘들 api들이 있습니다.

export interface SignInRequest {
  id: string;
  password: string;
}

// 1. SignIn(member 독스 1번 api) - 회원 로그인
export const signIn = (data: SignInRequest) => {
  return request.post('/member/signin', {
    ...data,
  });
};

// 2. SignUp(member 독스 2번 api) - 회원 가입 신청
export interface SignUpRequest {
  id: string;
  name: string;
  epartment: string;
  phone: string;
  email: string;
  grade: number;
  attendance: 0 | 1 | 2;
}

export const signUp = (data: SignUpRequest) => {
  return request.post('/member/signup', {
    ...data,
  });
};

// 5. Exit(member 독스 5번 api) - 회원 탈퇴 신청
export const withdrawRequest = (id: string) => {
  return request.put('/member/exit', {id});
};

export interface GetMyRequest {
  id: string;
  password: string;
}

// 8. My(member spec 8번 api) - 내 정보 불러오기
export const getMy = (data: GetMyRequest) => {
  return request.post('/member/my', {
    ...data,
  });
};

// 10. Update(member spec 10번 api) - 회원 정보 갱신
interface UpdateMemberStatusRequest {
  id: string;
  update: {
      password: string;
      department: string;
      phone: string;
      email: string;
      grade: number;
      attendence: 0 | 1 | 2;
  }
}

export const updateMemberStatus = (data: UpdateMemberStatusRequest) => {
  return request.put('/member/update', {data});
};
