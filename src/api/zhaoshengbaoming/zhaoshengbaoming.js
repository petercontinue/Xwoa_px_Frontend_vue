import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"



export const xinqianGetPaikeByclassIDList = (data = { classID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/xinqianGetPaikeByclassIDList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**
 * 分页查询课程信息
 * @param {*} param0 
 */
export const getAllKechengPages = ({ size, isShow, current, campusName, subjectID, kechengName, jifeiStyleID, buxiStyleName, classTimeStyleName }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getAllKechengPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, isShow, current, campusName, subjectID, kechengName, jifeiStyleID, buxiStyleName, classTimeStyleName
        }
    })
}
/**
 * 查询所有的科目信息
 * @param {*} param0 
 */
export const GetAllSubjectList = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllSubjectList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询所有补习方式
 * @param {*} param0 
 */
export const GetAllBuxistyleList = ({ }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllBuxistyleList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**
 * 查询所有课程时长信息
 * @param {*} param0 
 */
export const GetAllClassTimeStyleList = ({ }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllClassTimeStyleList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**
 * 根据校区获取科目信息
 * @param {*} param0 
 */
export const GetAllSubjectListBycampusID = ({ campusID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllSubjectListBycampusID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID
        }
    })
}
/**
 * 添加保存课程信息
 * @param {*} param0 
 */
export const AddKechengInfo = ({ kechengName, subjectID, buxiStyleID, is1v1KC, classTimeStyleID, kechengOriginalPrice,
    kechengprice, keshiNum, buyZonjia, byMonthOrDay, isShow, ZSid, jifeiStyleID, campusID, qiyeID, bgColor, perdaysqj, perkeshiqj, qingjiaTimes, iskoukeshi, kechengImg, kechengbeizhu, showInApp,
    kechengcontent
}) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddKechengInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            kechengName, subjectID, buxiStyleID, is1v1KC, classTimeStyleID, kechengOriginalPrice,
            kechengprice, keshiNum, buyZonjia, byMonthOrDay, isShow, ZSid, jifeiStyleID, campusID, qiyeID, bgColor, perdaysqj, perkeshiqj, qingjiaTimes,
            iskoukeshi, kechengImg, kechengbeizhu, kechengcontent, showInApp
        }
    })
}
/**
 * 删除课程信息
 * @param {*} param0 
 */
export const DeleteKechengInfo = ({ ids }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteKechengInfo",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            ids
        }
    })
}
/**
 * 修改课程状态
 * @param {*} param0 
 */
export const UpdateKechengState = ({ Id, state }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateKechengState",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            Id, state
        }
    })
}
/**
 * 分页查询科目信息
 * @param {*} param0 
 */
export const getAllSubjectPages = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getAllSubjectPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 添加保存科目信息
 * @param {*} param0 
 */
export const AddSubjectInfo = ({ subjectName, campusID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddSubjectInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            subjectName, campusID
        }
    })
}
/**
 * 修改科目信息
 * @param {*} param0 
 */
export const UpdateSubJectInfo = ({ id, subjectName, campusID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateSubJectInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, subjectName, campusID
        }
    })
}
/**
 * 删除科目信息
 * @param {*} param0 
 */
export const DeleteSubjectbyId = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteSubjectbyId",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            Id
        }
    })
}
/**
 * 查询课程所有的课程内容信息
 * @param {*} param0 
 */
export const GetAllKechengContent = ({ size, current, kechengID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllKechengContent",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, kechengID
        }
    })
}
/**
 * 批量保存课程内容信息
 * @param {*} param0 
 */
export const PiliangAddKechengContent = ({ kechengcontentList, kechengID }) => {
    const form = { kechengcontentList: kechengcontentList, kechengID: kechengID }
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/PiliangAddKechengContent",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: form,
    })
}
/**
 * 删除课程内容信息
 * @param {*} param0 
 */
export const DeleteKechengContent = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteKechengContent",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            Id
        }
    })
}
/**
 * 添加一次课程内容信息
 * @param {*} param0 
 */
