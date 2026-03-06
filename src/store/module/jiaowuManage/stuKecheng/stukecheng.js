import {
    getbuxiCoursePage_api,
    getkxqinfo_api,
    updateIsshow_api,
    KechengYanqi_api,
    editkcPrice_api,
    Getnewkc_api,
    addKSCourse_api,
    addKSCourseBag_api,
    delbuxi_api,
    getHebingTokechengCount_api,
    getHebingTokecheng_api,
    MergeCourse_api,
    getnewkcInfo_api,
    saveChangekecheng_api,
    getStuKxqCanCampus_api,
    kxqbuxikcsave_api,
    getkcLiuShuiPage_api,
    getfazhengPage_api,
    getzhengshuPage_api,
    addZs_api,
    updateZsList_api,
    delZs_api,
    lookBD_api,
    delBD_api,
    bangDingZs_api,
    getKaoJiPage_api,
    delKaoJi_api,
    GetAllSelectedStuNames_api,
    GetcampusIDkemu_api,
    addKaoJI_api,
    addKaoJiSq_api,
    updateKaoJiSq_api,
    updateKaoJI_api,
    shKaoJisq_api,
    getKJsqPage_api,
    getScorePage_api,
    addScore_api,
    getTesttype_api,
    getKcBySubject_api,
    updateScore_api,
    delScore_api,
    getTransferPage_api,
    getZengSongPage_api,
    delTransfer_api,
    getzhuangsongkecheng_api,
    getZSkechengs_api,
    getOtherKechengs_api,
    getcamkecheng_api,
    addKeShiZhs_api,
    getzhuangsongdaykecheng_api,
    addDayZhs_api,
    addZsDay_api,
    addZsKeShi_api,
    delZsKeshi_api,
    FZSave_api,
    stuScorereadExcel_api,
    getAllpxsubjectList,
    getAllbuxiStyleList,
    getAllClassTimeList,
    getstuOtherbuxi,
    savesharekeshi,
    getshareInfo
} from '@/api/jiaowuManage/stuKecheng/stukecheng'

