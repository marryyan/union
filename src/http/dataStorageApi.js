/**
 * 数据入库 api 文档
 * */
import { postApi, getApi } from "./http";

// 数据入库--银行入库 银行入库列表分页
export function postStoreStorebanktempList (data){
  const url = `/union/store/storebanktemp/list`;
  return postApi(url, data)
}

// 数据入库--银行入库 xls导入
export function postStoreStorebanktempImportexcel (data){
  const url = `/union/store/storebanktemp/importexcel`;
  return postApi(url, data)
}

// 数据入库--对账 未入库数据编号的全部数据
export function postStoreStoreversionListNotInStorage (data){
  const url = `/union/store/storeversion/listNotInStorage`;
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
