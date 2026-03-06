import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"


/**获取修改的推客等级信息 */
export const geteditlevelbyID = (paramobj) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/geteditlevelbyID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
//保存推客等级
export const savetklevel = (paramobj) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/savetklevel",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
//删除推客等级
export const deltklevel = (paramobj) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/deltklevel",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
//设置推客等级启用不启用
export const settklevel = (paramobj) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/settklevel",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
//分页获取推客等级
export const gettuikelevelPage = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/gettuikelevelPage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current
        }
    })
}


/**获取请假、撤销请假、撤销约课的时间限制值 */
export const getjigouqjandykTimes = ({ }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getjigouqjandykTimes",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**保存请假、撤销请假、撤销约课的时间限制值 type:64请假  65：约课 */
export const editTimexianzhi = ({ type, times }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/editTimexianzhi",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            type, times
        }
    })
}

/**
 * 修改系统设置的值
 * @param {*} param0 
 */
export const UpdateSysParamValue = ({ id, value }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/UpdateSysParamValue",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, value
        }
    })
}
/**
 * 分页查询年级信息
 * @param {*} param0 
 */
export const getStuGradePage = ({ size, current, stuGradeName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getStuGradePage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, stuGradeName
        }
    })
}
/**
 * 新增保存年级/年龄段
 * @param {*} param0 
 */
export const addStuGrade = ({ stuGradeName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/addStuGrade",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            stuGradeName
        }
    })
}
/**
 * 修改年级信息
 * @param {*} param0 
 */
export const updateStugrade = ({ id, stuGradeName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/updateStugrade",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, stuGradeName
        }
    })
}
/**
 * 删除年级
 * @param {*} param0 
 */
export const deleteStuGrage = ({ ids }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/deleteStuGrage",
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
 * 分页查询培训方式
 * @param {*} param0 
 */
export const getAllbuxistylePage = ({ size, current, buxiStyleName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getAllbuxistylePage",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, buxiStyleName
        }
    })
}
/**
 * 新增补习方式
 * @param {*} param0 
 */
export const addbuxistyle = ({ buxiStyleName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/addbuxistyle",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            buxiStyleName
        }
    })
}
/**
 * 修改补习方式
 * @param {*} param0 
 */
export const updatebuxistyle = ({ id, buxiStyleName, qiyeID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/updatebuxistyle",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, buxiStyleName, qiyeID
        }
    })
}
/**
 * 删除补习方式
 * @param {*} param0 
 */
export const deletebuxistyle = ({ ids }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/deletebuxistyle",
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
 * 分页查询课程时长信息
 * @param {*} param0 
 */
export const getALlclasstimestyle = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getALlclasstimestyle",
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
 * 添加保存课程时长
 * @param {*} param0 
 */
export const addclasstimestyle = ({ ClassTimeStyleName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/addclasstimestyle",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            ClassTimeStyleName
        }
    })
}
/**
 * 修改课程时长
 * @param {*} param0 
 */
export const updateClasstimestyle = ({ id, classTimeStyleName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/updateClasstimestyle",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, classTimeStyleName
        }
    })
}
/**
 * 删除课程时长
 * @param {*} param0 
 */
export const deleteClasstimeStyle = ({ ids }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/deleteClasstimeStyle",
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
 * 分页查询教室信息
 * @param {*} param0 
 */
export const getPagesClassRoomList = (paramobj = { size, current, campusID, classRoomName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getPagesClassRoomList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 添加教室信息
 * @param {*} param0 
 */
export const addClassRoom = ({ classRoomName, campusID, ischongtu }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/addClassRoom",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            classRoomName, campusID, ischongtu
        }
    })
}
/**
 * 查询教师详情
 * @param {*} param0 
 */
export const GetclassroomInfo = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetclassroomInfo",
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
 * 编辑教室信息
 * @param {*} param0 
 */
export const editClassRoom = ({ id, classRoomName, campusID, ischongtu }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/editClassRoom",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, classRoomName, campusID, ischongtu
        }
    })
}
/**
 * 删除教室信息
 * @param {*} param0 
 */
export const deleteClassRoom = ({ ids }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/deleteClassRoom",
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
 * 查询校区信息
 * @param {*} param0 
 */
export const GetAllCampusInfoPages = ({ size, current, campusName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetAllCampusInfoPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, campusName
        }
    })
}
/**
 * 修改校区公众号设置信息
 * @param {*} param0 
 */
export const EditCampusgongzhonghaoSetting = ({ campusID, AppID, AppSecret }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/EditCampusgongzhonghaoSetting",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID, AppID, AppSecret
        }
    })
}
/**
 * 根据校区ID查询校区信息
 * @param {*} param0 
 */
