import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/page/home'
// 基础档案
import Organization from '@/page/basicArchives/organization/index'
import TaxOffice from '@/page/basicArchives/taxOffice/index'
import CompanyInfo from '@/page/basicArchives/companyInfor/index'
import AppropriationRatio from '@/page/basicArchives/appropriationRatio'
import BasePayment from '@/page/basicArchives/basePayment'
// 数据入库
import TaxWarehousing from '@/page/dataWarehousing/taxWarehousing/index'
import BankWarehousing from '@/page/dataWarehousing/bankWarehousing/index'
import AccountingRecord from '@/page/dataWarehousing/accountingRecord'
import LabourUnion from '@/page/returnManagement/labourUnion'
import Preparation from '@/page/returnManagement/preparation'
import Peanuts from '@/page/returnManagement/peanuts'
// 系统管理
import UserManage from '@/page/systemManage/userManage/index'
import RoleManage from '@/page/systemManage/roleManage/index'
import LogManage from '@/page/systemManage/logManage/index'
import TradeUnion from '@/page/assignManage/tradeUnion'
import PreparatoryFund from '@/page/assignManage/preparatoryFund'
import MicroEnterprise from '@/page/assignManage/microEnterprise'
// 查询统计
import FullCallback from '@/page/queryStatistics/fullCallback'
import ScaleNotOk from '@/page/queryStatistics/scaleNotOk'
import TradeUnionFunds from '@/page/queryStatistics/tradeUnionFunds'
import QueryPreparatoryFund from '@/page/queryStatistics/preparatoryFund'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/organization',
      children: [
        {
          path: '/organization',
          name: '组织机构库',
          component: Organization
        },
        {
          path: '/infoAdd',
          name: '新增工会信息',
          component: () => import('@/page/basicArchives/organization/infoHandle')
        },
        {
          path: '/infoEdit',
          name: '工会详细信息修改',
          component: () => import('@/page/basicArchives/organization/infoHandle')
        },
        {
          path: '/infoDetail',
          name: '工会详细信息',
          component: () => import('@/page/basicArchives/organization/infoDetail')
        },
        {
          path: '/taxOffice',
          name: '税所机构库',
          component: TaxOffice
        },
        {
          path: '/taxOfficeInfoAdd',
          name: '新建税所信息',
          component: () => import('@/page/basicArchives/taxOffice/infoHandle')
        },
        {
          path: '/taxOfficeInfoEdit',
          name: '税所详细信息修改',
          component: () => import('@/page/basicArchives/taxOffice/infoHandle')
        },
        {
          path: '/taxOfficeInfoDetail',
          name: '税所详细信息',
          component: () => import('@/page/basicArchives/taxOffice/infoDetail')
        },
        {
          path: '/companyInfo',
          name: '企业信息库',
          component: CompanyInfo
        },
        {
          path: '/companyInforInfoAdd',
          name: '新建企业信息',
          component: () => import('@/page/basicArchives/companyInfor/infoHandle')
        },
        {
          path: '/companyInforInfoEdit',
          name: '企业详细信息修改',
          component: () => import('@/page/basicArchives/companyInfor/infoHandle')
        },
        {
          path: '/companyInforDetail',
          name: '企业详细信息',
          component: () => import('@/page/basicArchives/companyInfor/infoDetail')
        },
        {
          path: '/appropriationRatio',
          name: '拨付比例设置',
          component: AppropriationRatio
        },
        {
          path: '/basePayment',
          name: '缴费基数设置',
          component: BasePayment
        },
        // 数据入库
        {
          path: '/taxWarehousing',
          name: '税务入库',
          component: TaxWarehousing
        },
        {
          path: '/taxWarehousingInfoHandle',
          name: '税务入库详细信息修改',
          component: () => import('@/page/dataWarehousing/taxWarehousing/infoHandle')
        },
        {
          path: '/bankWarehousing',
          name: '银行入库',
          component: BankWarehousing
        },
        {
          path: '/bankWarehousingInfoHandle',
          name: '银行入库详细信息修改',
          component: () => import('@/page/dataWarehousing/bankWarehousing/infoHandle')
        },
        {
          path: '/accountingRecord',
          name: '入库对账',
          component: AccountingRecord
        },
        {
          path: '/labourUnion',
          name: '工会经费返还',
          component: LabourUnion
        },
        {
          path: '/preparation',
          name: '筹备金返还',
          component: Preparation
        },
        {
          path: '/peanuts',
          name: '小微企业经费返还',
          component: Peanuts
        },
        // 系统管理
        {
          path: '/userManage',
          name: '用户管理',
          component: UserManage
        },
        {
          path: '/userManageInfoAdd',
          name: '新增用户',
          component: () => import('@/page/systemManage/userManage/infoHandle')
        },
        {
          path: '/userManageInfoEdit',
          name: '用户详细信息修改',
          component: () => import('@/page/systemManage/userManage/infoHandle')
        },
        {
          path: '/roleManage',
          name: '角色管理',
          component: RoleManage
        },
        {
          path: '/roleManageInfoEdit',
          name: '角色详细信息修改',
          component: () => import('@/page/systemManage/roleManage/infoHandle')
        },
        {
          path: '/roleManageInfoAdd',
          name: '新增角色',
          component: () => import('@/page/systemManage/roleManage/infoHandle')
        },
        {
          path: '/logManage',
          name: '日志管理',
          component: LogManage
        },
        // 分配管理
        {
          path: '/tradeUnion',
          name: '工会经费分配',
          component: TradeUnion
        },
        {
          path: '/preparatoryFund',
          name: '筹备金分配',
          component: PreparatoryFund
        },
        {
          path: '/microEnterprise',
          name: '小微企业经费分配',
          component: MicroEnterprise
        },
        // 查询统计
        {
          path: '/tradeUnionFunds',
          name: '工会经费缴款统计',
          component: TradeUnionFunds
        },
        {
          path: '/queryPreparatoryFund',
          name: '筹备金缴款统计',
          component: QueryPreparatoryFund
        },
        {
          path: '/fullCallback',
          name: '小微企业缴款统计',
          component: FullCallback
        },
        {
          path: '/scaleNotOk',
          name: '缴费异常企业统计',
          component: ScaleNotOk
        },
      ]
    }
  ]
})
