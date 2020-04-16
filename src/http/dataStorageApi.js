/**
 * 数据入库 api 文档
 * */
import { postApi, getApi } from "./http";

const dataStorageApi = {
  // 数据入库--银行入库 银行入库列表分页
  postStoreStorebanktempList: function postStoreStorebanktempList (data){
    const url = `/union/store/storebanktemp/list`;
    return postApi(url, data)
  },
  // 数据入库--银行入库 xls导入
  postStoreStorebanktempImportexcel: function postStoreStorebanktempImportexcel (data){
    const url = `/union/store/storebanktemp/importexcel`;
    return postApi(url, data)
  },
  // 数据入库--对账 未入库数据编号的全部数据
  postStoreStoreversionListNotInStorage: function postStoreStoreversionListNotInStorage (data){
    const url = `/union/store/storeversion/listNotInStorage`;
    return postApi(url, data)
  },
  // 数据入库--银行入库 银行入库详情
  postStoreStorebanktempInfo: function postStoreStorebanktempInfo (data){
    const url = `/union/store/storebanktemp/info/${data.id}`;
    return postApi(url, data)
  },
  // 数据入库--银行入库 银行入库修改
  postStoreStorebanktempUpdate: function postStoreStorebanktempUpdate (data){
    const url = `/union/store/storebanktemp/update`;
    return postApi(url, data)
  },
  // 数据入库--银行入库 银行入库删除
  postStoreStorebanktempDelete: function postStoreStorebanktempDelete (data){
    const url = `/union/store/storebanktemp/delete/${data.ids}`;
    return postApi(url, data)
  },

  // 数据入库--税务入库 xls导入
  postStoreStoretaxtempImportexcel: function postStoreStoretaxtempImportexcel (data){
    const url = `/union/store/storetaxtemp/importexcel`;
    return postApi(url, data)
  },
  // 数据入库--税务入库 税务入库列表分页
  postStoreStoretaxtempList: function postStoreStoretaxtempList (data){
    const url = `/union/store/storetaxtemp/list`;
    return postApi(url, data)
  },
  // 数据入库--税务入库 税务入库详情
  postStoreStoretaxtempInfo: function postStoreStoretaxtempInfo (data){
    const url = `/union/store/storetaxtemp/info/${data.id}`;
    return postApi(url, data)
  },
  // 数据入库--税务入库 税务入库提交
  postStoreStoretaxtempSubmit: function postStoreStoretaxtempSubmit (data){
    const url = `/union/store/storetaxtemp/submit`;
    return postApi(url, data)
  },
  // 数据入库--税务入库 税务入库删除
  postStoreStoretaxtempDelete: function postStoreStoretaxtempDelete (data){
    const url = `/union/store/storetaxtemp/nosubmitdelete`;
    return postApi(url, data)
  },
  // 数据入库--税务入库 税务入库足额分析（不足额数据分页）
  postStoreStoretaxtempHasfulllist: function postStoreStoretaxtempHasfulllist (data){
    const url = `/union/store/storetaxtemp/hasfulllist`;
    return postApi(url, data)
  },
  // 数据入库--银行入库 数据入库列表分页
  postStoreStoreversionList: function postStoreStoreversionList (data){
    const url = `/union/store/storeversion/list`;
    return postApi(url, data)
  },
}

export default dataStorageApi
