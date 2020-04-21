/**
 * 系统管理 api 文档
 * */
import { postApi, getApi } from "./http";

const systemManagementApi = {
  // 系统管理-用户列表
  postSysRoleList: function postSysRoleList (data){
    const url = `/union/sys/user/list?dicConvert=1`;
    return postApi(url, data)
  },
  // 系统管理-用户详情
  postSysUserInfo: function postSysUserInfo (data){
    const url = `/union/sys/user/info/${data.userId}`;
    return postApi(url, data)
  },
  // 系统管理-用户修改
  postSysUserUpdate: function postSysUserUpdate (data){
    const url = `/union/sys/user/update`;
    return postApi(url, data)
  },
  // 系统管理-用户添加
  postSysUserSave: function postSysUserSave (data){
    const url = `/union/sys/user/save`;
    return postApi(url, data)
  },
  // 系统管理-用户锁定
  postSysUserLock: function postSysUserLock (data){
    const url = `/union/sys/user/lock/${data.userId}`;
    return postApi(url, data)
  },
}

export default systemManagementApi
