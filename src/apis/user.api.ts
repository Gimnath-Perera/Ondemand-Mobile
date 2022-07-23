import Api from './api';

export default class UserAPI {
  static signUpAPI = data =>
    Api.request({
      method: 'post',
      action: '/v1/auth/register',
      guest: false,
      data,
    });

  static signInAPI = data =>
    Api.request({
      method: 'post',
      guest: false,
      action: '/v1/auth/login',
      data,
    });

  static forgotPasswordAPI = data =>
    Api.request({
      method: 'post',
      action: '/v1/auth/forgot-password',
      data,
    });

  static checkEmailAPi = data =>
    Api.request({
      method: 'post',
      action: '/v1/auth/check-email',
      data,
    });

  static setCurrentJob = data =>
    Api.request({
      method: 'post',
      action: '/v1/user-jobs/track',
      data,
    });

  static endCurrentJob = ({data, jobId}) =>
    Api.request({
      method: 'patch',
      action: `/v1/user-jobs/track/${jobId}`,
      data,
    });

  static uploadDocuments = data =>
    Api.request({
      method: 'post',
      action: '/v1/documents',
      data,
      isFormData: true,
    });

  static checkStatusAPI = userId =>
    Api.request({
      method: 'get',
      action: `/v1/auth/check-user-satus/${userId}`,
    });

  static getUserJobAPI = userId =>
    Api.request({
      method: 'get',
      action: `/v1/user-jobs?userId=${userId}&limit=1000`,
    });

  static sendMessageAPI = data =>
    Api.request({
      method: 'post',
      action: '/v1/messages',
      data,
    });

  static getAdminListAPI = () =>
    Api.request({
      method: 'get',
      action: '/v1/messages/admin-list',
    });

  static getProfilePicAPI = picId =>
    Api.request({
      method: 'get',
      action: `/v1/documents/prof-pic/${picId}`,
    });

  static getJobTypesAPI = ({userId, status}) =>
    Api.request({
      method: 'get',
      action: `/v1/user-jobs/${userId}?status=${status}`,
    });

  static uploadProfilePicAPI = data =>
    Api.request({
      method: 'post',
      action: '/v1/documents/prof-pic',
      data,
      isFormData: true,
    });

  static getChatByUserAPI = userId =>
    Api.request({
      method: 'get',
      action: `/v1/messages/chat/${userId}`,
    });

  static getCompletedRecordsByAPI = ({
    limit,
    sortBy,
    page,
    status,
    worker,
    startDate,
    endDate,
  }) =>
    Api.request({
      method: 'get',
      action: `/v1/report?limit=${limit}&sortBy=${sortBy}&page=${page}&status=${status}&worker=${worker}&startDate=${startDate}&endDate=${endDate}`,
    });
}
