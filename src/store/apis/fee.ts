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

// 2. Amount - 회비 납부액 조회
export const searchAmountList = (id: string, year: number, semester: number) => {
  return request.post('/fee/amount', {id, year, semester});
};

// 3. Payers - 회비 납부자 목록 조회
export const searchPayersList = (year: number, semester: number) => {
  return request.post('/fee/payers', {year, semester});
};

// 4. Deptors - 회비 미납자 목록 조회
export const searchDeptorsList = (year: number, semester: number) => {
  return request.post('/fee/deptors', {year, semester});
};

// 5. Search - 회비 내역 검색 (해당 학기 내역 출력)
export const searchTransaction = (year: number, semester: number) => {
  return request.post('/fee/search', {year, semester});
};

// 6. Pay - 회비 납부 처리
interface PayRequest {
  year: number;
  semester: number;
  payments: {
    id: string;
    amount: number;
  }[];
}

export const pay = (data: PayRequest) => {
  return request.post('/fee/pay', {
    ...data,
  });
};

// 7. deposit - 입금 / 지출 처리 (입금은 양수 지출은 음수)
export const deposit = (year: number, semester: number, amount: number, description: string) => {
  return request.post('/fee/deposit', {year, semester, amount, description});
};

// 8. Exempt - 면제 처리
export const exempt = (year: number, semester: number, id: string) => {
  return request.post('/fee/exempt', {year, semester, id});
};
