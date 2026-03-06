import * as yx from '@/api/zhaoshengbaoming/yixiangxueyuan'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        GetYixiangStuByPages({ commit }, { size, current, stuName, parentTel, stuGradeID, campusID, telFromID, yxLeveID, dengjiStaffName, shichangStaffName, genjinDate, daofang, shiting, fuzeStaffName, dengjiTime, type }) {
            return new Promise((resolve, reject) => {
                yx.GetYixiangStuByPages({
                    size, current, stuName, parentTel, stuGradeID, campusID, telFromID, yxLeveID, dengjiStaffName, shichangStaffName, genjinDate, daofang, shiting, fuzeStaffName, dengjiTime, type
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getYxSearchtelFrom({ commit }) {
            return new Promise((resolve, reject) => {
                yx.getYxSearchtelFrom().then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getYxSearchTelLevel({ commit }) {
            return new Promise((resolve, reject) => {
                yx.getYxSearchTelLevel().then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getYxDropdownOption({ commit }) {
            return new Promise((resolve, reject) => {
                yx.getYxDropdownOption().then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addYixiangStuInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                yx.addYixiangStuInfo(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getDiyParamValue({ commit }, stuID) {
            return new Promise((resolve, reject) => {
                yx.getDiyParamValue(stuID).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteYixiangStu({ commit }, stuIDs) {
            return new Promise((resolve, reject) => {
                yx.deleteYixiangStu(stuIDs).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStuGenjinRecordsPages({ commit }, searchData) {
            return new Promise((resolve, reject) => {
                yx.getStuGenjinRecordsPages(searchData).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getNextGenjingRequired({ commit } ) {
            return new Promise((resolve, reject) => {
                yx.getNextGenjingRequired().then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveAndUpdateStuGenjinInfo({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.saveAndUpdateStuGenjinInfo(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deletegenjinRecords({ commit } ,id) {
            return new Promise((resolve, reject) => {
                yx.deletegenjinRecords(id).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStuInvitationRecordsPages({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.getStuInvitationRecordsPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addOrUpdateYxStuInvitationInfo({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.addOrUpdateYxStuInvitationInfo(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteStuInvitation({ commit } ,id) {
            return new Promise((resolve, reject) => {
                yx.deleteStuInvitation(id).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStuInvitationDaofangRecordsPages({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.getStuInvitationDaofangRecordsPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveYxStuDaofangInfo({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.saveYxStuDaofangInfo(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteYxStuDaofang({ commit } ,id) {
            return new Promise((resolve, reject) => {
                yx.deleteYxStuDaofang(id).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveFenpeixingxi({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.saveFenpeixingxi(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setYxStuWeifenpei({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.setYxStuWeifenpei(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getYxStuShitingRecords({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.getYxStuShitingRecords(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getClassListNo1V1({ commit } ,campusID) {
            return new Promise((resolve, reject) => {
                yx.getClassListNo1V1(campusID).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPaikeByClassID({ commit } ,classID) {
            return new Promise((resolve, reject) => {
                yx.getPaikeByClassID(classID).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getYxChabanKc({ commit } ,campusID) {
            return new Promise((resolve, reject) => {
                yx.getYxChabanKc(campusID).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getSubjectTeacher({ commit } ,kechengID) {
            return new Promise((resolve, reject) => {
                yx.getSubjectTeacher(kechengID).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getClassRoom({ commit } ,campusID) {
            return new Promise((resolve, reject) => {
                yx.getClassRoom(campusID).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveChabanShiting({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.saveChabanShiting(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPayMoneyStyle({ commit } ,liushuiID) {
            return new Promise((resolve, reject) => {
                yx.getPayMoneyStyle(liushuiID).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteShitingRecords({ commit } ,stID) {
            return new Promise((resolve, reject) => {
                yx.deleteShitingRecords(stID).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveShitingManyidu({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.saveShitingManyidu(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getYixiangStuGenjinTixing({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.getYixiangStuGenjinTixing(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteGenjinTixing({ commit } ,ids) {
            return new Promise((resolve, reject) => {
                yx.deleteGenjinTixing(ids).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllLiuyanPages({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.getAllLiuyanPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteLiuyanList({ commit } ,ids) {
            return new Promise((resolve, reject) => {
                yx.deleteLiuyanList(ids).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGenjinliushuiPages({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.getGenjinliushuiPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getyaoyueDaofangPages({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.getyaoyueDaofangPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getShitingRecordsPages({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.getShitingRecordsPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllQiandanLiushuiPages({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.getAllQiandanLiushuiPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getcampusMubiaoPages({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.getcampusMubiaoPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveCampusMubiao({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.saveCampusMubiao(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteCampusZhaoshengmubiao({ commit } ,ids) {
            return new Promise((resolve, reject) => {
                yx.deleteCampusZhaoshengmubiao(ids).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStaffMubiaoPages({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.getStaffMubiaoPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addOrEditStaffMubiao({ commit } ,data) {
            return new Promise((resolve, reject) => {
                yx.addOrEditStaffMubiao(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteStaffMubiao({ commit } ,ids) {
            return new Promise((resolve, reject) => {
                yx.deleteStaffMubiao(ids).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getHi_rate({ commit } ) {
            return new Promise((resolve, reject) => {
                yx.getHi_rate().then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },


    },
}