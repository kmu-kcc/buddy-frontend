import {getRequest} from '.';
import {UserRole} from '../../models/User';

// buddy/back-end/docs/member에 명세 되어있는 내용 중 기능에 따라 auth.ts와 해당 페이지(members.ts)에 나눠져있습니다.
// 주석으로 백엔드/독스/멤버 중 어디에 명세되어있는지와 몇번째 api인지 명세되어있습니다.
// 추가적으로 organization 페이지들에서 사용할 만한 api들이 모여있습니다.

// 3. SignUps(member spec 3번 api) - 회원 가입 신청 목록 조회
export const getSignUpRequests = () => {
  return getRequest().get('/member/signups');
};

// 6. Exits(member spec 6번 api) - 회원 탈퇴 신청 목록 조회
export const getWithdrawalRequests = () => {
  return getRequest().get('/member/exits');
};

export interface ApproveSignUpRequest {
  ids: string[];
}

// 4. Approve(member spec 4번 api) - 회원 가입 승인
export const approveSignUp = (data: ApproveSignUpRequest) => {
  return getRequest().put('/member/approve', {
    ...data,
  });
};

export interface RejectSignUpRequest {
  ids: string[];
}

// 7. Delete(member spec 7번 api) - 회원 가입 거부 및 탈퇴 처리
export const rejectSignUp = (data: RejectSignUpRequest) => {
  return getRequest().delete('/member/delete', {
    data,
  });
};

export interface SearchMemberRequest {
  keyword: string;
}

// 9. Search(member spec 9번 api) - 회원 검색
export const searchMember = ({keyword}: SearchMemberRequest) => {
  return getRequest().get(`/member/search?query=${keyword}`);
};

// 11. Active(member spec 11번 api) - 회원 가입 신청 활성 상태 확인
// organization에서 확인 할 순 없지만 해당 기능이 들어간다면 오가니제이션 페이지에서 활성/비활성 및 확인을 해야할 것 같아서 추가했습니다.
export const getSignUpActivated = () => {
  return getRequest().get('/member/active');
};

export interface ActivateSignUpRequest {
  activate: boolean;
}

// 12. Activate(member spec 12번 api) - 회원 가입 신청 활성화 / 비활성화
// 이 api 또한 디자인 혹은 프론트 구현은 안되어 있지만 들어가게 된다면 오가니제이션에 붙어야 할거같습니다.
export const activateSignUp = (data: ActivateSignUpRequest) => {
  return getRequest().put('/member/activate', {
    ...data,
  });
};

// 14. Update Role(member spec 14번 api) - 회원 권한 수정 (KCC 마스터 계정으로 권한 조정을 위해 필요)
// 아직 구현은 안되어 있지만 이건 오가니제이션에서 나와야함 일단 권한 수정은 몽고 디비를 통해서도 가능하긴함.
export interface UpdateUserRoleRequest {
  id: string;
  role: UserRole;
}

export const updateUserRole = (data: UpdateUserRoleRequest) => {
  return getRequest().put('/member/updaterole', {
    ...data,
  });
};
