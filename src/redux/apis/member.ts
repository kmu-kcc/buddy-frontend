import {request} from '.';

export const getSignUpRequests = async () => {
  return request.get('/member/signins');
};
