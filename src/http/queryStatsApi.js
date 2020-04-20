/**
 * 查询统计 api 文档
 * */
import { postApi, getApi } from "./http";

const queryStatsApi = {
  // 统计表格
  postCountTable: function postCountTable (data){
    const url = `/union/count/table`;
    return postApi(url, data)
  },
  // 统计表格下方分页
  postCountList: function postCountList (data){
    const url = `/union/count/list?dicConvert=1`;
    return postApi(url, data)
  },
  // 异常数据分页
  postCountErrorlist: function postCountErrorlist (data){
    const url = `/union/count/errorlist?dicConvert=1`;
    return postApi(url, data)
  },
}

export default queryStatsApi