export const addyiciKechengContent = ({ kechengID, contentPaixu, kechengContent }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/addyiciKechengContent",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            kechengID, contentPaixu, kechengContent
        }
    })
}
/**
 * 修改课程内容信息
 * @param {*} param0 
 */
export const UpdateKechengContent = ({ id, kechengContent, contentPaixu }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateKechengContent",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, kechengContent, contentPaixu
        }
    })
}
/**
 * 分页查询新签报名优惠政策
 * @param {*} param0 
 */
export const GetAllYouhuizhengcePages = ({ size, current, type, yhType }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllYouhuizhengcePages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, type, yhType
        }
    })
}
/**
 * 新增保存优惠政策
 * @param {*} param0 
 */
export const AddYouhuizhengCe = ({ youhuiType, xianzhijine, youhui, startDateTime, endDatetime, campusID, stuGradeIDs, useTimes }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddYouhuizhengCe",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            youhuiType, xianzhijine, youhui, startDateTime, endDatetime, campusID, stuGradeIDs, useTimes
        }
    })
}
/**
 * 删除优惠政策
 * @param {*} param0 
 */
export const DeleteYouHuizhengce = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteYouHuizhengce",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            Id
        }
    })
}
/**
 * 查询优惠政策详情
 * @param {*} param0 
 */
export const GetYouhuizhengceInfos = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetYouhuizhengceInfos",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            Id
        }
    })
}
/**
 * 修改报名优惠政策
 * @param {*} param0 
 */
export const UpdateYouhuiZhengce = ({ id, youhuiType, xianzhijine, youhui, startDateTime, endDatetime, campusID, qiyeID, stuGradeIDs, useTimes }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateYouhuiZhengce",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, youhuiType, xianzhijine, youhui, startDateTime, endDatetime, campusID, qiyeID, stuGradeIDs, useTimes
        }
    })
}
/**
 * 分页查询新签信息
 * @param {*} param0 
 */
export const getAllQianDanInfoPages = (data = { size, current, campusID, zidingyiStuID, stuName, stuGradeID, jinbanStaffName, Sqiandandate, Eqiandandate, yejistaffname, menuID, isweikuan }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getAllQianDanInfoPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 删除签单
 * @param {*} param0 
 */
export const DeleteQianDanAndStu = ({ qiandanID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteQianDanAndStu",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            qiandanID
        }
    })
}
/**
 * 查询所有学生的来源途径
 * @param {*} param0 
 */
export const GetAllTelFromList = ({ }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllTelFromList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**
 * 查询所有报名附加字段信息
 * @param {*} param0 
 */
export const GetAllZidingyiParams = ({ }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllZidingyiParams",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**
 * 根据年级查询优惠政策
 * @param {*} param0 
 */
export const GetAllStuGradeYoouhuizhengce = (paramobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllStuGradeYoouhuizhengce",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 查询所有的支付方式
 * @param {*} param0 
 */
export const GetAllPayMoneyStyleList = ({ }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/StaffManagement/GetAllPxPayMoneyStyleList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**
 * 根据校区ID计费方式查询课程信息
 * @param {*} param0 
 */
export const GetAllKechengBycampusID = ({ campusID, jifeiStyleID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllKechengBycampusID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID, jifeiStyleID
        }
    })
}
/**
 * 根据校区查询所有非一对一班级
 * @param {*} param0 
 */
export const GetAllClassByCampusID = ({ campusID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllClassByCampusID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID
        }
    })
}
/**
 * 查询签单其他费用信息
 */
export const GetQiandanOtherMoneyList = ({ }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanOtherMoneyList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
        }
    })
}
/**
 * 根据校区ID查询所有物品信息
 * @param {*} param0 
 */
export const GetAllWupingList = ({ campusID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllWupingList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID
        }
    })
}
/**
 * 根据课程ID查询课程信息
 * @param {*} param0 
 */
export const getKechengbykechengID = ({ kechengID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getKechengbykechengID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            kechengID
        }
    })
}
/**
 * 保存新签
 * @param {*} param0 
 */
