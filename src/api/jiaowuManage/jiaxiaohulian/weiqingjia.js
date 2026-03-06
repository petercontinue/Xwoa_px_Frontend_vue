import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"

// 获取请假
export const getQingjiaPage_api = (paramobj = { size, current, campusID, stuName, teacherName, startDate, endDate, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxqingjiatable/getQingjiaPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
// 修改审核状态
export const changeReviewStatus_api = (paramobj = { Ids, status, shenheNopassReason, qiyeID }) => {
    return axios.request({
        url: prefix + '/homeschool/pxqingjiatable/changeReviewStatus',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 删除请假信息
export const delQingjia_api = (paramobj = { Ids }) => {
    return axios.request({
        url: prefix + '/homeschool/pxqingjiatable/delQingjia',
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

