/**
 * 返还管理 api 文档
 * */
import { postApi, getApi } from "./http";

const returnManagementApi = {
  // 返还管理---工会经费返还 工会经费列表分页
  postStoretaxcallbackGhjfList: function postStoretaxcallbackGhjfList (data){
    const url = `/union/store/storetaxcallback/ghjf/list`;
    return postApi(url, data)
  },
  // 返还管理---工会经费返还 处理回拨
  postStoretaxcallbackUpdate: function postStoretaxcallbackUpdate (data){
    const url = `/union/store/storetaxcallback/update`;
    return postApi(url, data)
  },
  // 返还管理---工会经费返还 拨付详情
  postStoreStoretaxcallbackInfo: function postStoretaxcallbackInfo (data){
    const url = `/union/store/storetaxcallback/info/${data.id}`;
    return postApi(url, data)
  },
  // 返还管理---工会经费返还 拨付详情
  postStoretaxcallbackCbjfList: function postStoretaxcallbackCbjfList (data){
    const url = `/union/store/storetaxcallback/cbjf/list`;
    return postApi(url, data)
  },
  // 返还管理---返还管理列表分页
  postStoretaxcallbackList: function postStoretaxcallbackList (data){
    const url = `/union/store/storetaxcallback/list?dicConvert=1`;
    return postApi(url, data)
  },
}

export default returnManagementApi
