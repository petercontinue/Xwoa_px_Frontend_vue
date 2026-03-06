import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-pkxk"

//分页获取排课签到签退流水
export const getqiandaoliushuiPage_api= (paramobj={current,size,stuName,type,style})=>{
    return axios.request({
        url:prefix+'/paike/paikexiaoke/getqiandaoliushuiPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}