export const AddNewStuAndQianDan = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddNewStuAndQianDan",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: data,
    })
}
/**
 * 查询签单详情
 * @param {*} param0 
 */
export const GetQiandanInfo = ({ qiandanID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanInfo",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            qiandanID
        }
    })
}
/**
 * 根据签单id查询签单业绩人信息
 * @param {*} param0 
 */
export const GetQiandanStaffInfo = ({ qiandanID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanStaffInfo",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            qiandanID
        }
    })
}
/**
 * 根据签单ID查询签单支付方式及支付金额
 * @param {*} param0 
 */
export const GetQiandanPayMoneyList = ({ qiandanID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanPayMoneyList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            qiandanID
        }
    })
}
/**
 * 查询签单对应的购买课程信息
 * @param {*} param0 
 */
export const GetQiandanBuyKechengList = ({ qiandanID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanBuyKechengList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            qiandanID
        }
    })
}
/**
 * 查询签单对应的购买物品信息
 * @param {*} param0 
 */
export const GetqiandanSuppliesList = ({ qiandanID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetqiandanSuppliesList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            qiandanID
        }
    })
}
/**
 * 查询签单对应杂费信息
 * @param {*} param0 
 */
export const GetQiandanOtherMoneyListbyqdID = ({ qiandanID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanOtherMoneyListbyqiandan",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            qiandanID
        }
    })
}

/**修改费用说明 */
export const updateqdbeizhu = (paramobj = { id, beizhu }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/updateqdbeizhu",
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        params: paramobj
    })
}

/**
 * 保存修改签单信息
 * @param {*} param0 
 */
export const UpdateStuQianDan = ({ qiandanid, buxikechengMoney, beizhu, bxKcData, stuName, stuSex, campusID, stuGradeID, buxiStateID, parentsTel, qiandanstaffinfo, paymoneystyle, isZhuanIntroduce,
    qiandandate, telFromID, oldSname, oldTname, shuxingValue, numberID, stuBrithday, dingjin, daijinquan, removedKCstr, wpData, zidingyiStuNO, wpPrice, zfData, zfAmount, selectYouhui, removeWPstr, removeZFstr }) => {
    const form = {
        qiandanid: qiandanid, buxikechengMoney: buxikechengMoney, beizhu: beizhu, bxKcData: bxKcData, stuName: stuName, stuSex: stuSex, campusID: campusID, stuGradeID: stuGradeID, buxiStateID: buxiStateID, parentsTel: parentsTel, qiandanstaffinfo: qiandanstaffinfo, paymoneystyle: paymoneystyle, isZhuanIntroduce: isZhuanIntroduce,
        qiandandate: qiandandate, telFromID: telFromID, oldSname: oldSname, oldTname: oldTname, shuxingValue: shuxingValue, numberID: numberID, stuBrithday: stuBrithday, dingjin: dingjin, daijinquan: daijinquan, removedKCstr: removedKCstr, wpData: wpData, zidingyiStuNO: zidingyiStuNO, wpPrice: wpPrice,
        zfData: zfData, zfAmount: zfAmount, selectYouhui: selectYouhui, removeWPstr: removeWPstr, removeZFstr: removeZFstr
    }
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateStuQianDan",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: form,
    })
}
/**
 * 查询续费签单信息
 * @param {*} param0 
 */
export const getAllXufeiQianDanInfoPages = (data = { size, current, campusID, zidingyiStuID, stuName, stuGradeID, jinbanStaffName, Sqiandandate, Eqiandandate, yejistaffname, menuID, isweikuan }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getAllXufeiQianDanInfoPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 分页查询余额信息
 * @param {*} param0 
 */
export const GetStuYuePages = ({ size, current, campusID, stuName, stuGradeID, zidingyiStuID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetStuYuePages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, campusID, stuName, stuGradeID, zidingyiStuID
        }
    })
}
/**
 * 分页查询代金券信息
 * @param {*} param0 
 */
