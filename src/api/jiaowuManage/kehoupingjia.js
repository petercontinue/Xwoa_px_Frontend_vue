import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"
/**
 * 分页查询评价
 * @param {*} param0 
 */
export const getFeedbackPage_api = ({ size, current, type, campusID, stuId, stuName, teacherName, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxevaluationtable/getFeedbackPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, type, campusID, stuId, stuName, teacherName, qiyeID
        }
    })
}

export const gethavepjrate = ({ pjID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxevaluationtable/gethavepjrate',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            pjID
        }
    })
}



/**
 * 获取学员列表
 * @param {*} param0 
 */
export const getStuList_api = ({ campusID, classID, shangkesjd, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxevaluationtable/getStuList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID,
            classID,
            shangkesjd,
            qiyeID
        }
    })
}

/**
 * 获取时间段
 * @param {*} param0 
 */
export const getPeriodList_api = ({ campusID, classID, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxevaluationtable/getPeriodList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID,
            classID,
            qiyeID
        }
    })
}

/**
 * 获取时间段
 * @param {*} param0 
 */
export const getStaffList_api = ({ campusID, classID, shangkesjd, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxevaluationtable/getStaffList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID,
            classID,
            shangkesjd,
            qiyeID
        }
    })
}

/**
 * 添加评价
 * @param {*} param0 
 */
export const addFeedback_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxevaluationtable/addFeedback',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj
    })
}
/**
 * 获取评价
 * @param {*} param0 
 */
export const getFeedback_api = ({ id, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxevaluationtable/getFeedback',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, qiyeID
        }
    })
}

/**
 * 修改评价
 * @param {*} param0 
 */
export const editFeedback_api = ({ id, note, imgAddr }) => {
    return axios.request({
        url: prefix + '/homeschool/pxevaluationtable/editFeedback',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, note, imgAddr
        }
    })
}
/**删除图片 */
export const delFeedback = ({ ID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxevaluationtable/delFeedback',
        method: 'delete',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            ID
        }
    })
}