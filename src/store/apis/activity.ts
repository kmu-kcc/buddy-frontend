import {getRequest} from '.';

// 1. Create - 활동 생성
export interface CreateActivityRequest {
  start: string;
  end: string;
  place: string;
  type: 0 | 1 | 2;
  description: string;
  participants: string[];
  private: boolean;
}

export const createActivity = (data: CreateActivityRequest) => {
  return getRequest().post('/activity/create', {
    ...data,
  });
};

export interface SearchActivityRequest {
  keyword: string;
}

// 3. Private Search - 활동 검색 (백오피스)
export const searchActivity = ({keyword}: SearchActivityRequest) => {
  return getRequest().get(`/activity/private?query=${keyword}`);
};

// 4. Update - 활동 정보 수정
export interface UpdateActivityRequest {
  id: string;
  update: {
    start: string;
    end: string;
    place: string;
    type: string;
    description: string;
    participants: string[];
  }
}
export const updateActivity = (data: UpdateActivityRequest) => {
  return getRequest().put('/activity/update', {
    ...data,
  });
};

export interface DeleteActivityRequest {
  id: string;
}

// 5. Delete - 활동 삭제
export const deleteActivity = (data: DeleteActivityRequest) => {
  return getRequest().delete('/activity/delete', {
    data,
  });
};

// 6. Upload - 파일 업로드(사진 포함)
export const uploadFile = () => {

};

// 7. Download - 파일 다운로드
export const downloadFile = () => {

};

export interface DeleteActivityFileRequest {
  id: string;
  filename: string;
}

// 8. DeleteFile - 파일 삭제
export const deleteFile = (data: DeleteActivityFileRequest) => {
  return getRequest().post('/activity/deletefile', {
    ...data,
  });
};
