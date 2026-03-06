import {
    getStuClassPage_api,
    addClass_api,
    updateClass_api,
    getupdateClass_api,
    UpdateOtOIsShow_api,
    delClass_api,
    getClassToStu_api,
    getstumingdan_api,
    exportClassOtO_api,
    UpdatestuClassbyOne_api,
    getzhuangbanchaban_api,
    addclass_api,
    getallbanke_api,
    StuCharu_api,
    getOldClass_api,
    saveChangeClass_api,
    getHaveClass_api,
    tuichuClass_api,
    allnoStuCharu_api,
    saveplChangeClass_api,
    Getkxqstu_api,
    Getkxqbxkecheng_api,
    GetKxqCampus_api,
    getkxqclass_api,
    getbuxistyle_api,
    savekxqClass_api,
    getPaikeByclassIDList,
    getInPaikeByClassandBuxi
} from '@/api/jiaowuManage/stuClass/stuClass';

export default {
    state: {
        StuClass: [],
        getupdateClass: [],
        ClassToStu: [],
        stumingdan: [],
        ClassOtO: [],
        zhuangbanchaban: [],
        allbanke: [],
        OldClass: [],
        haveClass: [],
        kxqstu: [],
        kxqbxkecheng: [],
        KxqCampus: [],
        kxqclass: [],
        buxistyle: [],
    },
    mutations: {
        setsutStuClass(state, list) {
            state.StuClass = list
        },
        setsutgetupdateClass(state, list) {
            state.getupdateClass = list
        },
        setsutClassToStu(state, list) {
            state.ClassToStu = list
        },
        setsutstumingdan(state, list) {
            state.stumingdan = list
        },
        setsutexportClassOtO(state, list) {
            state.ClassOtO = list
        },
        setsutzhuangbanchaban(state, list) {
            state.zhuangbanchaban = list
        },
        setsutallbanke(state, list) {
            state.allbanke = list
        },
        setsutOldClass(state, list) {
            state.OldClass = list
        },
        setsuthaveClass(state, list) {
            state.haveClass = list
        },
        setsutkxqstu(state, list) {
            state.kxqstu = list
        },
        setsutkxqbxkecheng(state, list) {
            state.kxqbxkecheng = list
        },
        setsutKxqCampus(state, list) {
            state.KxqCampus = list
        },
        setsutkxqclass(state, list) {
            state.kxqclass = list
        },
        setsutbuxistyle(state, list) {
            state.buxistyle = list
        },


    },
    actions: {
        getStuClassPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getStuClassPage_api(paramobj).then(res => {
                    commit('setsutStuClass', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addClass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addClass_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateClass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                updateClass_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getupdateClass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getupdateClass_api(paramobj).then(res => {
                    commit('setsutgetupdateClass', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateOtOIsShow({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                UpdateOtOIsShow_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delClass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delClass_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getClassToStu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getClassToStu_api(paramobj).then(res => {
                    commit('setsutClassToStu', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getstumingdan({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getstumingdan_api(paramobj).then(res => {
                    commit('setsutstumingdan', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        exportClassOtO({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                exportClassOtO_api(paramobj).then(res => {
                    commit('setsutexportClassOtO', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdatestuClassbyOne({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                UpdatestuClassbyOne_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getzhuangbanchaban({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getzhuangbanchaban_api(paramobj).then(res => {
                    commit('setsutzhuangbanchaban', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addclass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addclass_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getallbanke({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getallbanke_api(paramobj).then(res => {
                    commit('setsutallbanke', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getOldClass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getOldClass_api(paramobj).then(res => {
                    commit('setsutOldClass', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        StuCharu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                StuCharu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveChangeClass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                saveChangeClass_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getHaveClass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getHaveClass_api(paramobj).then(res => {
                    commit('setsuthaveClass', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        tuichuClass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                tuichuClass_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        allnoStuCharu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                allnoStuCharu_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveplChangeClass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                saveplChangeClass_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Getkxqstu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                Getkxqstu_api(paramobj).then(res => {
                    commit('setsutkxqstu', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Getkxqbxkecheng({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                Getkxqbxkecheng_api(paramobj).then(res => {
                    commit('setsutkxqbxkecheng', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetKxqCampus({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetKxqCampus_api(paramobj).then(res => {
                    commit('setsutKxqCampus', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getbuxistyle({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getbuxistyle_api(paramobj).then(res => {
                    commit('setsutbuxistyle', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getkxqclass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getkxqclass_api(paramobj).then(res => {
                    commit('setsutkxqclass', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        savekxqClass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                savekxqClass_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPaikeByclassIDList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getPaikeByclassIDList(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getInPaikeByClassandBuxi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getInPaikeByClassandBuxi(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    },
}