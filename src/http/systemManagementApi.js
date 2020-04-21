/**
 * 系统管理 api 文档
 * */
import { postApi, getApi } from "./http";

const systemManagementApi = {
  // 系统管理-用户列表
  postSysUserList: function postSysUserList (data){
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
  postSysUserLock: function postSysUserLock (data) {
    const url = `/union/sys/user/lock/${data.userId}`;
    return postApi(url, data)
  },
  // 系统管理-用户解锁
  postSysUserUnlock: function postSysUserUnlock (data) {
    const url = `/union/sys/user/unlock/${data.userId}`;
    return postApi(url, data)
  },
  // 系统管理-用户停用/启用
  postSysUserDisable: function postSysUserDisable (data) {
    const url = `/union/sys/user/disable`;
    return postApi(url, data)
  },
  // 系统管理-重置密码
  postSysUserReset: function postSysUserReset (data) {
    const url = `/union/sys/user/reset/${data.userId}`;
    return postApi(url, data)
  },
  // 系统管理-- 角色列表
  postSysRoleList: function postSysRoleList (data){
    const url = `/union/sys/role/list?dicConvert=1`;
    return postApi(url, data)
  },
  // 系统管理-- 全部角色-用户配置角色的时候使用，一个用户可以有多个角色
  postSysRoleListA: function postSysRoleListA (data){
    const url = `/union/sys/role/list?dicConvert=1_1587364809233`;
    return postApi(url, data)
  },
  // 系统管理-- 08角色选择项
  postSysRoleSelect: function postSysRoleSelect (data){
    const url = `/union/sys/role/select`;
    return postApi(url, data)
  },
  // 系统管理-- 角色保存
  postSysRoleSave: function postSysRoleSave (data){
    const url = `/union/sys/role/save`;
    return postApi(url, data)
  },
  // 系统管理-- 角色修改
  postSysRoleUpdate: function postSysRoleUpdate (data){
    const url = `/union/sys/role/update`;
    return postApi(url, data)
  },
  // 系统管理-- 角色详情
  postSysRoleInfo: function postSysRoleInfo (data){
    const params = { roleId: data.roleId }
    const url = `/union/sys/role/info/${data.roleId}?dicConvert=${data.type}`;
    return getApi(url, params)
  },
  // 系统管理-- 角色查看权限
  postSysRoleGetMenuTree: function postSysRoleGetMenuTree (data){
    const url = `/union/sys/role/getMenuTree/${data.roleId}`;
    return postApi(url, data)
  },
  // 系统管理-- 角色权限修改
  postSysRoleAuth: function postSysRoleAuth (data){
    const url = `/union/sys/role/auth`;
    return postApi(url, data)
  },
  // 日志列表
  postSysLogList: function postSysLogList (data){
    const url = `/union/sys/log/list`;
    return postApi(url, data)
  },
}

export default systemManagementApi
