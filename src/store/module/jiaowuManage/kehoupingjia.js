import {
    getFeedbackPage_api,
    getStuList_api,
    getStaffList_api,
    getPeriodList_api,
    addFeedback_api,
    getFeedback_api,
    editFeedback_api,
    delFeedback,
    gethavepjrate

} from '@/api/jiaowuManage/kehoupingjia'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        FeedbackList: [],
        qiyeID: "1"
    },
    mutations: {

        setFeedbackList(state, list) {
            state.FeedbackList = list
        }
    },
    actions: {


        getFeedbackPage({ commit }, { size, current, type, campusID, stuId, stuName, teacherName, qiyeID }) {
            return new Promise((resolve, reject) => {
                getFeedbackPage_api({
                    size, current, type, campusID, stuId, stuName, teacherName, qiyeID
                }).then(res => {
                    commit('setFeedbackList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        gethavepjrate({ commit }, { pjID }) {
            return new Promise((resolve, reject) => {
                gethavepjrate({
                    pjID
                }).then(res => {
                    commit('setFeedbackList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStuList({ commit }, { campusID, classID, shangkesjd, qiyeID }) {
            return new Promise((resolve, reject) => {
                getStuList_api({
                    campusID,
                    classID,
                    shangkesjd,
                    qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPeriodList({ commit }, { campusID, classID, qiyeID }) {
            return new Promise((resolve, reject) => {
                getPeriodList_api({
                    campusID,
                    classID,
                    qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStaffList({ commit }, { campusID, classID, shangkesjd, qiyeID }) {
            return new Promise((resolve, reject) => {
                getStaffList_api({
                    campusID,
                    classID,
                    shangkesjd,
                    qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addFeedback({ commit }, { pkid, stuID, imgurl, mp3url, videourl, pfvalue, sturateshuoming, teacherID }) {
            return new Promise((resolve, reject) => {
                addFeedback_api({
                    pkid, stuID, imgurl, mp3url, videourl, pfvalue, sturateshuoming, teacherID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getFeedback({ commit }, { id, qiyeID }) {
            return new Promise((resolve, reject) => {
                getFeedback_api({
                    id, qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editFeedback({ commit }, { id, note, imgAddr }) {
            return new Promise((resolve, reject) => {
                editFeedback_api({
                    id, note, imgAddr
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delFeedback({ commit }, { ID }) {
            return new Promise((resolve, reject) => {
                delFeedback({
                    ID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

    }
}