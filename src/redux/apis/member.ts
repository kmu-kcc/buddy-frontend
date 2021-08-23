import {request} from '.';


// buddy/back-end/docs/member에 명세 되어있는 내용 중 기능에 따라 auth.ts와 해당 페이지(members.ts)에 나눠져있습니다.
// 주석으로 백엔드/독스/멤버 중 어디에 명세되어있는지와 몇번째 api인지 명세되어있습니다.
// 추가적으로 organization 페이지들에서 사용할 만한 api들이 모여있습니다.

// 3. SignUps(member 독스 3번 api) - 회원 가입 신청 목록 조회
export const getSignUpRequests = async () => {
  return request.get('/member/signups');
};

// 4. Approve(member 독스 4번 api) - 회원 가입 승인
export const signupApprove = async (ids: string[]) => {
  return request.put('/member/approve', {ids});
};

// 6. Exits(member 독스 6번 api) - 회원 탈퇴 신청 목록 조회
export const exitsMemberList = async () => {
  return request.get('/member/exits');
};

// 7. Delete(member 독스 7번 api) - 회원 가입 거부 및 탈퇴 처리
export const memberDelete = async (ids: string[]) => {
  return request.delete('/member/delete', {
    data: {ids},
  });
};

// 9. Search(member 독스 9번 api) - 회원 검색
export const memberListSearch = async () => {

};

// 11. Active(member 독스 11번 api) - 회원 가입 신청 활성 상태 확인
// organization에서 확인 할 순 없지만 해당 기능이 들어간다면 오가니제이션 페이지에서 활성/비활성 및 확인을 해야할 것 같아서 추가했습니다.
export const requestActiveCheck = async () => {
  return request.get('/member/active');
};

// 12. Activate(member 독스 12번 api) - 회원 가입 신청 활성화 / 비활성화
// 이 api 또한 디자인 혹은 프론트 구현은 안되어 있지만 들어가게 된다면 오가니제이션에 붙어야 할거같습니다.
export const activateMemberRequets = async () => {
  return request.put('/member/activate');
};

// 13. Graduates(member 독스 13번 api) - 졸업자 목록 조회 (추후 졸업자 메일 일괄 발송을 위해 존재)
// 이것도 아직 디자인이나 프론트 구현은 안되어 있지만 들어가게 된다면 오가니제이션에서 구현되어야 함.
export const getGraduatesList = async () => {
  return request.get('/member/graduates');
};

// 14. Update Role(member 독스 14번 api) - 회원 권한 수정 (KCC 마스터 계정으로 권한 조정을 위해 필요)
// 아직 구현은 안되어 있지만 이건 오가니제이션에서 나와야함 일단 권한 수정은 몽고 디비를 통해서도 가능하긴함.
interface roleUpdateRequest {
  id: string;
  role: {
    member_management: boolean;
    activity_management: boolean;
    fee_management: boolean;
  }
}
export const updateRole = async (data: roleUpdateRequest) => {
  return request.put('/member/updaterole', {
    ...data,
  });
};
