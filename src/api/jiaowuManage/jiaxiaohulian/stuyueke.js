import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"


// 获取作业
export const getYuekePage_api = (paramobj={ size,current,kechengName,stuName,teacherName,status,qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxyuekestufaqitable/getYuekePage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 约课审核不通过
export const auditNotPassed_api = (paramobj={ id,qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxyuekestufaqitable/auditNotPassed',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 约课审核通过
export const examinationPassed_api = (paramobj={ id,classroomID,qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxyuekestufaqitable/examinationPassed',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 获取教室列表
export const getClassRoomList_api = (paramobj={ campusID,qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxyuekestufaqitable/getClassRoomList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}