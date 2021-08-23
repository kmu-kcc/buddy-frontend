import {request} from '.';

// 1. Create - 활동 생성
interface activityCreate {
  start: string;
  end: string;
  place: string;
  type: 0 | 1 | 2;
  description: string;
  participants: string[];
  private: boolean;
}

export const createActivity = (data: activityCreate) => {
  return request.post('/activity/create', {
    ...data,
  });
};

// 2. Search - 활동 검색 (랜딩 페이지)
export const searchLanding = () => {

};

// 3. Private Search - 활동 검색 (백오피스)
export const searchPrivate = () => {

};

// 4. Update - 활동 정보 수정
interface updateRequst {
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
export const updateActivity = (data: updateRequst) => {
  return request.put('/activity/update', {
    ...data,
  });
};

// 5. Delete - 활동 삭제
export const deleteActivity = (id: string) => {
  return request.delete('/activity/delete', {
    data: {id},
  });
};

// 6. Upload - 파일 업로드(사진 포함)
export const uploadFile = () => {

};

// 7. Download - 파일 다운로드
export const downloadFile = () => {

};

// 8. DeleteFile - 파일 삭제
export const deleteFile = (id: string, filename: string) => {
  return request.post('/activity/deletefile', {id, filename});
};