export default {
    state: {
        buxiCourse: [],
        kxqinfo: [],
        newkc: [],
        HebingTokecheng: [],
        HebingTonewkecheng: [],
        newkcInfo: [],
        stukcqCampus: [],
        kcLiuShui: [],
        fazheng: [],
        zhengshu: [],
        bdKC: [],
        KaoJi: [],
        KJsq: [],
        AllSelectedStu: [],
        campusIDkemu: [],
        stuScore: [],
        Testtype: [],
        KcBySubject: [],
        Transfer: [],
        ZengSong: [],
        zhuangsongkecheng: [],
        ZSkechengs: [],
        OtherKechengs: [],
        camkecheng: [],
        zhuangsongdaykecheng: [],
    },
    mutations: {
        setsutbuxiCourse(state, list) {
            state.buxiCourse = list
        },
        setsutkxqinfo(state, list) {
            state.kxqinfo = list
        },
        setsutnewkc(state, list) {
            state.newkc = list
        },
        setsutHebingTokecheng(state, list) {
            state.HebingTokecheng = list
        },
        setsutHebingTonewkecheng(state, list) {
            state.HebingTonewkecheng = list
        },
        setsutnewkcInfo(state, list) {
            state.newkcInfo = list
        },
        setsutstukcqCampus(state, list) {
            state.stukcqCampus = list
        },
        setsutkcLiuShui(state, list) {
            state.kcLiuShui = list
        },
        setsutfazheng(state, list) {
            state.fazheng = list
        },
        setsutzhengshu(state, list) {
            state.zhengshu = list
        },
        setsutbdKC(state, list) {
            state.bdKC = list
        },
        setsutKaoJi(state, list) {
            state.KaoJi = list
        },
        setsutKJsq(state, list) {
            state.KJsq = list
        },
        setsutAllSelectedStu(state, list) {
            state.AllSelectedStu = list
        },
        setsutcampusIDkemu(state, list) {
            state.campusIDkemu = list
        },
        setsutstuScore(state, list) {
            state.stuScore = list
        },
        setsutTesttype(state, list) {
            state.Testtype = list
        },
        setsutKcBySubject(state, list) {
            state.KcBySubject = list
        },
        setsutTransfer(state, list) {
            state.Transfer = list
        },
        setsutZengSong(state, list) {
            state.ZengSong = list
        },
        setsutZSkechengs(state, list) {
            state.ZSkechengs = list
        },
        setsutzhuangsongkecheng(state, list) {
            state.zhuangsongkecheng = list
        },
        setsutzhuangsongdaykecheng(state, list) {
            state.zhuangsongdaykecheng = list
        },
        setsutcamkecheng(state, list) {
            state.camkecheng = list
        },
        setsutOtherKechengs(state, list) {
            state.OtherKechengs = list
        },

    },
    actions: {
        getbuxiCoursePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getbuxiCoursePage_api(paramobj).then(res => {
                    commit('setsutbuxiCourse', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getkxqinfo({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getkxqinfo_api(paramobj).then(res => {
                    commit('setsutkxqinfo', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateIsshow({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                updateIsshow_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        KechengYanqi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                KechengYanqi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editkcPrice({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                editkcPrice_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Getnewkc({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                Getnewkc_api(paramobj).then(res => {
                    commit('setsutnewkc', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addKSCourse({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addKSCourse_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addKSCourseBag({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addKSCourseBag_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delbuxi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delbuxi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getHebingTokechengCount({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getHebingTokechengCount_api(paramobj).then(res => {
                    commit('setsutHebingTokecheng', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getHebingTonewkecheng({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getHebingTokecheng_api(paramobj).then(res => {
                    commit('setsutHebingTonewkecheng', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        MergeCourse({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                MergeCourse_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getnewkcInfo({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getnewkcInfo_api(paramobj).then(res => {
                    commit('setsutnewkcInfo', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveChangekecheng({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                saveChangekecheng_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStuKxqCanCampus({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getStuKxqCanCampus_api(paramobj).then(res => {
                    commit('setsutstukcqCampus', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        kxqbuxikcsave({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                kxqbuxikcsave_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getkcLiuShuiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getkcLiuShuiPage_api(paramobj).then(res => {
                    commit('setsutkcLiuShui', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getfazhengPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getfazhengPage_api(paramobj).then(res => {
                    commit('setsutfazheng', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getzhengshuPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getzhengshuPage_api(paramobj).then(res => {
                    commit('setsutzhengshu', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addZs({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addZs_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateZsList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                updateZsList_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delZs({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delZs_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        lookBD({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                lookBD_api(paramobj).then(res => {
                    commit('setsutbdKC', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delBD({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delBD_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        bangDingZs({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                bangDingZs_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKaoJiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getKaoJiPage_api(paramobj).then(res => {
                    commit('setsutKaoJi', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKJsqPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getKJsqPage_api(paramobj).then(res => {
                    commit('setsutKJsq', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        delKaoJi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delKaoJi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllSelectedStuNames({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetAllSelectedStuNames_api(paramobj).then(res => {
                    commit('setsutAllSelectedStu', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetcampusIDkemu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetcampusIDkemu_api(paramobj).then(res => {
                    commit('setsutcampusIDkemu', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addKaoJI({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addKaoJI_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateKaoJI({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                updateKaoJI_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addKaoJiSq({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addKaoJiSq_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateKaoJiSq({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                updateKaoJiSq_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        shKaoJisq({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                shKaoJisq_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getScorePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getScorePage_api(paramobj).then(res => {
                    commit('setsutstuScore', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addScore({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addScore_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTesttype({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getTesttype_api(paramobj).then(res => {
                    commit('setsutTesttype', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKcBySubject({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getKcBySubject_api(paramobj).then(res => {
                    commit('setsutKcBySubject', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateScore({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                updateScore_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delScore({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delScore_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTransferPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getTransferPage_api(paramobj).then(res => {
                    commit('setsutTransfer', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getZengSongPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getZengSongPage_api(paramobj).then(res => {
                    commit('setsutZengSong', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delTransfer({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delTransfer_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getzhuangsongkecheng({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getzhuangsongkecheng_api(paramobj).then(res => {
                    commit('setsutzhuangsongkecheng', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getzhuangsongdaykecheng({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getzhuangsongdaykecheng_api(paramobj).then(res => {
                    commit('setsutzhuangsongdaykecheng', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },


        getZSkechengs({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getZSkechengs_api(paramobj).then(res => {
                    commit('setsutZSkechengs', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getOtherKechengs({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getOtherKechengs_api(paramobj).then(res => {
                    commit('setsutOtherKechengs', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },


        getcamkecheng({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getcamkecheng_api(paramobj).then(res => {
                    commit('setsutcamkecheng', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addKeShiZhs({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addKeShiZhs_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addDayZhs({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addDayZhs_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addZsKeShi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addZsKeShi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addZsDay({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addZsDay_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delZsKeshi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delZsKeshi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        FZSave({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                FZSave_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        stuScorereadExcel({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                stuScorereadExcel_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllpxsubjectList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getAllpxsubjectList(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllbuxiStyleList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getAllbuxiStyleList(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllClassTimeList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getAllClassTimeList(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getstuOtherbuxi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getstuOtherbuxi(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        savesharekeshi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                savesharekeshi(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getshareInfo({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getshareInfo(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },




    },
}