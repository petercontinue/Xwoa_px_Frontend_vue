import * as caiwuliushui from '@/api/caiwuManage/caiwuliushui';

import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        getShouzhiStyleList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.getShouzhiStyleList_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPaymoneystyleList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.getPaymoneystyleList_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getLiushuiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.getLiushuiPage_api(paramobj).then(res => {

                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addLiushui({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.addLiushui_api(paramobj).then(res => {

                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getLiushui({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.getLiushui_api(paramobj).then(res => {

                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editLiushui({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.editLiushui_api(paramobj).then(res => {

                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delLiushui({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.delLiushui_api(paramobj).then(res => {

                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getLiushuiDay({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.getLiushuiDay_api(paramobj).then(res => {

                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getShouruDay({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.getShouruDay_api(paramobj).then(res => {

                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetRishouRuDuizhangTableKey({commit},paramobj){
            return new Promise((resolve,reject)=>{
                caiwuliushui.GetRishouRuDuizhangTableKey(paramobj).then(res=>{
                    resolve(res);
                }).catch(err=>{
                    reject(err);
                })
            })
        },
        getYinkuiList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.getYinkuiList_api(paramobj).then(res => {

                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Getshouzhistyle({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.Getshouzhistyle(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getpayMoneyList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                caiwuliushui.getpayMoneyList(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}