import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-pkxk"



/**
 * 获取学员
 */
export const getStu_api = (paramobj = { menuID }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/getStuList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**
 * 分页获取学员上课记录
 * @param {*} paramobj
 */
export const getStukehaoPage_api = (paramobj = { current, size, stuID, stuName, stuGradeID, className, kechengName, banzhuren, buxiStyleID, teacherNames, weekN, haveClassDate, campusID, adduser, stukaoqing }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/getStukehaoPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 分页获取教师上课记录
 */
export const getTeakehaoPage_api = (paramobj = { current, size, campusID, TeachName, grade, kechengName, buxiStyleName, className, startDate, endDate }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/getTeakehaoPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}


/**
 * 分页获取剩余课时
 */
export const remainkeshishowPage_api = (paramobj = { current, size, campusID, stugrageID, stuID, stuName, banzhuren, buxiStateID }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/remainkeshishowPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 学员课时清零
 */
export const getClearPage_api = (paramobj = { current, size, campusID, stuName, kcName }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/getClearPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**
 * 删除学员上课记录
 */
export const delStukehao_api = (paramobj) => {
    return axios.request({
        url: prefix + "/kehao/ClassRecord/delStukehao",
        method: 'delete',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj
    })
}
/**
 * 获取缺课学员
 */
export const NokaoqingstuPage_api = (paramobj = { current, size, ID }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/NokaoqingstuPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**
 * 分页获取剩余天数详情
 */
export const getRemainkeshiDetailsPage_api = (paramobj = { current, size, campusID, className, stuID, stuName, subjectName, kechengName }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/getRemainkeshiDetailsPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}


/**
 * 分页获取剩余天数详情
 */
export const getRemainDaysPage_api = (paramobj = { current, size, campusID, className, stuID, stuName, subjectName, kechengName, isShow }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/getRemainDaysPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**获取要修改的学员的所有补习课程以及剩余学费 */
export const UpdatekeshiAndXFPage_api = (paramobj = { current, size, stuID }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/UpdatekeshiAndXFPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**
 * 修改剩余课时
 *  */
export const updateRemainKs_api = (paramobj = { buxiID, newKS }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/updateRemainKs',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**
 * 修改剩余学费
 */
export const updateRemainXF_api = (paramobj = { buxiID, newKS }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/updateRemainXF',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**
 * 分页获取学员缴费详情
 */
export const qiandanStuShowPage_api = (paramobj = { current, size, stuID }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/qiandanStuShowPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**
 * 分页获取学员课耗详情
 */
export const getstukehaoShowPage_api = (paramobj = { current, size, stuID }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/getstukehaoShowPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const deletekeshiClear = (data = { ids }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/deletekeshiClear',
        method: 'delete',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

export const delteakehao = (data = { id }) => {
    return axios.request({
        url: prefix + '/kehao/ClassRecord/delteakehao',
        method: 'delete',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}