import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'




/** 分页获取提现审核 */
export const gettixianshenhePage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/gettixianshenhePage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**审核提现 */
export const PassOrNoshenhetixian = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/PassOrNoshenhetixian",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}


/**删除微商城用户 */
export const delwscUser = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/delwscUser",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**冻结或解冻商城用户 */
export const dongjieOrNotwscUser = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/dongjieOrNotwscUser",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**成为推客 */
export const buytuke = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/buytuke",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**修改推客等级 */
export const edittuikelevel = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/edittuikelevel",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        params: data
    })
}
/**获取全部推客级别 */
export const getalltuikelv = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getalltuikelv",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

export const getactivityPages = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/getactivityPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

export const deleteZhuti = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/deleteZhuti",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

export const zhanshiIsShow = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/zhanshiIsShow",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

export const addOreditZhuti = (paramobj) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/addOreditZhuti",
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj
    })
}

export const getAllgoodType = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wmallcontroller/getAllgoodType",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}


export const getWscOrderPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getWscOrderPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const orderFahuo = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/orderFahuo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const orderWancheng = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/orderWancheng",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const getOrderGoodsDetailByOrderNumberPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getOrderGoodsDetailByOrderNumberPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const getShoppingCatPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getShoppingCatPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const getTuihuokuanPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getTuihuokuanPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 同意退款
 * @param {*} data
 * @returns
 */
export const agreeTuikuan = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/agreeTuikuan",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const refuseTuikuan = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/refuseTuikuan",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const rechargeOrderTuikuan = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/rechargeOrderTuikuan",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
/**
 * 分页查询订单评价信息
 * @param {*} data
 */
