import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-caiwu"


export const getGongziPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzitiao/getGongziPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getGongziPro_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzimanage/getGongziPro',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const addGongzi_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzimanage/addGongzi',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json'
        },
        params:paramobj,
        data: paramobj.gongzipro
    })
}

export const getGongziminxiList_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzimanage/getGongziminxiList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getGongzi_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzimanage/getGongzi',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const editGongzi_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzimanage/editGongzi',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json'
        },
        params:paramobj,
        data: paramobj.gongzipro
    })
}

export const delGongzi_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzimanage/delGongzi',
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}

export const changeVerify_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzimanage/changeVerify',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}
export const getgongziPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzitiao/getGongziPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}

export const getGongzixiangmuPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzixiangmu/getGongzixiangmuPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}
export const addGongzixiangmu_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzixiangmu/addGongzixiangmu',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}

export const getGongzixiangmu_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzixiangmu/getGongzixiangmu',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}

export const editGongzixiangmu_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzixiangmu/editGongzixiangmu',
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}

export const delGongzixiangmu_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzixiangmu/delGongzixiangmu',
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}

export const getGongzifenpeiPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzifenpei/getGongzifenpeiPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}

export const getGongzixiangmuList_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzifenpei/getGongzixiangmuList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}

export const getGongzifenpei_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzifenpei/getGongzifenpei',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}

export const editGongzifenpei_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzifenpei/editGongzifenpei',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}

export const ExportGongziMuban = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/pxgongzitable/gongzimanage/ExportGongziMuban',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params:paramobj,
    })
}