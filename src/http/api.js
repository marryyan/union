import { getApi, postApi } from './http';
import dataStorageApi from './dataStorageApi'
import basicFileApi from './basicFileApi'
import distributionManagementApi from './distributionManagementApi'
import queryStatsApi from './queryStatsApi'
import returnManagementApi from './returnManagementApi'
import systemManagementApi from './systemManagementApi'

export const basicFileApis = { ...basicFileApi }
export const dataStorageApis = { ...dataStorageApi }
export const distributionManagementApis = { ...distributionManagementApi }
export const queryStatsApis = { ...queryStatsApi }
export const returnManagementApis = { ...returnManagementApi }
export const systemManagementApis = { ...systemManagementApi }

export const loginApis = {
  // 登录
  userLogin: function userLogin(data) {
    const url = '/msbase/sys/login';
    return postApi(url, data)
  },
  // 获取验证码
  getYzmPic: function getYzmPic(data) {
    const url = '/msbase/captcha.jpg?uuid=' + data.uuid;
    return getApi(url, data)
  },
}



