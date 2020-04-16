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
  // 基础档案---企业信息库 添加修改企业信息
  postBasecompanyinfoComp: function postBasecompanyinfoComp (data){
    const url = `/union/base/basecompanyinfo/comp`;
    return postApi(url, data)
  },
  // 基础档案---企业信息库 添加编辑税务信息
  postBasecompanyinfoTax: function postBasecompanyinfoTax (data){
    const url = `/union/base/basecompanyinfo/tax`;
    return postApi(url, data)
  },
  // 基础档案---企业信息库 添加修改缴费信息
  postBasecompanyinfoPay: function postBasecompanyinfoPay (data){
    const url = `/union/base/basecompanyinfo/pay`;
    return postApi(url, data)
  },
  // 基础档案---企业信息库 企业信息详情
  getBasecompanyinfoInfo: function getBasecompanyinfoInfo (data){
    const url = `/union/base/basecompanyinfo/info/${data.id}`;
    return getApi(url, data)
  },
  // 基础档案---拨付比例设置 拨付比例设置分页
  getBaseratiocallbackList: function getBaseratiocallbackList (data){
    const url = `/union/base/baseratiocallback/list`;
    return postApi(url, data)
  },
  // 基础档案---拨付比例设置 拨付比例添加
  postBaseratiocallbackSave: function postBaseratiocallbackSave (data){
    const url = `/union/base/baseratiocallback/save`;
    return postApi(url, data)
  },
  // 基础档案---拨付比例设置 拨付比例详情
  postBaseratiocallbackInfo: function postBaseratiocallbackInfo (data){
    const url = `/union/base/baseratiocallback/info/${data.id}`;
    return postApi(url, data)
  },
  // 基础档案---拨付比例设置 拨付比例修改
  postBaseratiocallbackUpdate: function postBaseratiocallbackUpdate (data){
    const url = `/union/base/baseratiocallback/update`;
    return postApi(url, data)
  },
  // 基础档案---缴费基数设置 缴费基数设置分页
  postBaseratiopayList: function postBaseratiopayList (data){
    const url = `/union/base/baseratiopay/list`;
    return postApi(url, data)
  },
  // 基础档案---缴费基数设置 缴费基数详情
  postBaseratipayInfo: function postBaseratipayInfo (data){
    const url = `/union/base/baseratiopay/info/${data.id}`;
    return postApi(url, data)
  },
  // 基础档案---缴费基数设置 缴费基数添加
  postBaseratiopaySave: function postBaseratiopaySave (data){
    const url = `/union/base/baseratiopay/save`;
    return postApi(url, data)
  },
  // 基础档案---缴费基数设置 缴费基数修改
  postBaseratiopayUpdate: function postBaseratiopayUpdate (data){
    const url = `/union/base/baseratiopay/update`;
    return postApi(url, data)
  },
  // 基础档案---缴费基数设置 缴费基数启用停用
  postBaseratiopayIsuse: function postBaseratiopayIsuse (data){
    const url = `/union/base/baseratiopay/isuse`;
    return postApi(url, data)
  },
  // 基础档案---拨付比例设置 拨付比例启用停用
  postBaseratiocallbackIsuse: function postBaseratiocallbackIsuse (data){
    const url = `/union/base/baseratiocallback/isuse`;
    return postApi(url, data)
  },
  // 基础档案---右侧工会信息，下拉检索
  postBaseunioninfoSelectbyname: function postBaseratiocallbackIsuse (data){
    const url = `/union/base/baseunioninfo/selectbyname`;
    return postApi(url, data)
  },
}

export default basicFileApi
