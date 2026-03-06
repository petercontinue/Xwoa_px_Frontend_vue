import {
    getAutoPage_api,
    getKaoqingCountPage_api,
    getKaoqingliushuiPage_api,
    getPaikeQiandaoPage_api,
    getrengongxiaokePage_api,
    getshuakaPage_api,
    getshuakaxiaokePage_api,
    getyuexiaokePage_api,
    getziyouqiandaoPage_api,
    getstugradeList_api,
    getstubuxiList_api,
    savezdxk_api,
    getallkechengByCampusId_api,
    NOpaikegetclass_api,
    getallstaff_api,
    GetcampusStuName_api,
    getxkStu_api,
    savestukehao_api,
    getclassTime_api,
    getzyStu_api,
    savenopaikexiaoeke_api,
    getxiaokedayingPage_api,
    editAutoxiaoke_api,
    getallqxclass_api,
    getstaffByCam_api,
    getxiaokedaying_api,
    IsHavePaike_api,
    getpaikexiaoekestuList_api,
    tiansavestukehao_api,
    pdstudingjin_api,
    getclasskaoqingPage_api,
    getziyouqiandaoLookStuPage_api,
    SaveqianDaoqianTui_api,
    getziyouqiandaostuNumPage_api,
    getziyouqiantuistuNumPage_api,
    getstuqiaoDaoNumPage_api,
    getstuqiaoTuiNumPage_api,
    rgqiandaoqiantui_api,
    getKcToYueXiaoKe_api,
    addyuexiaoke_api,
    saveShaka_api,
    shuaqiandaoqiantui_api,
    getDaykebiaopage_api,
    getpaikeShowList_api,
    getallkechengByCampusId,
    GetRenjiaoTeacher,
    GetAllClassRoom,
    SavePaike_api,
    GetClassStuList,
    getkongxianTeacher_api,
    getkongxianClassRoom_api,
    DeletDateTimePaike,
    upDateTeacherByTime,
    getpaikeInfo,
    Delpaike,
    DelAllpaike,
    chongpaiAllPaike,
    editSavePaike,
    GetAllKemuList,
    getsubjectkebiaoList,
    getTeacherkebiaoList,
    GetAllStuList,
    getstukebiaoList,
    GetAllClassroomList,
    getjiaoshikebiaoList,
    GetPrintSubjectKebiao,
    pdrkeshi_api,
    GetKechengContent,
    GetAllkechengInfoByQuanxian,
    GetshualianxiaokeInfoPages,
    GetAllStuAndMubanImages,
    SaveStuMubanImages,
    DeleteStuMubanImage
} from '@/api/jiaowuManage/paikexiaoke/paikexiaoke'

