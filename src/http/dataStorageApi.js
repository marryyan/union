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
    const url = `/union/store/in/list`;
    return postApi(url, data)
  },
  // 数据入库--银行入库 银行入库列表分页（未提交的可以在此查询）
  postStorebanktempNosubmitlist: function postStorebanktempNosubmitlist (data){
    const url = `/union/store/storebanktemp/nosubmitlist?dicConvert=1`;
    return postApi(url, data)
  },
  // 数据入库--银行入库 银行入库提交
  postStorebanktempSubmit: function postStorebanktempSubmit (){
    const url = `/union/store/storebanktemp/submit`;
    return postApi(url)
  },
  // 数据入库--银行入库 银行入库删除(未提交)
  postStorebanktempNosubmitdelete: function postStorebanktempNosubmitdelete (){
    const url = `/union/store/storebanktemp/nosubmitdelete`;
    return postApi(url)
  },
  // 数据入库--税务入库 下载模板
  postStorebanktempDownloadexceltemplate: function postStorebanktempDownloadexceltemplate (){
    const url = `/union/store/storetaxtemp/downloadexceltemplate`;
    return postApi(url)
  },
  // 数据入库--税务入库 税务入库列表分页（未提交的可以在此查询）
  postStoretaxtempNosubmitlist: function postStoretaxtempNosubmitlist (data){
    const url = `/union/store/storetaxtemp/nosubmitlist?dicConvert=1`;
    return postApi(url, data)
  },
  // 数据入库--税务入库 税务入库提交
  postStoretaxtempSubmit: function postStoretaxtempSubmit (){
    const url = `/union/store/storetaxtemp/submit`;
    return postApi(url)
  },
  // 数据入库--税务入库 税务入库删除（删除未提交的）
  postStoretaxtempNosubmitdelete: function postStoretaxtempNosubmitdelete (){
    const url = `/union/store/storetaxtemp/nosubmitdelete`;
    return postApi(url)
  },

  // 数据入库--入库对账 入库操作
  postStoreInstorage: function postStoreInstorage (data){
    const url = `/union/store/in/instorage/${data.id}`;
    return postApi(url)
  },
}

export default dataStorageApi
