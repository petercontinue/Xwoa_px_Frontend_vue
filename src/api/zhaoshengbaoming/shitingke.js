import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
/**
 * 分页查询试听课信息
 * @param {*} data 
 * @returns 
 */
export const GetAllshitingkePages = (data) => {
    return axios.request({
        url: "/xwcloud-pkxk/paike/paikexiaoke/GetAllshitingkePages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 保存试听课信息
 * @param {*} data 
 * @returns 
 */
export const SaveshitingkechengInfo = (data) => {
    return axios.request({
        url: "/xwcloud-pkxk/paike/paikexiaoke/SaveshitingkechengInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 删除试听课信息
 * @param {*} data 
 * @returns 
 */
export const deletShitingke = (data) => {
    return axios.request({
        url: "/xwcloud-pkxk/paike/paikexiaoke/deletShitingke",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}