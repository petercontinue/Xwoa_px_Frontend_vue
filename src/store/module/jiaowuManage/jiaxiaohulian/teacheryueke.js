import {
    getKechengList,
    getFabuYuekePage_api,
    addFabuYueke,
    editFabuYueke,
    delFabuYueke
} from '@/api/jiaowuManage/jiaxiaohulian/teacheryueke'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        getKechengtList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getKechengList(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getFabuYuekePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getFabuYuekePage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addFabuYueke({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addFabuYueke(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editFabuYueke({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                editFabuYueke(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delFabuYueke({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delFabuYueke(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }

    }
}