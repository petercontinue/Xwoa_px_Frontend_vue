import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-homeschool"

// 获取满意度
export const getStuFeedback_api = (paramobj) => {
    return axios.request({
        url: prefix + '/homeschool/pxtousutable/getStuFeedback',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}