export default {
    state: {
        AutoPageList: [],
        KaoqingCountList: [],
        KaoqingliushuiList: [],
        getPaikeQiandaoList: [],
        rengongxiaokeList: [],
        shuakapageList: [],
        shuakaxiaokeList: [],
        yuexiaokeList: [],
        ziyouqiandaoList: [],
        getstugradeList: [],
        getstubuxiList: [],
        allkechengByCampusId: [],
        NOpaikeclassList: [],
        allstaffList: [],
        campusStuName: [],
        xkstuList: [],
        savestukehaoList: [],
        classTimelist: [],
        getzyStulist: [],
        xiaokedayingList: [],
        allqxclassList: [],
        staffByCamList: [],
        xiaokedayingsys: [],
        IsHavePaike: [],
        paikexiaoekestu: [],
        classkaoqing: [],
        setsutziyouqiandaoLookStuPage: [],
        ziyouqiandaostuNumPage: [],
        ziyouqiantuistuNumPage: [],
        stuqiaoDaoNum: [],
        stuqiaoTuiNum: [],
        KcToYueXiaoKe: [],
        Daykebiao: [],
    },
    mutations: {
        setsutclassTimelist(state, list) {
            state.classTimelist = list
        },
        setsutgetstugradeList(state, list) {
            state.getstugradeList = list
        },
        setsutgetstubuxiList(state, list) {
            state.getstubuxiList = list
        },
        setsutAutoPageList(state, list) {
            state.AutoPageList = list
        },
        setsutKaoqingCountList(state, list) {
            state.KaoqingCountList = list
        },
        setsutKaoqingliushuiList(state, list) {
            state.KaoqingliushuiList = list
        },
        setsutgetPaikeQiandaoList(state, list) {
            state.getPaikeQiandaoList = list
        },
        setsutrengongxiaokeList(state, list) {
            state.rengongxiaokeList = list
        },
        setsutshuakapageList(state, list) {
            state.shuakapageList = list
        },
        setsutshuakaxiaokeList(state, list) {
            state.shuakaxiaokeList = list
        },
        setsutyuexiaokeList(state, list) {
            state.yuexiaokeList = list
        },
        setsutziyouqiandaoList(state, list) {
            state.ziyouqiandaoList = list
        },
        setsutallkechengByCampusId(state, list) {
            state.allkechengByCampusId = list
        },
        setsutNOpaikeclassList(state, list) {
            state.NOpaikeclassList = list
        },
        setsutallstaffList(state, list) {
            state.allstaffList = list
        },
        setsutcampusStuName(state, list) {
            state.campusStuName = list
        },
        setsutxkstuList(state, list) {
            state.xkstuList = list
        },
        setsutsavestukehaoList(state, list) {
            state.savestukehaoList = list
        },
        setsutgetzyStulist(state, list) {
            state.getzyStulist = list
        },
        setsutxiaokedayingList(state, list) {
            state.xiaokedayingList = list
        },
        setsutallqxclassList(state, list) {
            state.allqxclassList = list
        },
        setsutstaffByCamList(state, list) {
            state.staffByCamList = list
        },
        setsutxiaokedayingsys(state, list) {
            state.xiaokedayingsys = list
        },
        setsutIsHavePaike(state, list) {
            state.IsHavePaike = list
        },
        setsutpaikexiaoekestu(state, list) {
            state.paikexiaoekestu = list
        },
        setsutclasskaoqing(state, list) {
            state.classkaoqing = list
        },
        setsutziyouqiandaoLookStuPage(state, list) {
            state.setsutziyouqiandaoLookStuPage = list
        },
        setsutziyouqiandaostuNumPage(state, list) {
            state.ziyouqiandaostuNumPage = list
        },
        setsutziyouqiantuistuNumPage(state, list) {
            state.ziyouqiantuistuNumPage = list
        },
        setsutstuqiaoDaoNum(state, list) {
            state.stuqiaoDaoNum = list
        },
        setsutstuqiaoTuiNum(state, list) {
            state.stuqiaoTuiNum = list
        },
        setsutKcToYueXiaoKe(state, list) {
            state.KcToYueXiaoKe = list
        },
        setsutDaykebiao(state, list) {
            state.Daykebiao = list
        }

    },
    actions: {
        getstugradeList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getstugradeList_api(paramobj).then(res => {
                    commit('setsutgetstugradeList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getstubuxiList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getstubuxiList_api(paramobj).then(res => {
                    commit('setsutgetstubuxiList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 人工消课
         */
        getrengongxiaokePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getrengongxiaokePage_api(paramobj).then(res => {
                    commit('setsutrengongxiaokeList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
        * 刷卡消课
        */
        getshuakaxiaokePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getshuakaxiaokePage_api(paramobj).then(res => {
                    commit('setsutshuakaxiaokeList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 余额消课
         */
        getyuexiaokePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getyuexiaokePage_api(paramobj).then(res => {
                    commit('setsutyuexiaokeList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 自动消课
         */
        getAutoPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getAutoPage_api(paramobj).then(res => {
                    commit('setsutAutoPageList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 刷卡签到
         */
        getshuakaPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getshuakaPage_api(paramobj).then(res => {
                    commit('setsutshuakapageList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 排课签到签退
         */
        getPaikeQiandaoPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getPaikeQiandaoPage_api(paramobj).then(res => {
                    commit('setsutgetPaikeQiandaoList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 自由签到签退
         */
        getziyouqiandaoPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getziyouqiandaoPage_api(paramobj).then(res => {
                    commit('setsutziyouqiandaoList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 考勤统计
         */
        getKaoqingCountPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getKaoqingCountPage_api(paramobj).then(res => {
                    commit('setsutKaoqingCountList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 考勤流水
         */
        getKaoqingliushuiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getKaoqingliushuiPage_api(paramobj).then(res => {
                    commit('setsutKaoqingliushuiList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**设置自动消课 */
        savezdxk({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                savezdxk_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**保存不排课消课 */
        savenopaikexiaoeke({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                savenopaikexiaoeke_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        tiansavestukehao({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                tiansavestukehao_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        pdstudingjin({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                pdstudingjin_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        pdrkeshi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                pdrkeshi_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        IsHavePaike({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                IsHavePaike_api(paramobj).then(res => {
                    commit('setsutIsHavePaike', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },


        /**
         * 根据校区获取课程
         */
        getallkechengByCampusId({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getallkechengByCampusId_api(paramobj).then(res => {
                    commit('setsutallkechengByCampusId', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 根据当前登录用户的权限获取可选择课程信息
         * @param {*} param0 
         * @param {*} paramobj 
         * @returns 
         */
        GetAllkechengInfoByQuanxian({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetAllkechengInfoByQuanxian(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取班级
         */
        getNOpaikegetclass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                NOpaikegetclass_api(paramobj).then(res => {
                    commit('setsutNOpaikeclassList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 所有员工（在职）
         */
        getallstaff({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getallstaff_api(paramobj).then(res => {
                    commit('setsutallstaffList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 获取当前校区学员
         */
        GetcampusStuName({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetcampusStuName_api(paramobj).then(res => {
                    commit('setsutcampusStuName', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
         * 按照学员获取补习课程
         */
        getxkStu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getxkStu_api(paramobj).then(res => {
                    commit('setsutxkstuList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
        * 不排课消课按班级获取上课学员信息
        */
        savestukehao({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                savestukehao_api(paramobj).then(res => {
                    commit('setsutsavestukehaoList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**课程时长 */
        getclassTime({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getclassTime_api(paramobj).then(res => {
                    commit('setsutclassTimelist', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**要添加的学员 */
        getzyStu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getzyStu_api(paramobj).then(res => {
                    commit('setsutgetzyStulist', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },


        /**
         * 修改自动消课状态
         */
        saveeditAutoxiaoke({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                editAutoxiaoke_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
 * 按校区获取的班级
 */
        getallqxclass({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getallqxclass_api(paramobj).then(res => {
                    commit('setsutallqxclassList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        /**
        * 按校区获取的班级
        */
        getstaffByCam({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getstaffByCam_api(paramobj).then(res => {
                    commit('setsutstaffByCamList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getxiaokedayingPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getxiaokedayingPage_api(paramobj).then(res => {
                    commit('setsutxiaokedayingList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getxiaokedayingsys({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getxiaokedaying_api(paramobj).then(res => {
                    commit('setsutxiaokedayingsys', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getpaikexiaoekestuList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getpaikexiaoekestuList_api(paramobj).then(res => {
                    commit('setsutpaikexiaoekestu', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getclasskaoqingList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getclasskaoqingPage_api(paramobj).then(res => {
                    commit('setsutclasskaoqing', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getziyouqiandaoLookStuPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getziyouqiandaoLookStuPage_api(paramobj).then(res => {
                    commit('setsutziyouqiandaoLookStuPage', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        SaveqianDaoqianTui({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                SaveqianDaoqianTui_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getziyouqiandaostuNumPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getziyouqiandaostuNumPage_api(paramobj).then(res => {
                    commit('setsutziyouqiandaostuNumPage', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getziyouqiantuistuNumPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getziyouqiantuistuNumPage_api(paramobj).then(res => {
                    commit('setsutziyouqiantuistuNumPage', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getstuqiaoDaoNumPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getstuqiaoDaoNumPage_api(paramobj).then(res => {
                    commit('setsutstuqiaoDaoNum', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getstuqiaoTuiNumPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getstuqiaoTuiNumPage_api(paramobj).then(res => {
                    commit('setsutstuqiaoTuiNum', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        rgqiandaoqiantui({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                rgqiandaoqiantui_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKcToYueXiaoKe({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getKcToYueXiaoKe_api(paramobj).then(res => {
                    commit('setsutKcToYueXiaoKe', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addyuexiaoke({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addyuexiaoke_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveShaka({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                saveShaka_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        shuaqiandaoqiantui({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                shuaqiandaoqiantui_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getDaykebiaopage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getDaykebiaopage_api(paramobj).then(res => {
                    commit('setsutDaykebiao', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getpaikeShowList_api({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getpaikeShowList_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getallkechengByCampusId({ commit }) {
            return new Promise((resolve, reject) => {
                getallkechengByCampusId({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetRenjiaoTeacher({ commit }, { kechengID }) {
            return new Promise((resolve, reject) => {
                GetRenjiaoTeacher({ kechengID }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetKechengContent({ commit }, { kechengID }) {
            return new Promise((resolve, reject) => {
                GetKechengContent({ kechengID }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllClassRoom({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllClassRoom({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        SavePaike({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                SavePaike_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetClassStuList({ commit }, { classID, paikeid }) {
            return new Promise((resolve, reject) => {
                GetClassStuList({ classID, paikeid }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getkongxianTeacherPage({ commit }, { current, size, campusID, haveClassDate, starTime, endTime, TeacherName }) {
            return new Promise((resolve, reject) => {
                getkongxianTeacher_api({ current, size, campusID, haveClassDate, starTime, endTime, TeacherName }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getkongxianClassRoomPage({ commit }, { current, size, campusID, haveClassDate, starTime, endTime, classRoomName }) {
            return new Promise((resolve, reject) => {
                getkongxianClassRoom_api({ current, size, campusID, haveClassDate, starTime, endTime, classRoomName }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeletDateTimePaike({ commit }, { startDate, startTime, endDate, endTime }) {
            return new Promise((resolve, reject) => {
                DeletDateTimePaike({ startDate, startTime, endDate, endTime }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        upDateTeacherByTime({ commit }, { startDate, endDate, startLessonDateTime, endLessonDateTime, oldteaTeidt, newteaTeidt }) {
            return new Promise((resolve, reject) => {
                upDateTeacherByTime({ startDate, endDate, startLessonDateTime, endLessonDateTime, oldteaTeidt, newteaTeidt }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getpaikeInfo({ commit }, { id }) {
            return new Promise((resolve, reject) => {
                getpaikeInfo({ id }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Delpaike({ commit }, { id }) {
            return new Promise((resolve, reject) => {
                Delpaike({ id }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DelAllpaike({ commit }, { oldkechengID, oldclassID, classRooID, oldteaID, tstrDate, tendDate, deltype, tags }) {
            return new Promise((resolve, reject) => {
                DelAllpaike({ oldkechengID, oldclassID, classRooID, oldteaID, tstrDate, tendDate, deltype, tags }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        chongpaiAllPaike({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                chongpaiAllPaike(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editSavePaike({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                editSavePaike(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllKemuList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllKemuList({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getsubjectkebiaoList({ commit }, { subjectID, yearMouth }) {
            return new Promise((resolve, reject) => {
                getsubjectkebiaoList({ subjectID, yearMouth }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTeacherkebiaoList({ commit }, { teacherIDs, yearMouth }) {
            return new Promise((resolve, reject) => {
                getTeacherkebiaoList({ teacherIDs, yearMouth }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllStuList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllStuList({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getstukebiaoList({ commit }, { stuID, yearMouth }) {
            return new Promise((resolve, reject) => {
                getstukebiaoList({ stuID, yearMouth }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllClassroomList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllClassroomList({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getjiaoshikebiaoList({ commit }, { classRoomID, yearMouth }) {
            return new Promise((resolve, reject) => {
                getjiaoshikebiaoList({ classRoomID, yearMouth }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetPrintSubjectKebiao({ commit }, { startDate, endDate, subjectID }) {
            return new Promise((resolve, reject) => {
                GetPrintSubjectKebiao({ startDate, endDate, subjectID }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetshualianxiaokeInfoPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetshualianxiaokeInfoPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllStuAndMubanImages({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetAllStuAndMubanImages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        SaveStuMubanImages({ commit }, data) {
            return new Promise((resolve, reject) => {
                SaveStuMubanImages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteStuMubanImage({ commit }, data) {
            return new Promise((resolve, reject) => {
                DeleteStuMubanImage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }

    }
}