export const GetCampusInfoByCampusID = ({ CampusID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetCampusInfoByCampusID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            CampusID
        }
    })
}
/**
 * 编辑校区商户号信息
 * @param {*} param0 
 */
export const EditCampusShanghuInfo = ({ campusID, wxShanghuID, wxShanghuKey }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/EditCampusShanghuInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID, wxShanghuID, wxShanghuKey
        }
    })
}
/**
 * 修改校区名称
 * @param {*} param0 
 */
export const updateCampusNameByCampusID = ({ campusID, campusName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/updateCampusNameByCampusID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID, campusName
        }
    })
}
/**
 * 分页查询学员报名附加字段
 * @param {*} param0 
 */
export const GetStuParamtypePages = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetStuParamtypePages",
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
 * 添加保存学员报名附加字段
 * @param {*} param0 
 */
export const AddStuParamTypeInfo = ({ StuParamTypeName, IsBiTian, widthType }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/AddStuParamTypeInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            StuParamTypeName, IsBiTian, widthType
        }
    })
}
/**
 * 删除报名附加字段
 * @param {*} param0 
 */
export const DeleteStuParamType = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/DeleteStuParamType",
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
 * 修改报名附加字段
 * @param {*} param0 
 */
export const UpdateStuparamTypeInfo = ({ id, stuParamTypeName, IsBiTian, widthType, qiyeID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/UpdateStuparamTypeInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, stuParamTypeName, IsBiTian, widthType, qiyeID
        }
    })
}
/**
 * 分页查询招生途径
 * @param {*} param0 
 */
export const GetPagesyxtelfromPages = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetPagesyxtelfromPages",
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
 * 新增招生途径
 * @param {*} param0 
 */
export const Addyxtelfrom = ({ telFromName, beizhu }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/Addyxtelfrom",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            telFromName, beizhu
        }
    })
}
/**
 * 删除招生途径
 * @param {*} param0 
 */
export const Deleteyxtelfrom = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/Deleteyxtelfrom",
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
 * 修改招生途径
 * @param {*} param0 
 */
export const Updateyxtelfrom = ({ id, telFromName, beizhu }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/Updateyxtelfrom",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, telFromName, beizhu
        }
    })
}
/**
 * 查询配置值
 * @param {*} param0 
 */
export const GetSystemParamsById = ({ paramsID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetSystemParamsById",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            paramsID
        }
    })
}
/**
 * 查询三级返佣信息
 * @param {*} paramobj 
 * @returns 
 */
export const GetSanjiFanyongInfo = (paramobj) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetSanjiFanyongInfo",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 分页查询所有意向程度
 * @param {*} param0 
 */
export const GetAllYixiangchengduPages = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetAllYixiangchengduPages",
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
 * 新增保存意向程度
 * @param {*} param0 
 */
export const AddYixiangchengdu = ({ telLevelName, beizhu }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/AddYixiangchengdu",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            telLevelName, beizhu
        }
    })
}
/**
 * 删除意向程度
 * @param {*} param0 
 */
export const DeleteYixiangchengdu = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/DeleteYixiangchengdu",
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
 * 修改意向学员意向程度
 * @param {*} param0 
 */
export const UpdateYixiangchengdu = ({ id, telLevelName, beizhu, addStaffID, addTime, qiyeID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/UpdateYixiangchengdu",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, telLevelName, beizhu, addStaffID, addTime, qiyeID
        }
    })
}
/**
 * 分页加载考试类别
 * @param {*} param0 
 */
export const getKaoshiLeibie = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getKaoshiLeibie",
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
 * 新增保存考试类别
 * @param {*} param0 
 */
export const SaveKaoshileibie = ({ id, testtype }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/SaveKaoshileibie",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, testtype
        }
    })
}

export const GetAllStaffList = ({ }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetAllStaffList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**
 * 分页查询签单其他费用信息
 * @param {*} param0 
 */
export const getAllqiandanotherMoneyPages = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getAllqiandanotherMoneyPages",
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
 * 保存签单其他费用信息
 * @param {*} param0 
 */
export const addqiandanotherMoney = ({ othermoneyname }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/addqiandanotherMoney",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            othermoneyname
        }
    })
}
/**
 * 修改签单信息
 * @param {*} param0 
 */
export const editQiandanOtherMoney = ({ id, othermoneyname, qiyeid }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/editQiandanOtherMoney",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, othermoneyname, qiyeid
        }
    })
}
/**
 * 删除签单其他费用信息
 * @param {*} param0 
 */
export const deleteQiandanOtherMoney = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/deleteQiandanOtherMoney",
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
 * 查询所有支付方式
 * @param {*} param0 
 */
