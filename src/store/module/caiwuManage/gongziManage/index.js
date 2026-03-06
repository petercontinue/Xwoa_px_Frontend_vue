import * as gongziManage from '@/api/caiwuManage/gongziManage/gongziManage';

import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        getGongziPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.getGongziPage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGongziPro({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.getGongziPro_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addGongzi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.addGongzi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGongziminxiList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.getGongziminxiList_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGongzi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.getGongzi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editGongzi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.editGongzi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delGongzi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.delGongzi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        changeVerify({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.changeVerify_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getgongziPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.getgongziPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGongzixiangmuPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.getGongzixiangmuPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addGongzixiangmu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.addGongzixiangmu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGongzixiangmu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.getGongzixiangmu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editGongzixiangmu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.editGongzixiangmu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delGongzixiangmu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.delGongzixiangmu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGongzifenpeiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.getGongzifenpeiPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGongzixiangmuList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.getGongzixiangmuList_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGongzifenpei({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.getGongzifenpei_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editGongzifenpei({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.editGongzifenpei_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        ExportGongziMuban({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                gongziManage.ExportGongziMuban(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

    }
}