export const GetAllDaijinquanLiushuiPages = ({ size, current, campusID, zidingyiStuID, stuName, stuGradeID, jinbanStaffName }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllDaijinquanLiushuiPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, campusID, zidingyiStuID, stuName, stuGradeID, jinbanStaffName
        }
    })
}
/**
 * 分页查询签单商品流水信息
 * @param {*} param0 
 */
export const GetQiandanSuppliesPages = ({ size, current, campusID, zidingyiStuID, stuName, stuGradeID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanSuppliesPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, campusID, zidingyiStuID, stuName, stuGradeID
        }
    })
}
/**
 * 分页查询签单其他商品信息
 * @param {*} param0 
 */
export const GetQiandanOtherMoneyPages = ({ size, current, campusID, zidingyiStuID, stuName, stuGradeID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanOtherMoneyPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, campusID, zidingyiStuID, stuName, stuGradeID
        }
    })
}
/**
 * 查询所有签单信息
 * @param {*} param0 
 */
export const getAllQianDanInfoHetongPages = ({ size, current, campusID, zidingyiStuID, stuName, stuGradeID, jinbanStaffName, Sqiandandate, Eqiandandate, yejistaffname }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getAllQianDanInfoHetongPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, campusID, zidingyiStuID, stuName, stuGradeID, jinbanStaffName, Sqiandandate, Eqiandandate, yejistaffname
        }
    })
}
/**
 * 查询所有续费可选择学生信息
 * @param {*} param0 
 */
export const GetAllxufeistuList = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllxufeistuList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 根据学生ID查询购买的课程信息
 * @param {*} param0 
 */
export const GetAllStukechengInfoList = ({ stuID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllStukechengInfoList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            stuID
        }
    })
}
/**
 * 保存续费信息
 * @param {*} param0 
 */
export const AddXufeiQiandan = (paramobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddXufeiQiandan",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj,
    })
}
/**
 * 分页查询优惠政策信息
 * @param {*} param0 
 */
export const GetczyouhuizhengcePages = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetczyouhuizhengcePages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current
        }
    })
}
/**
 * 添加保存充值优惠政策
 * @param {*} param0 
 */
export const AddChongzhiyouhuizhengce = ({ zongmoney, huodongmoney, sdate, edate }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddChongzhiyouhuizhengce",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            zongmoney, huodongmoney, sdate, edate
        }
    })
}
/**
 * 删除充值优惠政策
 * @param {*} param0 
 */
export const DeleteCzhuodong = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteCzhuodong",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            Id
        }
    })
}
/**
 * 修改充值优惠政策信息
 * @param {*} param0 
 */
export const UpdateChongzhiyouhuizhengce = ({ id, zongmoney, huodongmoney, sdate, edate }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateChongzhiyouhuizhengce",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, zongmoney, huodongmoney, sdate, edate
        }
    })
}
/**
 * 添加新生充值信息
 * @param {*} param0 
 */
export const AddNewStuChongzhi = (paramsobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddNewStuChongzhi",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramsobj,
    })
}
/**
 * 根据充值日期查询可用的充值优惠政策
 * @param {*} param0 
 */
export const Getkeyongchongzhihuodong = ({ operateTime }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/Getkeyongchongzhihuodong",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            operateTime
        }
    })
}
/**
 * 新增保存老生充值
 * @param {*} param0 
 */
export const AddOldStuChongzhi = (paramobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddOldStuChongzhi",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj,
    })
}
/**
 * 分页查询充值流水信息
 * @param {*} param0 
 */
export const GetChongzhiLiushuiPages = ({ size, current, campusID, stuName, stugradeID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetChongzhiLiushuiPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, campusID, stuName, stugradeID
        }
    })
}
/**
 * 分页查询充值详情信息
 * @param {*} param0 
 */
export const GetUserChongzhixiangqingPages = ({ size, current, stuID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetUserChongzhixiangqingPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, stuID
        }
    })
}
/**
 * 分页查询进销存销售流水
 * @param {*} param0 
 */
export const getXiaoshouLiushuiPages = ({ size, current, campusID, OrderNo, SuppliesName, staffName }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/getXiaoshouLiushuiPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, campusID, OrderNo, SuppliesName, staffName
        }
    })
}
/**
 * 查询所有商品信息
 * @param {*} param0 
 */
