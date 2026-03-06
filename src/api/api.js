import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

/**
 * 网络请求的公共封装-带TOKEN的请求 
 * @param {*} url 请求的URL
 * @param {*} paramsData 参数,如果没有参数则传{}过来
 * @returns 
 */
export const get = (url, paramsData) => {
    return axios.request({
        url: url,
        method: "GET",
        headers: {
            'Authorization': "Bearer " + getToken(),
            ContentType: "application/x-www-form-urlencoded"
        },
        params: paramsData
    })
}

export const post = (url, paramsData) => {
    return axios.request({
        url: url,
        method: "POST",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramsData
    });
}

export const del = (url, paramsData) => {
    return axios.request({
        url: url,
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + getToken(),
            ContentType: "application/x-www-form-urlencoded"
        },
        params: paramsData
    });
}

export const put = (url, paramsData) => {
    return axios.request({
        url: url,
        method: "PUT",
        headers: {
            'Authorization': "Bearer " + getToken(),
            ContentType: "application/x-www-form-urlencoded"
        },
        params: paramsData
    });
}


/**
 * 网络请求的公共封装-不需要带TOKEN的请求
 * @param {*} url 请求的URL
 * @param {*} paramsData 参数,如果没有参数则传{}过来
 * @returns 
 */
export const getNoToken = (url, paramsData) => {
    return axios.request({
        url: url,
        method: "GET",
        headers: {
            ContentType: "application/x-www-form-urlencoded"
        },
        params: paramsData
    });
}

export const postNoToken = (url, paramsData) => {
    return axios.request({
        url: url,
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        params: paramsData
    });
}

export const delNoToken = (url, paramsData) => {
    return axios.request({
        url: url,
        method: "DELETE",
        headers: {
            ContentType: "application/x-www-form-urlencoded"
        },
        params: paramsData
    });
}

export const putNoToken = (url, paramsData) => {
    return axios.request({
        url: url,
        method: "PUT",
        headers: {
            ContentType: "application/x-www-form-urlencoded"
        },
        params: paramsData
    });
}

/**
 * 上传图片到阿里云对象存储 
 * @param {*} params 
 * @returns 
 */
 export const uploadFileToAliOss = (params) => {
    return axios.request({
        url: "shopcloud-sys/aliyun/uploadFileToAliOss",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'multipart/form-data'
        },
        data: params
    })
}



