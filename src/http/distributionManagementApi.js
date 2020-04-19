/**
 * 分配管理 api 文档
 * */
import { postApi, getApi } from "./http";

const distributionManagementApi = {
  // 分配管理 工会管理分页
  postStoreTaxdistributionList: function postStoreTaxdistributionList (data){
    const url = `/union/store/taxdistribution/list?dicConvert=1`;
    return postApi(url, data)
  },
}

export default distributionManagementApi
