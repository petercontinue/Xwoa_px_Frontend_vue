import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-caiwu"

export const getCampusYearPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/yejipaiming/getCampusYearPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getCampusMonthPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/yejipaiming/getCampusMonthPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getGerenYearPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/yejipaiming/getGerenYearPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getGerenMonthPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/yejipaiming/getGerenMonthPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getGerenMonthDetailPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/yejipaiming/getGerenMonthDetailPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getDetailedIncomeDetails_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/yejipaiming/getDetailedIncomeDetails',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getDetailedZafeiDetailsPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/yejipaiming/getDetailedZafeiDetailsPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getDetailedShangpingDetailsPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/yejipaiming/getDetailedShangpingDetailsPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getYejitongbihuanbi_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/yejitongbihuanbi/getYejitongbihuanbi',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getKemushoufeiPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/kemushoufei/getKemushoufeiPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getKemukehaoPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/kemushoufei/getKemukehaoPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getKemuyufeePage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/kemushoufei/getKemuyufeePage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getBanjishoufeiPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/banjishoufei/getBanjitongjiPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getShoufeiDetail_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/banjishoufei/getShoufeiDetail',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getKucunxuefei_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/kucunxuefei/getKucunxuefei',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