export const getAllPaymoneyStylePages = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getAllPaymoneyStylePages",
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
 * 添加支付方式
 * @param {*} param0 
 */
export const addPayMoneyStyle = ({ moneystyleName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/addPayMoneyStyle",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            moneystyleName
        }
    })
}
/**
 * 修改支付方式
 * @param {*} param0 
 */
export const editPayMoneyStyle = ({ id, moneystyleName, qiyeID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/editPayMoneyStyle",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, moneystyleName, qiyeID
        }
    })
}
/**
 * 删除支付方式
 * @param {*} param0 
 */
export const deletePayMoneyStyle = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/deletePayMoneyStyle",
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
 * 分页查询最低收费标准
 * @param {*} param0 
 */
export const GetAllShoufeibiaozhunPages = ({ buxiStyleName, stuGradeName, size, current }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetAllShoufeibiaozhunPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            buxiStyleName, stuGradeName, size, current
        }
    })
}
/**
 * 添加最低收费标准
 * @param {*} param0 
 */
export const addShoufeiniaozhun = ({ buxiStyleId, stuGradeId, minimumCharge }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/addShoufeiniaozhun",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            buxiStyleId, stuGradeId, minimumCharge
        }
    })
}
/**
 * 查询所有年级
 * @param {*} param0 
 */
export const GetAllStuGradeList = ({ }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetAllStuGradeList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**
 * 查询所有补习方式
 * @param {*} param0 
 */
export const GetAllbuxistyleList = ({ }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetAllbuxistyleList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**
 * 修改收费标准
 * @param {*} param0 
 */
export const updateShoufeibiaozhun = ({ id, buxiStyleId, stuGradeId, MinimumCharge, addTime, addStaffID, qiyeID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/updateShoufeibiaozhun",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, buxiStyleId, stuGradeId, MinimumCharge, addTime, addStaffID, qiyeID
        }
    })
}
/**
 * 查询最低收费标准
 * @param {*} param0 
 */
export const GetShouFeibiaozhunByID = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetShouFeibiaozhunByID",
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
 * 删除最低收费标准
 * @param {*} param0 
 */
export const deleteShoufeibiaozhun = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/deleteShoufeibiaozhun",
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
 * 查询所有流水类别
 * @param {*} param0 
 */
export const getAllShouzhistylePages = ({ size, current, leibie, type }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getAllShouzhistylePages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, leibie, type
        }
    })
}
/**
 * 新增流水类别
 * @param {*} param0 
 */
export const addShouzhiStyle = ({ shouzhiStyle, isshouOrzhichu, beizhu }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/addShouzhiStyle",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            shouzhiStyle, isshouOrzhichu, beizhu
        }
    })
}

export const editShouzhistyle = ({ id, shouzhiStyle, isshouOrzhichu, beizhu }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/editShouzhistyle",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, shouzhiStyle, isshouOrzhichu, beizhu
        }
    })
}



/**
 * 删除收支方式
 * @param {*} param0 
 */
export const deleteShouzhistyle = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/deleteShouzhistyle",
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
 * 查询收支方式详情
 * @param {*} param0 
 */
export const getshouzhistyleById = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getshouzhistyleById",
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
 * 修改推送开关的值
 * @param {*} param0 
 */
export const UpdateTuisongKaiGuan = ({ value, Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/UpdateTuisongKaiGuan",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            value, Id
        }
    })
}
/**
 * 查询微信开关的值
 * @param {*} param0 
 */
export const GetAlltsKaiguangValue = ({ }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetAlltsKaiguangValue",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**
 * 分页查询固定资产信息
 * @param {*} param0 
 */
export const getPagesAssets = ({ size, current, campusID, assetsName, leibieID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/getPagesAssets",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, campusID, assetsName, leibieID
        }
    })
}

export const GetAllAssetsStyleList = ({ }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/GetAllAssetsStyleList",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
    })
}
/**
 * 添加固定资产信息
 * @param {*} param0 
 */
export const addAssetInfo = ({ campusID, assetsName, leibie, guige, num, danwei, addTime, addstaffID, beizhu }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/addAssetInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            campusID, assetsName, leibie, guige, num, danwei, addTime, addstaffID, beizhu
        }
    })
}
/**
 * 修改固定资产信息
 * @param {*} param0 
 */
export const updateAssetInfo = ({ id, campusID, assetsName, leibie, guige, num, danwei, qiyeID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/updateAssetInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, campusID, assetsName, leibie, guige, num, danwei, qiyeID
        }
    })
}
/**
 * 删除固定资产信息
 * @param {*} param0 
 */