export const getorderpingjiaPages = (data = { size, current, orderNumber, pingjiaType, pingjiaren, Sdate, Edate, searchType }) => {
    console.log(data);
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getorderpingjiaPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 分页查询商城用户信息
 * @param {*} data
 */
export const getWscUserPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getWscUserPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询商城销售流水信息
 * @param {*} data
 */
export const getSqleLiushuiPages = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getSqleLiushuiPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 分页查询返佣记录信息
 * @param {*} data
 */
export const GetFangyongJiluPages = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/GetFangyongJiluPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**购买成为推客信息 */
export const GetbuytuikeinfoPages = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/GetbuytuikeinfoPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**查看团队 */
export const gettkteamPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/gettkteamPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**返佣排名 */
export const getfanyongpaiming = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getfanyongpaiming",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}



/**
 * 分页查询佣金比率
 * @param {*} data
 */
export const getWscYongjinBiliPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getWscYongjinBiliPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 修改佣金比率
 * @param {*} data
 */
export const updateWscYongjinBiliByID = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/updateWscYongjinBiliByID",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 分页查询微商城商品信息
 * @param {*} data
 */
export const getWscGoodsPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getWscGoodsPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询商品类别信息
 */
export const GetGoodstypeList = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/GetGoodstypeList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询所有活动信息
 * @param {*} data
 */
export const GetAllHuodongList = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/GetAllHuodongList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 新增保存商品信息
 * @param {*} data
 */
export const addWscGoods = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/addWscGoods",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询商品属性组合
 * @param {*} data
 */
export const GetGoodsShuxingList = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/GetGoodsShuxingList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 添加规格
 * @param {*} data
 * @returns
 */
export const addWscGoodsGuige = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/addWscGoodsGuige",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询所有规格信息（下拉框选择）
 * @param {*} data
 * @returns
 */
export const GetAllGuigeDataList = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/GetAllGuigeDataList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 添加商品属性信息
 * @param {*} data
 * @returns
 */
export const addGoodsAttributeList = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/addGoodsAttributeList",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 删除商品属性
 * @param {*} data
 * @returns
 */
export const deleteWscGoodsGuigeByIDs = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/deleteWscGoodsGuigeByIDs",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 删除商品规格属性
 * @param {*} data
 * @returns
 */
export const deleteWscGoodsAttributeListByIDs = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/deleteWscGoodsAttributeListByIDs",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询商品属性组合信息
 * @param {*} data
 * @returns
 */
export const GetAllShuxingValueList = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/GetAllShuxingValueList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 添加商品属性组合价格
 */
export const addWscGoodsAttrPriceList = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/addWscGoodsAttrPriceList",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询商品属性组合的价格信息
 * @param {*} data
 * @returns
 */
export const GetShuxingzuhePrice = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/GetShuxingzuhePrice",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 根据商品ID删除商品信息
 * @param {*} data
 * @returns
 */
export const deleteWscGoodsByIDs = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/deleteWscGoodsByIDs",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询微商城商品类别信息
 * @param {*} data
 * @returns
 */
export const getWscGoodsTypePage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getWscGoodsTypePage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 添加商城商品类别信息
 * @param {*} data
 * @returns
 */
export const addWscGoodsType = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/addWscGoodsType",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 修改商城商品类别信息
 * @param {*} data
 */
export const updateWscGoodsTypeByID = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/updateWscGoodsTypeByID",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 删除商城商品类别ID
 * @param {*} data
 * @returns
 */
export const deleteWscGoodsTypeByIDs = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/deleteWscGoodsTypeByIDs",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 修改商城商品的上架状态
 * @param {*} data
 * @returns
 */
export const UpdateWscGoodsStateByID = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/UpdateWscGoodsStateByID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询商品详情
 * @param {*} data
 * @returns
 */
export const GetGoodsInfoDetail = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/GetGoodsInfoDetail",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 修改商品信息
 * @param {*} data
 * @returns
 */
export const updateWscGoodsByID = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/updateWscGoodsByID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 分页查询招学秀信息
 * @param {*} data
 * @returns
 */
export const zhaoxuexiu = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/zhaoxuexiu/GetAllMubanPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询活动名称
 * @param {*} data
 * @returns
 */
export const GetAllHuodongTypeList = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/zhaoxuexiu/GetAllHuodongTypeList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询孙已发布的招学秀信息
 * @param {*} data
 * @returns
 */
export const GetAllMyMobanFabuPages = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/zhaoxuexiu/GetAllMyMobanFabuPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询企业的机构信息
 * @param {*} data
 * @returns
 */
export const GetjigouInfoByqiyeID = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/zhaoxuexiu/GetjigouInfoByqiyeID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
/**
 * 保存模板机构信息
 * @param {*} data
 * @returns
 */
export const SavejigouInfo = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/zhaoxuexiu/SavejigouInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
/**
 * 分页查询充值活动的支付记录
 * @param {*} data
 * @returns
 */
export const GetWechatChongzhiPages = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdChongzhi/GetWechatChongzhiPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 分页查询投票活动信息
 * @param {*} data
 * @returns
 */
export const getWhdToupiaoHuodongPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/getWhdToupiaoHuodongPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 添加投票活动信息
 * @param {*} data
 * @returns
 */
export const addWhdToupiaoHuodong = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/addWhdToupiaoHuodong",
        method: "post",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 删除投票活动信息
 * @param {*} data
 * @returns
 */
export const deleteWhdToupiaoHuodongByIDs = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/deleteWhdToupiaoHuodongByIDs",
        method: "delete",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 修改投票信息
 * @param {*} data
 * @returns
 */
export const updateWhdToupiaoHuodongByID = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/updateWhdToupiaoHuodongByID",
        method: "post",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 修改投票活动的上架状态
 * @param {*} data
 * @returns
 */
export const UpdateToupiaohuodongState = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/UpdateToupiaohuodongState",
        method: "get",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 分页查询投票参赛学员信息
 * @param {*} data
 * @returns
 */
export const getWhdToupiaoCansaiStuPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/getWhdToupiaoCansaiStuPage",
        method: "get",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 添加保存投票参赛学员
 * @param {*} data
 * @returns
 */
export const addWhdToupiaoCansaiStu = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/addWhdToupiaoCansaiStu",
        method: "post",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 删除参赛学员信息
 * @param {*} data
 * @returns
 */
export const deleteWhdToupiaoCansaiStuByIDs = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/deleteWhdToupiaoCansaiStuByIDs/" + data,
        method: "delete",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
    })
}
/**
 * 查询活动的投票明细
 * @param {*} data
 * @returns
 */
export const getWhdToupiaoRecordPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdToupiao/getWhdToupiaoRecordPage",
        method: "get",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}

/**
 * 查询微信商城活动配置
 * @param {*} data 
 * @returns 
 */
export const getWscHuodongValPage = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getWscHuodongValPage",
        method: "get",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询平台所有的营销活动
 * @param {*} data 
 * @returns 
 */
export const GetAllShowHuodongList = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/GetAllShowHuodongList",
        method: "get",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 添加保存活动信息
 * @param {*} data 
 * @returns 
 */
