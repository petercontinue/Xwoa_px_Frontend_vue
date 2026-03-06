import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"

// 添加相册
export const addXiangce_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxxiangcetable/addXiangce',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 获取相册
export const getXiangcePage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxxiangcetable/getXiangcePage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 删除相册
 * @param {*} paramobj 
 */
export const delXiangce = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxxiangcetable/delXiangce',
        method: 'delete',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 修改相册信息
 * @param {*} paramobj 
 */
export const editXiangce = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxxiangcetable/editXiangce',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 查询相册图片信息
 * @param {*} paramobj 
 */
export const getXiangceImagePage = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxxiangcetable/getXiangceImagePage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 查询相册详细信息
 * @param {*} paramobj 
 */
export const GetXiangceInfo = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxxiangcetable/GetXiangceInfo',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 添加相册照片
 * @param {*} paramobj 
 */
export const addXiangceImage = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxxiangcetable/addXiangceImage',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 删除相册图片信息
 * @param {*} paramobj 
 */
export const delXiangceImage = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxxiangcetable/delXiangceImage',
        method: 'delete',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

