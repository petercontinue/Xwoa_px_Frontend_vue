import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"

// 获取满意度
export const getManyiduPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxmanyidutable/getManyiduPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

// 删除满意度
export const delManyidu_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxmanyidutable/delManyidu',
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}