export const GetTeachingSuppliesByTiaoma = ({ tiaoma }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/GetTeachingSuppliesByTiaoma",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            tiaoma
        }
    })
}
/**
 * 分页查询商品信息
 * @param {*} param0 
 */
export const GetTeachingSuppliesPages = ({ size, current, campusID, name, typeName, specs, changpinTiaoma }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/GetTeachingSuppliesPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, campusID, name, typeName, specs, changpinTiaoma
        }
    })
}
/**
 * 分页查询
 * @param {*} param0 
 */
export const GetTeachingSuppliesbuyPages = (paramobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/GetTeachingSuppliesbuyPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 保存商品收银台信息
 * @param {*} param0 
 */
export const SaveSaleWupingInfo = (paramobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/SaveSaleWupingInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj,
    })
}
/**
 * 分页查询当前天的收银台收银记录
 * @param {*} param0 
 */
export const GetTodayXiaoshouliushui = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/GetTodayXiaoshouliushui",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current
        }
    })
}
/**
 * 删除商品信息
 * @param {*} param0 
 */
export const DeleteTeachingSuppliesType = ({ ID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/DeleteTeachingSuppliesType",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            ID
        }
    })
}
//修改物品的启用状态
export const UpdateWupingState = ({ ID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/UpdateWupingState",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            ID
        }
    })
}
/**
 * 查询所有商品类别信息
 * @param {*} param0 
 */
export const GetAllTypeByPages = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/GetAllTypeByPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current
        }
    })
}
/**
 * 添加物品信息类别
 * @param {*} param0 
 */
export const AddTeachingSuppliesType = ({ typeName }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/AddTeachingSuppliesType",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            typeName
        }
    })
}
/**
 * 修改商品类别信息
 * @param {*} param0 
 */
export const UpdateTeachingSuppliesType = ({ id, typeName }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/UpdateTeachingSuppliesType",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, typeName
        }
    })
}
/**
 * 查询所有物品类别信息（下拉选择）
 * @param {*} param0 
 */
export const GetAllTeachingSuppliesTypeList = ({ }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/GetAllTeachingSuppliesTypeList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**
 * 保存入库信息
 * @param {*} param0 
 */
export const Enter_supplies = ({ campusID, id, acceptStaffId, typeId, name, specs, stockNum, stockUnit, addReason, addDate, buyPrice, salePrice, wupintiaoma }) => {
    const form = {
        campusID: campusID, id: id, acceptStaffId: acceptStaffId, typeId: typeId, name: name, specs: specs, stockNum: stockNum, stockUnit: stockUnit,
        addReason: addReason, addDate: addDate, buyPrice: buyPrice, salePrice: salePrice, wupintiaoma: wupintiaoma
    };
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/Enter_supplies",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: form,
    })
}
/**
 * 删除入库商品信息
 * @param {*} param0 
 */
export const DeleteTeachingSupplies = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/DeleteTeachingSupplies",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            Id
        }
    })
}
/**
 * 保存物品出库信息
 * @param {*} param0 
 */
export const Out_supplie = ({ id, outNum, outReason, lingyongStaffId, jibanStaffId, outDate }) => {
    const form = {
        id: id, outNum: outNum, outReason: outReason, lingyongStaffId: lingyongStaffId, jibanStaffId: jibanStaffId, outDate: outDate
    };
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/Out_supplie",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: form,
    })
}
/**
 * 教学用品出库记录
 * @param {*} param0 
 */
export const outTeachingSuppliesJilu = ({ size, current, suppliesID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/outTeachingSuppliesJilu",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, suppliesID
        }
    })
}
/**
 * 教学用品入库记录
 * @param {*} param0 
 */
export const EnterteachingSupplieJilu = ({ size, current, suppliesID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/EnterteachingSupplieJilu",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, suppliesID
        }
    })
}
/**
 * 添加/修改采购申请
 * @param {*} param0 
 */
