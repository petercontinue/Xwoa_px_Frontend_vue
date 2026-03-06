import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"


// 获取学生列表
export const getStuPage_api = (paramobj = { size, current, campusID, classID, stuID, stuName, isHaveAReturnVisit }) => {
    return axios.request({
        url: prefix + '/homeschool/oldstupxhuifang/getStuPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
// 获取学生信息
export const getStu_api = (paramobj = { stuID, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/oldstupxhuifang/getStu',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
// 获取课程列表
export const getStuKechengList_api = (paramobj = { stuID, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/oldstupxhuifang/getStuKechengList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 获取添加老学员回访
export const addHuifang_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/oldstupxhuifang/addHuifang',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 获取老学员回访列表
export const getHuifangPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/oldstupxhuifang/getHuifangPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 获取老学员回访列表
export const editHuifang_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/oldstupxhuifang/editHuifang',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 获取老学员回访列表
export const delHuifang_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/oldstupxhuifang/delHuifang',
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}