import * as zhaosheng from '@/api/shujutongji/zhaosheng'

import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        getZhaoshengBili({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getZhaoshengBili_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getZhaoshengList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getZhaoshengList_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getLaiyuantujingList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getLaiyuantujingList_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getYixiangPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getYixiangPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getYixiangDetail({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getYixiangDetail_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getOldschoolBili({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getOldschoolBili_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getOldschoolstuPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getOldschoolstuPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTeacherlBili({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getTeacherlBili_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTeacherlPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getTeacherlPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getRenewPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getRenewPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKemukehaotongjiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getKemukehaotongjiPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getBanjiKehaoPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getBanjiKehaoPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getShoufeiDetailtongji({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getShoufeiDetail_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getNianjiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getNianjiPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getBanjiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getBanjiPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getBuxiStylePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getBuxiStylePage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        
        getKemutongjiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getKemuPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getBanzhurenPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getBanzhurenPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getYuejunkehaoPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getYuejunkehaoPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getJiaoshiyuejunkehaoPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getJiaoshiyuejunkehaoPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getXuesherenshu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getXuesherenshu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTeacherStu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getTeacherStu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTeacherStuDetaile({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getTeacherStuDetaile_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getBanzhurenStu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getBanzhurenStu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getBanzhurenStuDetaile({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getBanzhurenStuDetaile_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKumuStuZhanbi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getKumuStuZhanbi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKumuXinqianXvfei({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getKumuXinqianXvfei_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKumukeshizhanbi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getKumukeshizhanbi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTingkeStu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getTingkeStu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStupaikePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getStupaikePage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTeacherpaikePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getTeacherpaikePage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getCampuspaikePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getCampuspaikePage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTeaStuLiushiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getTeaStuLiushiPage(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getBanzhurenStuLiushiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getBanzhurenStuLiushiPage(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getCampusStuLiushiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getCampusStuLiushiPage(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKehaotongbihuanbi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getKehaotongbihuanbi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKumukexiaozhanbi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getKumukexiaozhanbi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getClassProfit({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getClassProfit(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getSubject({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getSubject(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKemuShoufeiTongji({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getKemuShoufeiTongji(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getSubjectYuETongji({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getSubjectYuETongji(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getSubjectBmTongji({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getSubjectBmTongji(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getSubjectBmByCampusAndSubject({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                zhaosheng.getSubjectBmByCampusAndSubject(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        
        
    }
}