import {
    getCampusList_api,
    getClassList_api,
    getjwpublicStaffList_api,
    getjwpublicClassRoomList_api,
    getPublicStuList_api,
    getPublicStaffPostList_api,
    getPublicKemuList_api, getStugradeList_api,
} from '@/api/jiaowuManage/jwpublic'
import { setToken, getToken } from '@/libs/util'
export default {
    state: {
    },
    mutations: {
    },
    actions: {
        getCampusList({ commit }, { campusName, qiyeID }) {
            return new Promise((resolve, reject) => {
                getCampusList_api({
                    campusName,
                    qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getClassList({ commit }, { campusID, qiyeID }) {
            return new Promise((resolve, reject) => {
                getClassList_api({
                    campusID,
                    qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getjwpublicStaffList({ commit }, { campusID, qiyeID }) {
            return new Promise((resolve, reject) => {
                getjwpublicStaffList_api({
                    campusID,
                    qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getjwpublicClassRoomList({ commit }, { campusID, qiyeID }) {
            return new Promise((resolve, reject) => {
                getjwpublicClassRoomList_api({
                    campusID,
                    qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPublicStuList({ commit }, paramsobj) {
            return new Promise((resolve, reject) => {
                getPublicStuList_api(paramsobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPublicStaffPostList({ commit }, paramsobj) {
            return new Promise((resolve, reject) => {
                getPublicStaffPostList_api(paramsobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPublicKemuList({ commit }, paramsobj) {
            return new Promise((resolve, reject) => {
                getPublicKemuList_api(paramsobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStugradeList({ commit }, paramsobj) {
            return new Promise((resolve, reject) => {
                getStugradeList_api(paramsobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        
    }
}