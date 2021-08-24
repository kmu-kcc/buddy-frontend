import {request} from '.';
// 주석은 API 명세에 쓰여있는 내용입니다
// 코드는 명세에 쓰여있는 함수이름을 사용하기 편하게 수정하였습니다.
export interface CreateFeeRequest {
  year: number;
  semester: number;
  amount: number;
}
// 1. Create - 회비내역 초기화 (생성)
export const createFee = (data: CreateFeeRequest) => {
  return request.post('/fee/create', {
    ...data,
  });
};

export interface SearchAmountListRequest {
  id: string;
  year: number;
  semester: number;
}
// 2. Amount - 회비 납부액 조회
export const searchAmountList = (data: SearchAmountListRequest) => {
  return request.post('/fee/amount', {
    ...data,
  });
};

export interface SearchPayersListRequest {
  year: number;
  semester: number;
}
// 3. Payers - 회비 납부자 목록 조회
export const searchPayersList = (data: SearchPayersListRequest) => {
  return request.post('/fee/payers', {
    ...data,
  });
};

export interface SearchDeptorsListRequest {
  year: number;
  semester: number;
}
// 4. Deptors - 회비 미납자 목록 조회
export const searchDeptorsList = (data: SearchDeptorsListRequest) => {
  return request.post('/fee/deptors', {
    ...data,
  });
};

export interface SearchTransactionRequest {
  year: number;
  semester: number;
}
// 5. Search - 회비 내역 검색 (해당 학기 내역 출력)
export const searchTransaction = (data: SearchTransactionRequest) => {
  return request.post('/fee/search', {
    ...data,
  });
};

export interface PayRequest {
  year: number;
  semester: number;
  payments: {
    id: string;
    amount: number;
  }[];
}
// 6. Pay - 회비 납부 처리
export const pay = (data: PayRequest) => {
  return request.post('/fee/pay', {
    ...data,
  });
};

export interface DepositRequest {
  year: number;
  semester: number;
  amount: number;
  description: string;
}
// 7. deposit - 입금 / 지출 처리 (입금은 양수 지출은 음수)
export const deposit = (data: DepositRequest) => {
  return request.post('/fee/deposit', {
    ...data,
  });
};

export interface ExemptRequest {
  year: number;
  semester: number;
  id: string;
}
// 8. Exempt - 면제 처리
export const exempt = (data: ExemptRequest) => {
  return request.post('/fee/exempt', {
    ...data,
  });
};
