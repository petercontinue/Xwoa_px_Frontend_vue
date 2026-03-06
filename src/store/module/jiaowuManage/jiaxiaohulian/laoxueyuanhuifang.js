import {
    getStuPage_api,
    getStu_api,
    getStuKechengList_api,
    addHuifang_api,
    getHuifangPage_api,
    editHuifang_api,
    delHuifang_api,
} from '@/api/jiaowuManage/jiaxiaohulian/laoxueyuanhuifang'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        stupageList: [],
    },
    mutations: {
        setstupageList(state, list) {
            state.stupageList = list
        },
    },
    actions: {
        getStuPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getStuPage_api(paramobj).then(res => {
                    commit('setstupageList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getStu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStuKechengList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getStuKechengList_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addHuifang({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addHuifang_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getHuifangPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getHuifangPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editHuifang({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                editHuifang_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delHuifang({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delHuifang_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        
    }
}