export const deleteAssetInfo = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/deleteAssetInfo",
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
 * 分页查询固定资产类别信息
 * @param {*} param0 
 */
export const getAllAssetStyle = ({ size, current }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/getAllAssetStyle",
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
 * 添加保存固定资产类别
 * @param {*} param0 
 */
export const addAssetStyle = ({ assetsName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/addAssetStyle",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            assetsName
        }
    })
}
/**
 * 修改固定资产信息
 * @param {*} param0 
 */
export const updateAssetStyle = ({ id, assetsName, qiyeID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/updateAssetStyle",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, assetsName, qiyeID
        }
    })
}
/**
 * 删除固定资产类别
 * @param {*} param0 
 */
export const deleteAssetStyle = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/deleteAssetStyle",
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
 * 保存固定资产报废信息
 * @param {*} param0 
 */
export const savezichanBaoFeiInfo = ({ ID, outNum, outStaffId, outDate, beizhu }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/savezichanBaoFeiInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            ID, outNum, outStaffId, outDate, beizhu
        }
    })
}
/**
 * 查询固定资产登记记录
 * @param {*} param0 
 */
export const getAssetAddRecords = ({ size, current, ID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/getAssetAddRecords",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, ID
        }
    })
}
/**
 * 查询固定资产报废记录
 * @param {*} param0 
 */
export const getAssetOutRecords = ({ size, current, ID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/pxassets/getAssetOutRecords",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, ID
        }
    })
}
/**
 * 分页查询日志信息
 * @param {*} param0 
 */
export const GetAllLogsPages = ({ size, current, campusID, staffID, logType, SDate, Edate }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemLog/GetAllLogsPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, campusID, staffID, logType, SDate, Edate
        }
    })
}
/**
 * 分页查询岗位权限
 * @param {*} param0 
 */

export const getAllstaffPostPages = (paramobj = { size, current, campusID, staffpostName }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getAllstaffPostPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 通过岗位ID查询岗位名称
 * @param {*} param0 
 */
export const getstaffpostNameByID = (paramobj = { staffpostID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/getstaffpostNameByID",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**
 * 添加岗位信息
 * @param {*} param0 
 */
export const addStaffpost = ({ staffpostName, campusID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/addStaffpost",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            staffpostName, campusID
        }
    })
}
/**
 * 修改校区岗位信息
 * @param {*} param0 
 */
export const updatestaffpost = ({ id, staffpostName, campusID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/updatestaffpost",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            id, staffpostName, campusID
        }
    })
}
/**
 * 删除校区岗位信息
 * @param {*} param0 
 */
export const DeleteStaffPost = ({ ids }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/deletestaffpost",
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
 * 查询菜单按钮
 * @param {*} param0 
 */
export const getAllMenu = ({ staffpostID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/PowerManagement/getAllMenu",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            staffpostID
        }
    })
}
/**
 * 保存权限信息
 * @param {*} data 
 */
export const savepowerInfo = (data) => {
    return axios.request({
        url: "/xwcloud-sys/sys/PowerManagement/savepowerInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        data: data,
    })
}
/**
 * 保存校区权限信息
 * @param {*} param0 
 */
export const saveCampusPower = ({ staffpostID, campusIDs, menuID }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/PowerManagement/saveCampusPower",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params: {
            staffpostID, campusIDs, menuID
        }
    })
}
/**
 * 查询下拉款选项
 * @param {*} data 
 * @returns 
 */
export const GetOptionsById = (data) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/GetOptionsById",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params: data
    })
}
/**
 * 添加下拉选择框的下拉选项
 * @param {*} data 
 * @returns 
 */
export const AddOptions = (data) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/AddOptions",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params: data
    })
}
/**
 * 删除下拉选项
 * @param {*} data 
 * @returns 
 */
export const DeleteOptions = (data) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/DeleteOptions",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params: data
    })
}
/**
 * 修改下拉选项
 * @param {*} data 
 * @returns 
 */
export const EditOptions = (data) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/EditOptions",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params: data
    })
}
/**
 * 保存机构简介信息
 * @param {*} data 
 * @returns 
 */
export const savejigoujianjie = (data) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/savejigoujianjie",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        params: data
    })
}
/**
 * 上传图片到阿里云OSS
 * @param {*} data 
 * @returns 
 */
export const uploadimagetoqiniuyun = (data) => {
    return axios.request({
        url: "/xwcloud-sys/aliyun/uploadFileToAliOss",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'multipart/form-data'
        },
        params: data
    })
}

export const DeleteKaoshileibie = ({ Id }) => {
    return axios.request({
        url: "/xwcloud-sys/sys/SystemSetting/DeleteKaoshileibie",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            Id
        }
    })
}