import {
    getStu_api,
    getStukehaoPage_api,
    getTeakehaoPage_api,
    remainkeshishowPage_api,
    getClearPage_api,
    delStukehao_api,
    NokaoqingstuPage_api,
    getRemainkeshiDetailsPage_api,
    getRemainDaysPage_api,
    UpdatekeshiAndXFPage_api,
    updateRemainKs_api,
    updateRemainXF_api,
    qiandanStuShowPage_api,
    getstukehaoShowPage_api,
    deletekeshiClear,
    delteakehao
} from '@/api/jiaowuManage/shangkejilu/shangkejilu'

export default {
    state: {
        StuList: [],
        StukehaoList: [],
        TeakehaoList: [],
        remainkeshishowList: [],
        getClearList: [],
        NokaoqingstuList: [],
        RemainkeshiDetailsList: [],
        RemainDays: [],
        UpdatekeshiAndXFList: [],
        qiandanStuShowPage: [],
        stukehaoShowList: [],
    },
    mutations: {
        setsutStuList(state, list) {
            state.StuList = list
        },
        setsutStukehaoList(state, list) {
            state.StukehaoList = list
        },
        setsutTeakehaoList(state, list) {
            state.TeakehaoList = list
        },
        setsutremainkeshishowList(state, list) {
            state.remainkeshishowList = list
        },
        setsutgetClearList(state, list) {
            state.getClearList = list
        },
        setsutNokaoqingstuList(state, list) {
            state.NokaoqingstuList = list
        },
        setsutRemainkeshiDetailsList(state, list) {
            state.RemainkeshiDetailsList = list
        },
        setsutRemainDays(state, list) {
            state.RemainDays = list
        },
        setsutUpdatekeshiAndXFList(state, list) {
            state.UpdatekeshiAndXFList = list
        },
        setsutqiandanStuShowPage(state, list) {
            state.qiandanStuShowPage = list
        },
        setsutstukehaoShowList(state, list) {
            state.stukehaoShowList = list
        },

    },
    actions: {

        /**
         * 获取学员
         */
        getStu66666({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getStu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 学员上课记录
         */
        getStukehaoPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getStukehaoPage_api(paramobj).then(res => {
                    commit('setsutStukehaoList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 教师上课记录
         */
        getTeakehaoPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getTeakehaoPage_api(paramobj).then(res => {
                    commit('setsutTeakehaoList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 分页获取剩余课时
         */
        remainkeshishowPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                remainkeshishowPage_api(paramobj).then(res => {
                    commit('setsutremainkeshishowList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 学员课时清零记录
         */
        getClearPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getClearPage_api(paramobj).then(res => {
                    commit('setsutgetClearList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 删除学员上课记录
         */
        delStukehao({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delStukehao_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 缺课学员
         */
        Nokaoqingstu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                NokaoqingstuPage_api(paramobj).then(res => {
                    commit('setsutNokaoqingstuList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 分页获取剩余课时详情
         */
        getRemainkeshiDetailsPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getRemainkeshiDetailsPage_api(paramobj).then(res => {
                    commit('setsutRemainkeshiDetailsList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 分页获取剩余天详情
         */
        getRemainDaysPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getRemainDaysPage_api(paramobj).then(res => {
                    commit('setsutRemainDays', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 分页获取修改剩余学费、剩余课时
         */
        UpdatekeshiAndXFPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                UpdatekeshiAndXFPage_api(paramobj).then(res => {
                    commit('setsutUpdatekeshiAndXFList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 修改剩余课时
         */
        updateRemainKs({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                updateRemainKs_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 修改剩余学费
         */
        updateRemainXF({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                updateRemainXF_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 分页获取学员缴费详情
         */
        qiandanStuShowPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                qiandanStuShowPage_api(paramobj).then(res => {
                    commit('setsutqiandanStuShowPage', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 分页获取学员课耗详情
         */
        getstukehaoShowPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getstukehaoShowPage_api(paramobj).then(res => {
                    commit('setsutstukehaoShowList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deletekeshiClear({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                deletekeshiClear(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delteakehao({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delteakehao(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },


    }
}
