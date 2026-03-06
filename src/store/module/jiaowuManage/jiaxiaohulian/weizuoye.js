import {
    getZuoyePage_api,
    addZuoye_api,
    delZuoye_api,
    getZuoyeById_api,
    editZuoye_api,
    getZuoyeDetaile_api,
} from '@/api/jiaowuManage/jiaxiaohulian/weizuoye'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        ZuoyeList:[],
        Zuoye:{},
    },
    mutations: {
        setZuoyeList(state, list){
            state.ZuoyeList = list
        },
        setZuoye(state, zuoye){
            state.Zuoye = zuoye
        }
    },
    actions: {
        getZuoyePage({ commit },paramobj ) {
            return new Promise((resolve, reject) => {
                getZuoyePage_api(paramobj).then(res => {
                    commit('setZuoyeList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addZuoye({ commit },paramobj ) {
            return new Promise((resolve, reject) => {
                addZuoye_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delZuoye({ commit },paramobj ) {
            return new Promise((resolve, reject) => {
                delZuoye_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getZuoyeById({ commit },paramobj ) {
            return new Promise((resolve, reject) => {
                getZuoyeById_api(paramobj).then(res => {
                    commit('setZuoye', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editZuoye({ commit },paramobj ) {
            return new Promise((resolve, reject) => {
                editZuoye_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getZuoyeDetaile({ commit },paramobj ) {
            return new Promise((resolve, reject) => {
                getZuoyeDetaile_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}