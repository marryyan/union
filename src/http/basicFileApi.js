/**
 * 基础档案 api 文档
 * */
import {getApi, postApi} from "./http";

const basicFileApi = {
  // 基础档案---组织机构 工会左树
  getBaseBaseuniontree: function getBaseBaseuniontree (){
    const url = `/union/base/baseuniontree/tree`;
    return getApi(url)
  },
  // 基础档案---组织机构 工会列表
  postBaseunioninfoPage: function postBaseunioninfoPage (data){
    const url = `/union/base/baseunioninfo/page`;
    return postApi(url, data)
  },
  // 基础档案---组织机构 工会详情
  getBaseBaseunioninfoInfo: function getBaseBaseunioninfoInfo (data){
    const url = `/union/base/baseunioninfo/info/${data.id}`;
    return getApi(url, data)
  },
  // 基础档案---组织机构 工会添加
  postBaseBaseunioninfoSave: function postBaseBaseunioninfoSave (data){
    const url = `/union/base/baseunioninfo/save`;
    return postApi(url, data)
  },
  // 基础档案---组织机构 工会修改
  postBaseBaseunioninfoUpdate: function postBaseBaseunioninfoUpdate (data){
    const url = `/union/base/baseunioninfo/update`;
    return postApi(url, data)
  },
  // 基础档案---组织机构 工会删除
  postBaseBaseunioninfoDelete: function postBaseBaseunioninfoDelete (data){
    const url = `/union/base/baseunioninfo/delete/${data.id}`;
    return getApi(url, data)
  },
  // 基础档案---税所机构库 税所左树
  getBasebasetaxtreetree: function getBasebasetaxtreetree (data){
    const url = `/union/base/basetaxtree/tree`;
    return getApi(url, data)
  },
  // 基础档案---税所机构库 税务局列表
  postBasebasetaxinfoPage: function postBasebasetaxinfoPage (data){
    const url = `/union/base/basetaxinfo/page`;
    return postApi(url, data)
  },
  // 基础档案---税所机构库 税务局详情
  getBasebasetaxinfoInfo: function getBasebasetaxinfoInfo (data){
    const url = `/union/base/basetaxinfo/info/${data.id}`;
    return getApi(url, data)
  },
  // 基础档案---税所机构库 税务局添加
  postBasebasetaxinfoSave: function postBasebasetaxinfoSave (data){
    const url = `/union/base/basetaxinfo/save`;
    return postApi(url, data)
  },
  // 基础档案---税所机构库 税务局修改
  postBasebasetaxinfoUpdate: function postBasebasetaxinfoUpdate (data){
    const url = `/union/base/basetaxinfo/update`;
    return postApi(url, data)
  },
  // 基础档案---税所机构库 税务局删除
  getBasebasetaxinfoDelete: function getBasebasetaxinfoDelete (data){
    const url = `/union/base/basetaxinfo/delete/${data.id}`;
    return getApi(url, data)
  },
  // 基础档案---企业信息库 已建会列表
  postBaseBasecompanyinfoPagehas: function postBaseBasecompanyinfoPagehas (data){
    const url = `/union/base/basecompanyinfo/pagehas`;
    return postApi(url, data)
  },
  // 基础档案---企业信息库 未建会列表
  postBaseBasecompanyinfoPageno: function postBaseBasecompanyinfoPageno (data){
    const url = `/union/base/basecompanyinfo/pageno`;
    return postApi(url, data)
  },
  // 基础档案---企业信息库 小微企业列表
  postPagesmallmicrobusinesses: function postPagesmallmicrobusinesses (data){
    const url = `/union/base/basecompanyinfo/pagesmallmicrobusinesses`;
    return postApi(url, data)
  },
  // 基础档案---企业信息库 添加修改工会信息
  postBasecompanyinfoUnion: function postBasecompanyinfoUnion (data){
    const url = `/union/base/basecompanyinfo/union`;
    return postApi(url, data)
  },
}

export default basicFileApi
