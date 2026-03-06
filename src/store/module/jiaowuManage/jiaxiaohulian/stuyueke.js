import {
    getYuekePage_api,
    auditNotPassed_api,
    examinationPassed_api,
    getClassRoomList_api,
} from '@/api/jiaowuManage/jiaxiaohulian/stuyueke'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        stuyuekeList: [],
    },
    mutations: {
        setsutyuekeList(state, list) {
            state.stuyuekeList = list
        },
    },
    actions: {
        getYuekePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getYuekePage_api(paramobj).then(res => {
                    commit('setsutyuekeList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        auditNotPassed({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                auditNotPassed_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        examinationPassed({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                examinationPassed_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getClassRoomList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getClassRoomList_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}