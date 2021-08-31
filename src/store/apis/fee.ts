import {getRequest} from '.';

// 주석은 API 명세에 쓰여있는 내용입니다
// 코드는 명세에 쓰여있는 함수이름을 사용하기 편하게 수정하였습니다.
export interface CreateFeeRequest {
  year: number;
  semester: number;
  amount: number;
}

// 1. Create - 회비내역 초기화 (생성)
export const createFee = (data: CreateFeeRequest) => {
  return getRequest().post('/fee/create', {
    ...data,
  });
};

export interface SearchAmountRequest {
  id: string;
  year: number;
  semester: number;
}

// 2. Amount - 회비 납부액 조회
export const searchAmount = (data: SearchAmountRequest) => {
  return getRequest().post('/fee/amount', {
    ...data,
  });
}

export interface SearchPayersRequest {
  year: number;
  semester: 1 | 2;
}

// 3. Payers - 회비 납부자 목록 조회
export const searchPayers = (data: SearchPayersRequest) => {
  return getRequest().post('/fee/payers', {
    ...data,
  });
};

export interface SearchDeptorsRequest {
  year: number;
  semester: number;
}

// 4. Deptors - 회비 미납자 목록 조회
export const searchDeptors = (data: SearchDeptorsRequest) => {
  return getRequest().post('/fee/deptors', {
    ...data,
  });
};

export interface SearchAccountRequest {
  year: number;
  semester: number;
}

// 5. Search - 회비 내역 검색 (해당 학기 내역 출력)
export const searchAccount = (data: SearchAccountRequest) => {
  return getRequest().post('/fee/search', {
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
  return getRequest().post('/fee/pay', {
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
  return getRequest().post('/fee/deposit', {
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
  return getRequest().post('/fee/exempt', {
    ...data,
  });
};
