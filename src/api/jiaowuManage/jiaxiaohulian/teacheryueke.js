import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"

// 获取课程列表
export const getKechengList = (paramobj = { staffID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxyueketeacherfabu/getKechengList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getFabuYuekePage_api = (paramobj = { staffID, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxyueketeacherfabu/getFabuYuekePage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 保存老师发布约课信息
 * @param {*} paramobj 
 */
export const addFabuYueke = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxyueketeacherfabu/addFabuYueke',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 修改教师约课信息
 * @param {*} paramobj 
 */
export const editFabuYueke = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxyueketeacherfabu/editFabuYueke',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 删除发布的教师约课信息
 * @param {*} paramobj 
 */
export const delFabuYueke = (paramobj = { ids }) => {
    return axios.request({
        url: prefix + '/homeschool/pxyueketeacherfabu/delFabuYueke',
        method: 'delete',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}