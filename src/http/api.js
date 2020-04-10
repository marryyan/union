import { getApi, postApi } from './http';

// 登录
export function userLogin(data) {
  const url = '/msbase/sys/login';
  return postApi(url, data)
}

// 获取验证码
export function getYzmPic(data) {
  const url = '/msbase/captcha.jpg?uuid=' + data.uuid;
  return getApi(url, data)
}

// 基础档案---组织机构 工会左树
export function getBaseBaseuniontree (){
  const url = `/union/base/baseuniontree/tree`;
  return getApi(url)
}
// 基础档案---组织机构 工会列表
export function postBaseunioninfoPage (data){
  const url = `/union/base/baseunioninfo/page`;
  return postApi(url, data)
}
// 基础档案---组织机构 工会详情
export function getBaseBaseunioninfoInfo (data){
  const url = `/union/base/baseunioninfo/info/${data.id}`;
  return getApi(url, data)
}
// 基础档案---组织机构 工会添加
export function postBaseBaseunioninfoSave (data){
  const url = `/union/base/baseunioninfo/save`;
  return postApi(url, data)
}
// 基础档案---组织机构 工会修改
export function postBaseBaseunioninfoUpdate (data){
  const url = `/union/base/baseunioninfo/update`;
  return postApi(url, data)
}
// 基础档案---组织机构 工会删除
export function postBaseBaseunioninfoDelete (data){
  const url = `/union/base/baseunioninfo/delete/${data.id}`;
  return getApi(url, data)
}

// 基础档案---税所机构库 税所左树
export function getBasebasetaxtreetree (){
  const url = `/union/base/basetaxtree/tree`;
  return getApi(url, data)
}
// 基础档案---税所机构库 税务局列表
export function postBasebasetaxinfoPage (data){
  const url = `/union/base/basetaxinfo/page`;
  return postApi(url, data)
}
// 基础档案---税所机构库 税务局详情
export function getBasebasetaxinfoInfo (data){
  const url = `/union/base/basetaxinfo/info/${data.id}`;
  return getApi(url, data)
}
// 基础档案---税所机构库 税务局添加
export function postBasebasetaxinfoSave (data){
  const url = `/union/base/basetaxinfo/save`;
  return postApi(url, data)
}
// 基础档案---税所机构库 税务局修改
export function postBasebasetaxinfoUpdate (data){
  const url = `/union/base/basetaxinfo/update`;
  return postApi(url, data)
}
// 基础档案---税所机构库 税务局删除
export function getBasebasetaxinfoDelete (data){
  const url = `/union/base/basetaxinfo/delete/${data.id}`;
  return getApi(url, data)
}
// 基础档案---企业信息库 已建会列表
export function postBaseBasecompanyinfoPagehas (data){
  const url = `/union/base/basecompanyinfo/pagehas`;
  return postApi(url, data)
}
// 基础档案---企业信息库 未建会列表
export function postBaseBasecompanyinfoPageno (data){
  const url = `/union/base/basecompanyinfo/pageno`;
  return postApi(url, data)
}
// 数据入库--税务入库 xls导入
export function postStoreStoretaxtempImportexcel (data){
  const url = `/union/store/storetaxtemp/importexcel`;
  return postApi(url, data)
}
// 数据入库--税务入库 税务入库列表分页
export function postStoreStoretaxtempList (data){
  const url = `/union/store/storetaxtemp/list`;
  return postApi(url, data)
}
// 数据入库--税务入库 税务入库详情
export function postStoreStoretaxtempInfo (data){
  const url = `/union/store/storetaxtemp/info/${data.id}`;
  return postApi(url, data)
}
// 数据入库--税务入库 税务入库-编辑
export function postStoreStoretaxtempUpdate (data){
  const url = `/union/store/storetaxtemp/update`;
  return postApi(url, data)
}
// 数据入库--税务入库 税务入库删除
export function postStoreStoretaxtempDelete (data){
  const url = `/union/store/storetaxtemp/delete/${data.ids}`;
  return postApi(url, data)
}
// 数据入库--税务入库 税务入库足额分析（不足额数据分页）
export function postStoreStoretaxtempHasfulllist (data){
  const url = `/union/store/storetaxtemp/hasfulllist`;
  return postApi(url, data)
}
// 数据入库--银行入库 xls导入
export function postStoreStorebanktempImportexcel (data){
  const url = `/union/store/storebanktemp/importexcel`;
  return postApi(url, data)
}
// 数据入库--银行入库 银行入库列表分页
export function postStoreStorebanktempList (data){
  const url = `/union/store/storebanktemp/list`;
  return postApi(url, data)
}
// 数据入库--银行入库 银行入库详情
export function postStoreStorebanktempInfo (data){
  const url = `/union/store/storebanktemp/info/${data.id}`;
  return postApi(url, data)
}
// 数据入库--银行入库 银行入库修改
export function postStoreStorebanktempUpdate (data){
  const url = `/union/store/storebanktemp/update`;
  return postApi(url, data)
}
// 数据入库--银行入库 银行入库删除
export function postStoreStorebanktempDelete (data){
  const url = `/union/store/storebanktemp/delete/${data.ids}`;
  return postApi(url, data)
}
// 数据入库--银行入库 数据入库列表分页
export function postStoreStoreversionList (data){
  const url = `/union/store/storeversion/list`;
  return postApi(url, data)
}
// 数据入库--对账 未入库数据编号的全部数据
export function postStoreStoreversionListNotInStorage (data){
  const url = `/union/store/storeversion/listNotInStorage`;
  return postApi(url, data)
}
