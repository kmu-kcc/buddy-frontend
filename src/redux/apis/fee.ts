import {request} from '.';

// 1. Create - 회비내역 초기화 (생성)
export const create = async (year: number, semester: number, amount: number) => {
  return request.post('/fee/create', {year, semester, amount});
};

// 2. Amount - 회비 납부액 조회
export const amount = async (id: string, year: number, semester: number) => {
  return request.post('/fee/amount', {id, year, semester});
};

// 3. Payers - 회비 납부자 목록 조회
export const payers = async (year: number, semester: number) => {
  return request.post('/fee/payers', {year, semester});
};

// 4. Deptors - 회비 미납자 목록 조회
export const deptors = async (year: number, semester: number) => {
  return request.post('fee/deptors', {year, semester});
};

// 5. Search - 회비 내역 검색 (해당 학기 내역 출력)
export const search = async (year: number, semester: number) => {
  return request.post('/fee/search', {year, semester});
};

// 6. Pay - 회비 납부 처리
export const pay = async (year: number, semester: number, payments: Array<JSON>) => {
  return request.post('/fee/pay', {year, semester, payments});
};

// 7. deposit - 입금 / 지출 처리 (입금은 양수 지출은 음수)
export const deposit = async (year: number, semester: number, amount: number, description: string) => {
  return request.post('/fee/deposit', {year, semester, amount, description});
};

// 8. Exempt - 면제 처리
export const exempt = async (year: number, semester: number, id: string) => {
  return request.post('/fee/exempt', {year, semester, id});
};
