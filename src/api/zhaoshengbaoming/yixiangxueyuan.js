import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

export const GetYixiangStuByPages = ({ size, current, stuName, parentTel, stuGradeID, campusID, telFromID, yxLeveID, dengjiStaffName, shichangStaffName, genjinDate, daofang, shiting, fuzeStaffName, dengjiTime, type }) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/GetYixiangStuByPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {
            size, current, stuName, parentTel, stuGradeID, campusID, telFromID, yxLeveID, dengjiStaffName, shichangStaffName, genjinDate, daofang, shiting, fuzeStaffName, dengjiTime, type
        }
    })
}

export const getYxSearchtelFrom = () => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getYxSearchtelFrom",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}

export const getYxSearchTelLevel = () => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getYxSearchTelLevel",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}

export const getYxDropdownOption = () => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getYxDropdownOption",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}

export const addYixiangStuInfo = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/addYixiangStuInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}


export const getDiyParamValue = (stuID) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getDiyParamValue/" + stuID,
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}

export const deleteYixiangStu = (stuIDs) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/deleteYixiangStu/" + stuIDs,
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}
export const getStuGenjinRecordsPages = (searchData) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getStuGenjinRecordsPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: searchData
    })
}
export const getNextGenjingRequired = () => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getNextGenjingRequired",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}
export const saveAndUpdateStuGenjinInfo = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/saveAndUpdateStuGenjinInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const deletegenjinRecords = (id) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/deletegenjinRecords/" + id,
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}
export const getStuInvitationRecordsPages = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getStuInvitationRecordsPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const addOrUpdateYxStuInvitationInfo = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/addOrUpdateYxStuInvitationInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const deleteStuInvitation = (id) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/deleteStuInvitation/" + id,
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}
export const getStuInvitationDaofangRecordsPages = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getStuInvitationDaofangRecordsPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const saveYxStuDaofangInfo = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/saveYxStuDaofangInfo",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const deleteYxStuDaofang = (id) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/deleteYxStuDaofang/" + id,
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        param: {}
    })
}
export const saveFenpeixingxi = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/saveFenpeixingxi",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const setYxStuWeifenpei = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/setYxStuWeifenpei",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const getYxStuShitingRecords = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getYxStuShitingRecords",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const getClassListNo1V1 = (campusID) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getClassListNo1V1",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: campusID
    })
}


export const getPaikeByClassID = (data = { classID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getPaikeByClassID",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const getYxChabanKc = (data = { campusID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getYxChabanKc",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const getSubjectTeacher = (kechengID) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getSubjectTeacher",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: kechengID
    })
}
export const getClassRoom = (campusID) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getClassRoom",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: campusID
    })
}
export const saveChabanShiting = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/saveChabanShiting",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const getPayMoneyStyle = (data = { liushuiID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getPayMoneyStyle",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const deleteShitingRecords = (data = { stID }) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/deleteShitingRecords",
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const saveShitingManyidu = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/saveShitingManyidu",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const getYixiangStuGenjinTixing = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getYixiangStuGenjinTixing",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const deleteGenjinTixing = (ids) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/deleteGenjinTixing/" + ids,
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}
export const getAllLiuyanPages = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getAllLiuyanPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const deleteLiuyanList = (ids) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/deleteLiuyanList/" + ids,
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}
export const getGenjinliushuiPages = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getGenjinliushuiPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const getyaoyueDaofangPages = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getyaoyueDaofangPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const getShitingRecordsPages = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getShitingRecordsPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const getAllQiandanLiushuiPages = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getAllQiandanLiushuiPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const getcampusMubiaoPages = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getcampusMubiaoPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const saveCampusMubiao = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/saveCampusMubiao",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const deleteCampusZhaoshengmubiao = (ids) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/deleteCampusZhaoshengmubiao/" + ids,
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}
export const getStaffMubiaoPages = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getStaffMubiaoPages",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: data
    })
}
export const addOrEditStaffMubiao = (data) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/addOrEditStaffMubiao",
        method: "post",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        data: data
    })
}
export const deleteStaffMubiao = (ids) => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/deleteStaffMubiao/" + ids,
        method: "delete",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}
export const getHi_rate = () => {
    return axios.request({
        url: "/xwcloud-zsbm/yxstu/YixiangStu/getHi_rate",
        method: "get",
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: {}
    })
}

