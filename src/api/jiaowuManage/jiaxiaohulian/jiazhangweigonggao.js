import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"

export const getPxjiazhanggonggaoPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxjiazhanggonggao/getPxjiazhanggonggaoPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const delPxjiazhanggonggao_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxjiazhanggonggao/delPxjiazhanggonggao',
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const addPxjiazhanggonggao_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxjiazhanggonggao/addPxjiazhanggonggao',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getPxjiazhanggonggao_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxjiazhanggonggao/getPxjiazhanggonggao',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const editPxjiazhanggonggao_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxjiazhanggonggao/editPxjiazhanggonggao',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 查询微信账号列表
 * @param {*} paramobj 
 */
export const GetStuweixinPages = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxstuweixin/GetStuweixinPages',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 修改绑定手机号码
 * @param {*} paramobj 
 */
export const editStuWxInfo = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxstuweixin/editStuWxInfo',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 冻结学员微信端账号
 * @param {*} paramobj 
 */
export const freeze = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxstuweixin/freeze',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 解冻学员端微信账号
 * @param {*} paramobj 
 */
export const thaw = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxstuweixin/thaw',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 重置学员端微信账号密码
 * @param {*} paramobj 
 */
export const resetPassword = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxstuweixin/resetPassword',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 基础学员微信账号绑定
 * @param {*} paramobj 
 */
export const unbindWeChat = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxstuweixin/unbindWeChat',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 分页获取微信推送信息
 * @param {*} paramobj 
 */
export const GetStuWechatMessagePages=(paramobj)=>{
    return axios.request({
        url: prefix + '/homeschool/pxtuisongtable/GetStuWechatMessagePages',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 查询所有的推送类型
 * @param {*} paramobj 
 */
export const GetAllTuisongType=(paramobj)=>{
    return axios.request({
        url: prefix + '/homeschool/pxtuisongtable/GetAllTuisongType',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 保存学员微信群发
 * @param {*} paramobj 
 */
export const wechatGroupSending=(paramobj)=>{
    return axios.request({
        url: prefix + '/homeschool/pxtuisongtable/wechatGroupSending',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 查询所有选择的班级信息
 * @param {*} paramobj 
 */
export const GetAllClassInfoList=(paramobj)=>{
    return axios.request({
        url: prefix + '/homeschool/pxtuisongtable/GetAllClassInfoList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 保存按照班级推送学生
 * @param {*} paramobj 
 */
export const classGroupPosting=(paramobj)=>{
    return axios.request({
        url: prefix + '/homeschool/pxtuisongtable/classGroupPosting',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 保存按校区推送学生
 * @param {*} paramobj 
 */
export const campusMassRelease=(paramobj)=>{
    return axios.request({
        url: prefix + '/homeschool/pxtuisongtable/campusMassRelease',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}