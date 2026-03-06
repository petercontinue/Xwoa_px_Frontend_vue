import {
    getQingjiaPage_api,
    changeReviewStatus_api,
    delQingjia_api,
} from '@/api/jiaowuManage/jiaxiaohulian/weiqingjia'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        QingjiaList:[],
    },
    mutations: {
        setQingjiaList(state, list){
            state.QingjiaList = list
        }
    },
    actions: {
        getQingjiaPage({ commit },paramobj ) {
            return new Promise((resolve, reject) => {
                getQingjiaPage_api(paramobj).then(res => {
                    commit('setQingjiaList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        changeReviewStatus({ commit },paramobj ) {
            return new Promise((resolve, reject) => {
                changeReviewStatus_api(paramobj).then(res => {
                    commit('setQingjiaList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delQingjia({ commit },paramobj ) {
            return new Promise((resolve, reject) => {
                delQingjia_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}