import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-caiwu"

export const getShouzhiStyleList_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/getShouzhiStyleList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getPaymoneystyleList_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/getPaymoneystyleList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getLiushuiPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/getLiushuiPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const addLiushui_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/addLiushui',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getLiushui_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/getLiushui',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const editLiushui_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/editLiushui',
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const delLiushui_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/delLiushui',
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getLiushuiDay_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/getLiushuiDay',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getShouruDay_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/GetRishouruDuizhangList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const GetRishouRuDuizhangTableKey = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/GetRishouRuDuizhangTableKey',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getYinkuiList_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/getYinkuiList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const Getshouzhistyle = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/Getshouzhistyle',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getpayMoneyList = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/liushui/getpayMoneyList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

