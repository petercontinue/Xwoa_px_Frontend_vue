import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"
// 获取作业
export const getZuoyePage_api = (paramobj={ size,current,teacherName,className,qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxzuoyetable/getZuoyePage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
// 添加作业
export const addZuoye_api = (paramobj={ neirong,classID,endDate,zuoyeImg,zuoyeMp3,zuoyeVideo,otherFile,qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxzuoyetable/addZuoye',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 删除作业
export const delZuoye_api = (paramobj={ Ids }) => {
    return axios.request({
        url: prefix + '/homeschool/pxzuoyetable/delZuoye',
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 获取作业
export const getZuoyeById_api = (paramobj={ id,qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxzuoyetable/getZuoyeById',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
// 修改作业
export const editZuoye_api = (paramobj={ neirong,classID,endDate,zuoyeImg,zuoyeMp3,zuoyeVideo,otherFile,qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxzuoyetable/editZuoye',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 获取作业详细
export const getZuoyeDetaile_api = (paramobj={ size,current,Id }) => {
    return axios.request({
        url: prefix + '/homeschool/pxzuoyetable/getZuoyeDetaile',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
