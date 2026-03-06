import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
/**分页获取退费管理 */

/**获取退费统计 */
export const gettuifeitongji = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/gettuifeitongji",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

export const getTuifeiPage = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/getTuifeiPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**分页获取退费审批 */
export const getshenpikaiguan = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/getshenpikaiguan",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}


/**获取驳回审批 */
export const shengpibohui = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/shengpibohui",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**审批通过 */
export const tongguoShenpi = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/tongguoShenpi",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}


/**分页获取退费审批 */
export const getTuifeishenpiPage = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/getTuifeishenpiPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**添加退费获取学员 */
export const caiwugetallstu = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/getallstu",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**添加退费获取支付方式 */
export const caiwugetpaystyle = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/getpaystyle",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**添加退费获取在职员工 */
export const caiwugetallStaff = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/getallStaff",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**添加退费获取学员的签单 */
export const caiwugetStuqiandan = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/getStuqiandan",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**添加退费获取学员信息 */
export const getTuifeiDetail = (data = { stuID, qiandanIDs }) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/getTuifeiDetail",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**添加退费获取学员课程信息 */
export const getKechengfeiDetail = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/getKechengfeiDetail",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**添加退费获取学员商品信息 */
export const getshanpingDetail = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/getshanpingDetail",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**添加退费获取学员杂费信息 */
export const getZafeiDetail = (data) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/getZafeiDetail",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**添加杂费退费 */
export const PartOtherTuiFei = (paramobj) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/PartOtherTuiFei",
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj
    })
}

/**添加全部杂费退费 */
export const allOtherTuiFei = (data = { stuID, payStyleID, yejirenID, processingTime, tuiallzfmoney, shuoming, qiandanIDs }) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/allOtherTuiFei",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**添加选择商品退费 */
export const PartWuPingTuiFei = (paramobj) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/PartWuPingTuiFei",
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj
    })
}
/**添加全部商品退费 */
export const allPartWuPingTuiFei = (data = { stuID, payStyleID, yejirenID, processingTime, tuiallspmoney, shuoming, qiandanIDs }) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/allPartWuPingTuiFei",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**添加选择课程退费 */
export const Partxuefeioffbufen = (paramobj) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/Partxuefeioffbufen",
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj
    })
}
/**添加全部课程退费 */
export const Allxuefeioff = (data = { stuID, payStyleID, yejirenID, processingTime, tuiallkcmoney, shuoming, qiandanIDs }) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/Allxuefeioff",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**添加全部退费 */
export const Alloff = (data = { stuID, payStyleID, yejirenID, processingTime, tuiallmoney, shuoming, qiandanIDs }) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/Alloff",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**添加选择课程退费 */
export const deletetuifei = (data = { liushuiID }) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/deletetuifei",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**退余额 */
export const tuiyueBystu = (data = { stuID, payStyleID, yejirenID, processingTime, tuiyue, shuoming }) => {
    return axios.request({
        url: "/xwcloud-caiwu/caiwu/pxtuifeitable/tuiyueBystu",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
