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
}

export default returnManagementApi
