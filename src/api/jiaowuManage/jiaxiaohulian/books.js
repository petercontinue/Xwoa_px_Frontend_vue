import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"


export const getPxbooksPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/getPxbooksPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const delBook_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/delBook',
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getPxbook_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/getPxbook',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const editBook_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/editBook',
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const inboundRecordPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/inboundRecordPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const outboundRecordsPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/outboundRecordsPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getBorrowingRecordsPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/getBorrowingRecordsPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const borrowingRecordsPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/borrowingRecordsPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const returnBook_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/returnBook',
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const warehousing_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/warehousing',
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const outOfStock_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/outOfStock',
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const borrowBooks_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxbooks/borrowBooks',
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
//下载图书导入模板
export const tushuInfoMuban=(paramobj)=>{
    return axios.request({
        url: prefix + '/homeschool/pxbooks/tushuInfoMuban',
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}