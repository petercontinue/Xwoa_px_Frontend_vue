import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"

/**
 * 获取校区列表
 * @param {*} param0 
 */
export const getCampusList_api = ({ campusName, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/public/getCampusList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusName,
            qiyeID
        }
    })
}

/**
 * 获取班级列表
 * @param {*} param0 
 */
export const getClassList_api = ({ campusID, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/public/getClassList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID,
            qiyeID
        }
    })
}

/**
 * 获取教师列表
 * @param {*} param0 
 */
export const getjwpublicStaffList_api = ({ campusID, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/public/getStaffList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID,
            qiyeID
        }
    })
}

/**
 * 获取教室列表
 * @param {*} param0 
 */
export const getjwpublicClassRoomList_api = ({ campusID, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/public/getClassRoomList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID,
            qiyeID
        }
    })
}

/**
 * 获取学生列表
 * @param {*} param0 
 */
export const getPublicStuList_api = (data) => {
    return axios.request({
        url: prefix + '/homeschool/public/getPublicStuList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**
 * 获取员工岗位列表
 * @param {*} param0 s
 */
export const getPublicStaffPostList_api = (paramsobj) => {
    return axios.request({
        url: prefix + '/homeschool/public/getPublicStaffPostList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params:paramsobj
    })
}

/**
 * 获取员工岗位列表
 * @param {*} param0 s
 */
export const getPublicKemuList_api = (paramsobj) => {
    return axios.request({
        url: prefix + '/homeschool/public/getPublicKemuList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params:paramsobj
    })
}

/**
 * 获取年级列表
 * @param {*} param0 s
 */
export const getStugradeList_api = (paramsobj) => {
    return axios.request({
        url: prefix + '/homeschool/public/getStugradeList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params:paramsobj
    })
}