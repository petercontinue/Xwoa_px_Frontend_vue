import {
    getStaffPages,
    getAllcampus,
    getallstaffpost,
    saveNewStaffInfo,
    getPxstafftable,
    UpdateStaffSate,
    resetStaffPassword,
    jiechustaffweixinBind,
    GetPowerMenuButtons,
    GetrenjiaokemuPages,
    getSubjectList,
    GetAllSubjecbycampusIDtList,
    saveteachsubject,
    getTeachSubjectInfo,
    UpdateteachSubject,
    DeleteTeachSubject,
    GetAllWorkdayRecordPages,
    AddWorkdayRecords,
    UpdateWorkdayRecord,
    DeleteWorkdayRecord,
    GetdailyworkInfobyId,
    GetweekrecordPages,
    Addweekrecord,
    Updateweekrecord,
    Deleteweekrecord,
    getWeekworkrecordInfoById,
    GetyichangkaoqinPages,
    getstaffListByCampusID,
    Addyuanggongyichangkaoqin,
    Deleteyichangkaoqin,
    GetyichangkaoqingInfoById,
    UpdateYuanggongyichangkaoqin,
    GetAllStaffTelPages,
    UpdateStaffTel,
    GetAllStaffBirthPages,
    UpdateStaffBirth,
    GetWechatMessageStaffPages,
    GetTuisongTyleList,
    getPxstafftableAllList,
    GetGongsigonggaoPages,
    DeleteGongsiGonggao,
    GetStaffPostByCampusID,
    savefasonggsXiaoxi,
    getqiyeName,
    getxitongremainDay,
    getCampusYejiList,
    GetIndexKehaoInfo,
    GetAllqiyeInfoByuserPhone,
    SendShortMessage,
    UpdateUserPassword,
    editPxstafftable,
    GetAllStaffPostListByCampusID,
    getdaibanTixin,
    getdaohangtoStaff,
    saveUserdaohang,
    getTeaRateitemList,
    addRate, delTeaRate, getmanagerNum,
    updateuserpwd,
    wxqunfa,
    campusOrstaffpostqunfa,
    delFileFromAliOss
} from '@/api/staff'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        pxstaffList: [],
        allcampusList: [],
        allstaffpostList: []
    },
    mutations: {
        setpxstaffList(state, list) {
            state.pxstaffList = list
        },
        setallcampusList(state, list) {
            state.allcampusList = list;
        },
        setallstaffpostList(state, list) {
            state.allstaffpostList = list;
        }
    },
    actions: {
        delFileFromAliOss({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delFileFromAliOss(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateloginuserpwd({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                updateuserpwd(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        wxqunfa({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                wxqunfa(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        campusOrstaffpostqunfa({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                campusOrstaffpostqunfa(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        saveUserdaohang({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                saveUserdaohang(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addRate({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addRate(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delTeaRate({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delTeaRate(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTeaRateitemList({ commit }) {
            return new Promise((resolve, reject) => {
                getTeaRateitemList({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getqiyeName({ commit }) {
            return new Promise((resolve, reject) => {
                getqiyeName({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getxitongremainDay({ commit }) {
            return new Promise((resolve, reject) => {
                getxitongremainDay({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPxstaffListPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                getStaffPages(data).then(res => {
                    commit('setpxstaffList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getallcampusList({ state, commit }, data) {
            return new Promise((resolve, reject) => {
                getAllcampus(data).then(res => {
                    commit('setallcampusList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getallstaffpostList({ state, commit }) {
            return new Promise((resolve, reject) => {
                getallstaffpost().then(res => {
                    commit('setallstaffpostList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getmanagerNum({ commit }, { }) {
            return new Promise((resolve, reject) => {
                getmanagerNum({}).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveNewStaffInfo({ state, commit }, { role, staffName, staffTel, password, staffSex, staffBirthday, campusID, staffPostID, staffState, joinTime, shuoMing, jiaoxueJingyan, showInApp }) {
            return new Promise((resolve, reject) => {
                saveNewStaffInfo({
                    role, staffName, staffTel, password, staffSex, staffBirthday, campusID, staffPostID, staffState, joinTime, shuoMing, jiaoxueJingyan, showInApp
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPxstafftableInfo({ commit }, { pxtafftableId }) {
            return new Promise((resolve, reject) => {
                getPxstafftable({
                    pxtafftableId
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdatePxStaffSate({ commit }, { id, staffState }) {
            return new Promise((resolve, reject) => {
                UpdateStaffSate({
                    id, staffState
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        ResetPassword({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                resetStaffPassword({
                    Id
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        jiechuweixinbindstaff({ commit }, { staffID }) {
            return new Promise((resolve, reject) => {
                jiechustaffweixinBind({
                    staffID
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetallPowerMenuButtons({ commit }, { menuID }) {
            return new Promise((resolve, reject) => {
                GetPowerMenuButtons({
                    menuID
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getpagesTeacherTeachSubject({ commit }, { size, current, staffID, subjectName, teachCampusName }) {
            return new Promise((resolve, reject) => {
                GetrenjiaokemuPages({
                    size, current, staffID, subjectName, teachCampusName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getSubjectInfoList({ commit }) {
            return new Promise((resolve, reject) => {
                getSubjectList({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })

        },
        GetAllSubjecbycampusIDtList({ commit }, { campusID }) {
            return new Promise((resolve, reject) => {
                GetAllSubjecbycampusIDtList({
                    campusID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })

        },


        saveTeacherSubject({ commit }, data) {
            return new Promise((resolve, reject) => {
                saveteachsubject(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTeachIngSubjectInfo({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                getTeachSubjectInfo({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateTeacherSubject({ commit }, { qiyeID, shuoming, staffID, teachSubjectID, id }) {
            return new Promise((resolve, reject) => {
                UpdateteachSubject({
                    id, qiyeID, shuoming, staffID, teachSubjectID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteTeachSubject({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                DeleteTeachSubject({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllWorkdayRecordPages({ commit }, { size, current, StaffName, CampusName, StaffPostName, SLogDate, ELogDate }) {
            return new Promise((resolve, reject) => {
                GetAllWorkdayRecordPages({
                    size, current, StaffName, CampusName, StaffPostName, SLogDate, ELogDate
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        AddWorkdayRecords({ commit }, { staffID, LogDate, LogContent, ImgsUrl, qiyeID }) {
            return new Promise((resolve, reject) => {
                AddWorkdayRecords({
                    staffID, LogDate, LogContent, ImgsUrl, qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateWorkdayRecord({ commit }, { id, staffID, LogDate, LogContent, ImgsUrl, qiyeID }) {
            return new Promise((resolve, reject) => {
                UpdateWorkdayRecord({
                    id, staffID, LogDate, LogContent, ImgsUrl, qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteWorkdayRecord({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                DeleteWorkdayRecord({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetdailyworkInfobyId({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                GetdailyworkInfobyId({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetweekrecordPages({ commit }, { size, current, StaffPostName, StaffName, CampusName, SstartDate, EstartDate }) {
            return new Promise((resolve, reject) => {
                GetweekrecordPages({
                    size, current, StaffPostName, StaffName, CampusName, SstartDate, EstartDate
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Addweekrecord({ commit }, { startDate, endDate, thisWeekRecord, nextWeekRecord, imgsUrl }) {
            return new Promise((resolve, reject) => {
                Addweekrecord({
                    startDate, endDate, thisWeekRecord, nextWeekRecord, imgsUrl
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Updateweekrecord({ commit }, { id, startDate, endDate, thisWeekRecord, nextWeekRecord, imgsUrl }) {
            return new Promise((resolve, reject) => {
                Updateweekrecord({
                    id, startDate, endDate, thisWeekRecord, nextWeekRecord, imgsUrl
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Deleteweekrecord({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                Deleteweekrecord({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getWeekworkrecordInfoById({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                getWeekworkrecordInfoById({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetyichangkaoqinPages({ commit }, { size, current, campusName, staffpostName, staffName, type }) {
            return new Promise((resolve, reject) => {
                GetyichangkaoqinPages({
                    size, current, campusName, staffpostName, staffName, type
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getstaffListByCampusID({ commit }, { campusID }) {
            console.log(campusID);
            return new Promise((resolve, reject) => {
                getstaffListByCampusID({
                    campusID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Addyuanggongyichangkaoqin({ commit }, { id, staffID, type, riqi, shuoming, addDate, addstaffID, qiyeID }) {
            return new Promise((resolve, reject) => {
                Addyuanggongyichangkaoqin({
                    id, staffID, type, riqi, shuoming, addDate, addstaffID, qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Deleteyichangkaoqin({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                Deleteyichangkaoqin({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetyichangkaoqingInfoById({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                GetyichangkaoqingInfoById({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateYuanggongyichangkaoqin({ commit }, { id, staffID, type, riqi, shuoming, addDate, addstaffID, qiyeID }) {
            return new Promise((resolve, reject) => {
                UpdateYuanggongyichangkaoqin({
                    id, staffID, type, riqi, shuoming, addDate, addstaffID, qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllStaffTelPages({ commit }, { size, current, UserName, staffName, campusName, staffPostName, stafftel }) {
            return new Promise((resolve, reject) => {
                GetAllStaffTelPages({
                    size, current, UserName, staffName, campusName, staffPostName, stafftel
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateStaffTel({ commit }, { staffTel, id }) {
            return new Promise((resolve, reject) => {
                UpdateStaffTel({
                    staffTel, id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllStaffBirthPages({ commit }, { size, current, staffName, campusName, staffPostName, Sstaffbirth, Estaffbirth }) {
            return new Promise((resolve, reject) => {
                GetAllStaffBirthPages({
                    size, current, staffName, campusName, staffPostName, Sstaffbirth, Estaffbirth
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateStaffBirth({ commit }, { id, staffbirth }) {
            return new Promise((resolve, reject) => {
                UpdateStaffBirth({
                    id, staffbirth
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetWechatMessageStaffPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetWechatMessageStaffPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetTuisongTyleList({ commit }, { }) {
            return new Promise((resolve, reject) => {
                GetTuisongTyleList({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPxstafftableAllList({ commit }, { }) {
            return new Promise((resolve, reject) => {
                getPxstafftableAllList({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetGongsigonggaoPages({ commit }, { size, current, gonggaoTitel, SgonggaoDate, EgonggaoDate }) {
            return new Promise((resolve, reject) => {
                GetGongsigonggaoPages({
                    size, current, gonggaoTitel, SgonggaoDate, EgonggaoDate
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteGongsiGonggao({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                DeleteGongsiGonggao({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetStaffPostByCampusID({ commit }, { CampusID }) {
            return new Promise((resolve, reject) => {
                GetStaffPostByCampusID({ CampusID }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        savefasonggsXiaoxi({ commit }, { Id, gonggaoTitel, gonggaoText, sendType, sendCampusId, campusID, sendStaffPostCampusId, sendStaffId }) {
            return new Promise((resolve, reject) => {
                savefasonggsXiaoxi({ Id, gonggaoTitel, gonggaoText, sendType, sendCampusId, campusID, sendStaffPostCampusId, sendStaffId }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getCampusYejiList({ commit }, { type }) {
            return new Promise((resolve, reject) => {
                getCampusYejiList({ type }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetIndexKehaoInfo({ commit }, { type }) {
            return new Promise((resolve, reject) => {
                GetIndexKehaoInfo({ type }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllqiyeInfoByuserPhone({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetAllqiyeInfoByuserPhone(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        SendShortMessage({ commit }, data) {
            return new Promise((resolve, reject) => {
                SendShortMessage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateUserPassword({ commit }, data) {
            return new Promise((resolve, reject) => {
                UpdateUserPassword(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editPxstafftable({ commit }, data) {
            return new Promise((resolve, reject) => {
                editPxstafftable(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllStaffPostListByCampusID({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetAllStaffPostListByCampusID(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getdaibanTixin({ commit }) {
            return new Promise((resolve, reject) => {
                getdaibanTixin({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })

        },
        getdaohangtoStaff({ commit }) {
            return new Promise((resolve, reject) => {
                getdaohangtoStaff({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })

        },




    }
}