export const AddTeachingSuppliesInfo = ({ buyID, campusID, cgstaffName, typeId, name, specs, buyNum, stockUnit, reason, addDate }) => {
    const form = {
        buyID: buyID, campusID: campusID, cgstaffName: cgstaffName, typeId: typeId, name: name, specs: specs, buyNum: buyNum, stockUnit: stockUnit, reason: reason, addDate: addDate
    };
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/AddTeachingSuppliesInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: form,
    })
}
/**
 * 删除采购申请审批
 * @param {*} param0 
 */
export const delcaigou = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/delcaigou",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            Id
        }
    })
}
/**
 * 采购申请审核
 * @param {*} param0 
 */
export const caigoushenhe = ({ Id, type }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/JinXiaoCun/caigoushenhe",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            Id, type
        }
    })
}
/**
 * 通过课程ID查询课程信息
 * @param {*} param0 
 */
export const GetKechengInfoById = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetKechengInfoById",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            Id
        }
    })
}
/**
 * 修改课程信息
 * @param {*} param0 
 */
export const UpdateKechengInfo = (data = {
    id, kechengName, subjectID, buxiStyleID, is1v1KC, classTimeStyleID, kechengOriginalPrice, kechengprice, keshiNum, buyZonjia,
    byMonthOrDay, isShow, ZSid, jifeiStyleID, campusID, qiyeID, bgColor, perdaysqj, perkeshiqj, qingjiaTimes, iskoukeshi, showInApp
}) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateKechengInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**
 * 合同管理查询签单详细信息
 * @param {*} param0 
 */
export const GetQiandanInfoByQiandanID_ht = ({ qiandanID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanInfoByQiandanID_ht",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            qiandanID
        }
    })
}
/**
 * 保存签单合同信息
 * @param {*} param0 
 */
export const SaveQiandanHetong = ({ qiandanID, imgurl }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/SaveQiandanHetong",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            qiandanID, imgurl
        }
    })
}

/**删除合同 */
export const Deletehetong = ({ qiandanID, newhetong }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/Deletehetong",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            qiandanID, newhetong
        }
    })
}

/**
 * 删除七牛云图片
 * @param {*} param0 
 */
export const DeleteImgs = ({ qiandanID, key }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteImgs",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            qiandanID, key
        }
    })
}
/**
 * 查询签单审批信息
 * @param {*} data 
 * @returns 
 */
export const GetAllQiandanshenpiInfoPages = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllQiandanshenpiInfoPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 删除签单审批信息
 * @param {*} data 
 * @returns 
 */
export const DeleteQiandanshengPiInfo = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteQiandanshengPiInfo",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 通过签单审核
 * @param {*} data 
 * @returns 
 */
export const PassQiandanShenpi = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/PassQiandanShenpi",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 驳回签单审批信息
 * @param {*} data 
 * @returns 
 */
export const qiandanshenpibohui = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/qiandanshenpibohui",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 判断当前学生在当前系统是否已存在
 * @param {*} data 
 * @returns 
 */
export const panduanStuName = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/panduanStuName",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 查询意向学员详细信息
 * @param {*} data 
 * @returns 
 */
export const GetYxStuInfo = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetYxStuInfo",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**补交尾款 */
export const setweikuan = (paramobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/setweikuan",
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj
    })
}
/**获取带校区的在职老师 */
export const getCampusTostaff = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getCampusTostaff",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**获取支付方式 */
export const getPayStyle = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getPayStyle",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}

/**补交尾款获取签单信息 */
export const getqiandanMessage = (data = { qdID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getqiandanMessage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
/**
 * 分页查询小程序待支付签单信息
 * @param {*} paramobj 
 * @returns 
 */
export const GetAllDaizhifuqiandanPages = (paramobj) => {
    return axios.request({
        url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllDaizhifuqiandanPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 上传文件
 * @param {*} paramobj 
 * @returns 
 */
export const uploadFileToAliOss = (paramobj) => {
    return axios.request({
        url: "/xwcloud-sys/aliyun/uploadFileToAliOss",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'multipart/form-data'
        },
        params: paramobj
    })
}
