import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-caiwu"

export const getZhaoshengBili_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/zhaosheng/getZhaoshengBili',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getZhaoshengList_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/zhaosheng/getZhaoshengList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getLaiyuantujingList_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/zhaosheng/getLaiyuantujingList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getYixiangPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/yixiang/getYixiangPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getYixiangDetail_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/yixiang/getYixiangDetail',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getOldschoolBili_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/oldschool/getOldschoolBili',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getOldschoolstuPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/oldschool/getOldschoolstuPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getTeacherlPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/oldteacher/getTeacherlPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getTeacherlBili_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/oldteacher/getTeacherlBili',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getRenewPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/xvfei/getRenewPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getKemukehaotongjiPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/kemushoufei/getKemukehaoPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getBanjiKehaoPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/caiwu/tongji/banjishoufei/getBanjitongjiPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getShoufeiDetail_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/kehao/getShoufeiDetail',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getNianjiPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/kehao/getNianjiPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getBanjiPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/kehao/getBanjiPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getBuxiStylePage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/kehao/getBuxiStylePage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getKemuPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/kehao/getKemuPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getBanzhurenPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/kehao/getBanzhurenPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getYuejunkehaoPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/kehao/getYuejunkehaoPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getJiaoshiyuejunkehaoPage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/kehao/getJiaoshiyuejunkehaoPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
export const getKehaotongbihuanbi_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/kehao/getKehaotongbihuanbi',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getXuesherenshu_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/renshu/getXuesherenshu',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getTeacherStu_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/renshu/getTeacherStu',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getTeacherStuDetaile_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/renshu/getTeacherStuDetaile',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getBanzhurenStu_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/renshu/getBanzhurenStu',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getBanzhurenStuDetaile_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/renshu/getBanzhurenStuDetaile',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getKumuStuZhanbi_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/other/getKumuStu',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getKumuXinqianXvfei_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/other/getKumuXinqianXvfei',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getKumukeshizhanbi_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/other/getKumukeshi',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getKumukexiaozhanbi_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/other/getKumukexiao',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getTingkeStu_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/other/getTingkeStu',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getStupaikePage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/paike/getStupaikePage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getTeacherpaikePage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/paike/getTeacherpaikePage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
export const getCampuspaikePage_api = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/paike/getCampuspaikePage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
export const getTeaStuLiushiPage = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/liushilvStu/getTeaStuLiushiPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
export const getBanzhurenStuLiushiPage = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/liushilvStu/getBanzhurenStuLiushiPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
export const getCampusStuLiushiPage = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/liushilvStu/getCampusStuLiushiPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
export const getClassProfit = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/other/getClassProfit',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
export const getSubject = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/other/getSubject',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
export const getKemuShoufeiTongji = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/other/getKemuShoufeiTongji',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
export const getSubjectYuETongji = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/other/getSubjectYuETongji',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
export const getSubjectBmTongji = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/other/getSubjectBmTongji',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
export const getSubjectBmByCampusAndSubject = (paramobj) => {
    return axios.request({
        url: prefix + '/shujutongji/other/getSubjectBmByCampusAndSubject',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