export const addWscHuodongVal = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/addWscHuodongVal",
        method: "post",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 删除已添加的活动信息
 * @param {*} data 
 * @returns 
 */
export const deleteWscHuodongValByIDs = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/deleteWscHuodongValByIDs/" + data,
        method: "delete",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    })
}
/**
 * 修改微商城活动信息
 * @param {*} data 
 * @returns 
 */
export const updateWscHuodongValByID = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/updateWscHuodongValByID",
        method: "post",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询对应的模板信息
 * @param {*} data 
 * @returns 
 */
export const GetH5MobanData = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/zhaoxuexiu/GetH5MobanData",
        method: "get",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 根据模板ID查询模板信息
 * @param {*} data 
 * @returns 
 */
export const GetMobanInfoDetail = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/zhaoxuexiu/GetMobanInfoDetail",
        method: "get",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询机构信息
 * @param {*} data 
 * @returns 
 */
export const GetJigoujianjieInfo = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/zhaoxuexiu/GetJigoujianjieInfo",
        method: "get",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询招学秀模板音乐信息
 * @param {*} data 
 * @returns 
 */
export const getMobanMusicList = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/zhaoxuexiu/getMobanMusicList",
        method: "get",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}

/**
 * 保存招学秀信息
 * @param {*} data 
 * @returns 
 */
export const SavezhaoxuexiuHuodongInfo = (data) => {
    return axios.request({
        url: "/xwcloud-wsc/zhaoxuexiu/SavezhaoxuexiuHuodongInfo",
        method: "post",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        params: data
    })
}
/**分页获取微活动：幸运抽奖 */
export const getWhdChoujiangHuodongPage = ({ size, current, choujianghuodongname, starttime, endtime, addtime, adduser, isup }) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdChoujiang/getWhdChoujiangHuodongPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, choujianghuodongname, starttime, endtime, addtime, adduser, isup
        }
    })
}
/**上架下架 */
export const updateUpStyle = (paramobj) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdChoujiang/updateUpStyle",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**添加抽奖 */
export const addWhdChoujiangHuodong = (paramobj) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdChoujiang/addWhdChoujiangHuodong",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**修改抽奖 */
export const updateWhdChoujiangHuodongByID = (paramobj) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdChoujiang/updateWhdChoujiangHuodongByID",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**删除抽奖活动 */
export const deleteWhdChoujiangHuodongByID = ({ id }) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdChoujiang/deleteWhdChoujiangHuodongByID",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: id
    })
}
/**奖品设置 */
export const getWhdChoujiangJiangpinPage = ({ size, current, huodongID }) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdChoujiang/getWhdChoujiangJiangpinPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, huodongID
        }
    })
}
export const getwscHuodongInfoByID = (paramobj = { huodongID }) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wsc/getwscHuodongInfoByID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**奖品流水 */
export const getWhdChoujiangRecordPage = (paramobj = { size, current, huodongID, huodongName, userName, type }) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdChoujiang/getWhdChoujiangRecordPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**奖品发放 */
export const fafangjiangpin = (paramobj = { ids, beizhu }) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/whdChoujiang/fafangjiangpin",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        params: paramobj
    })
}
/**获取商品类别 */
export const getGoodsTyleList = (paramobj) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wmallcontroller/getGoodsTyleList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**分页获取优惠券 */
export const GetCouponsPages = (paramobj = { size, current, couponsName, giveType, startDate, endDate }) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wmallcontroller/GetCouponsPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
//添加修改优惠券
export const AddOreditCoupons = (paramobj = { id, couponsName, Money, manMoney, GoodTypeID, stratDate, endDate, giveType }) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wmallcontroller/AddOreditCoupons",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        params: paramobj
    })
}
/**删除优惠券 */
export const delCouponsByID = (paramobj = { id }) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wmallcontroller/delCouponsByID",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/** 分页获取优惠券记录*/
export const Getuseryouhuiquan = (paramobj = { size, current, type }) => {
    return axios.request({
        url: "/xwcloud-wsc/wsc/wmallcontroller/Getuseryouhuiquan",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getAllWscUserDongtaiPages = (paramobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getAllWscUserDongtaiPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const GetAlldianzanPages = (paramobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAlldianzanPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const GetAllPingLunPages = (paramobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllPingLunPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const DeleteDongtaiInfo = (paramobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteDongtaiInfo",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}