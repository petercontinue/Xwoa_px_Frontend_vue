import {
  getStuFilesPage_api,
  getstuIntegraInfoPage_api,
  getdaijinquanInfoPage_api,
  getkehaoInfoPage_api,
  getstuskInfoPage_api,
  getstuInfoPage_api,
  getstuQiandanInfoPage_api,
  getkechengInfoPage_api,
  getzafeiInfoPage_api,
  UpdateStu_api,
  delStu_api,
  PauseStudy_api,
  longPauseStudy_api,
  stuJieke_api,
  huifuStudy_api,
  getzxqCampus_api,
  getzxqbuxiList_api,
  getallJFkcshuList_api,
  getxinbxkc_api,
  zhuanxiaoqu_api,
  getStuTearchPage_api,
  getStuCardPage_api,
  GetBanzhurenFenpei_api,
  deleteTeacher_api,
  FenPingTeacher_api,
  getstuclassPage_api,
  getAllClass_api,
  AsClassTOStuPage_api,
  updateCardID_api,
  delstuCard_api,
  getStuIntegralPage_api,
  delJiFen_api,
  getJFpaimingPage_api,
  getallstu_api,
  addJiFen_api,
  editJiFen_api,
  getJiFenByID_api,
  getstuInfoqiandan_api,
  getStuGragePage_api,
  updateStuGrade_api,
  getGradeJiLuPage_api,
  editGrade_api,
  getStuBirthPage_api,
  updateBirth_api,
  getStuStayPage_api,
  updateRoom_api,
  getOkList_api,
  delStuStay_api,
  getRmManagePage_api,
  delStay_api,
  addStay_api,
  updateStay_api,
  geteditStay_api,
  Getnianji_api,
  Getstuparamtype_api,
  Getstuparamvalue_api,
  Getselectparamvalue_api
} from '@/api/jiaowuManage/stuManage/stuManage'

export default {
  state: {
    StuFiles: [],
    stuIntegraInfo: [],
    daijinquanInfo: [],
    kehaoInfo: [],
    stuskInfo: [],
    stuInfo: [],
    QiandanInfo: [],
    kechengInfo: [],
    zafeiInfo: [],
    zxqCampus: [],
    zxqbuxiList: [],
    allJFkcshuList: [],
    xinbxkc: [],
    StuTearch: [],
    StuCard: [],
    BanzhurenFenpei: [],
    stuclass: [],
    AllClass: [],
    AsClassTOStu: [],
    stuIntegral: [],
    JFpaiming: [],
    allstu: [],
    jifenByID: [],
    stuInfoqiandan: [],
    StuGrage: [],
    GradeJiLu: [],
    StuBirth: [],
    StuStay: [],
    OkList: [],
    RmManage: [],
    editStay: [],
    nianji: [],
    stuparamtype: [],
    stuparamvalue: [],
    selectparam: [],
  },
  mutations: {
    setsutgetStuFiles(state, list) {
      state.StuFiles = list
    },
    setsutstuIntegraInfo(state, list) {
      state.stuIntegraInfo = list
    },
    setsutdaijinquanInfo(state, list) {
      state.daijinquanInfo = list
    },
    setsutkehaoInfo(state, list) {
      state.kehaoInfo = list
    },
    setsutstuskInfo(state, list) {
      state.stuskInfo = list
    },
    setsutstuInfo(state, list) {
      state.stuInfo = list
    },
    setsutQiandanInfo(state, list) {
      state.QiandanInfo = list
    },
    setsutkechengInfo(state, list) {
      state.kechengInfo = list
    },
    setsutzafeiInfo(state, list) {
      state.zafeiInfo = list
    },
    setsutzxqCampus(state, list) {
      state.zxqCampus = list
    },
    setsutzxqbuxiList(state, list) {
      state.zxqbuxiList = list
    },
    setsutallJFkcshuList(state, list) {
      state.allJFkcshuList = list
    },
    setsutxinbxkc(state, list) {
      state.xinbxkc = list
    },
    setsutStuTearch(state, list) {
      state.StuTearch = list
    },
    setsutStuCard(state, list) {
      state.StuCard = list
    },
    setsutBanzhurenFenpei(state, list) {
      state.BanzhurenFenpei = list
    },
    setsutstuclass(state, list) {
      state.stuclass = list
    },
    setsutAllClass(state, list) {
      state.AllClass = list
    },
    setsutAsClassTOStu(state, list) {
      state.AsClassTOStu = list
    },
    setsutstuIntegral(state, list) {
      state.stuIntegral = list
    },
    setsutJFpaiming(state, list) {
      state.JFpaiming = list
    },
    setsutallstu(state, list) {
      state.allstu = list
    },
    setsutjifenByID(state, list) {
      state.jifenByID = list
    },
    setsutstuInfoqiandan(state, list) {
      state.stuInfoqiandan = list
    },
    setsutStuGrage(state, list) {
      state.StuGrage = list
    },
    setsutGradeJiLu(state, list) {
      state.GradeJiLu = list
    },
    setsutStuBirth(state, list) {
      state.StuBirth = list
    },
    setsutStuStay(state, list) {
      state.StuStay = list
    },
    setsutOkList(state, list) {
      state.OkList = list
    },
    setsutRmManage(state, list) {
      state.RmManage = list
    },
    setsuteditStay(state, list) {
      state.editStay = list
    },
    setsutnianji(state, list) {
      state.nianji = list
    },
    setsutstuparamtype(state, list) {
      state.stuparamtype = list
    },
    setsutstuparamvalue(state, list) {
      state.stuparamvalue = list
    },
    setsutselectparam(state, list) {
      state.selectparam = list
    },

  },
  actions: {
    getStuFilesPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getStuFilesPage_api(paramobj).then(res => {
          commit('setsutgetStuFiles', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllClass({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getAllClass_api(paramobj).then(res => {
          commit('setsutAllClass', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    AsClassTOStuPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        AsClassTOStuPage_api(paramobj).then(res => {
          commit('setsutAsClassTOStu', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    getstuIntegraInfoPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getstuIntegraInfoPage_api(paramobj).then(res => {
          commit('setsutstuIntegraInfo', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getdaijinquanInfoPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getdaijinquanInfoPage_api(paramobj).then(res => {
          commit('setsutdaijinquanInfo', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getkehaoInfoPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getkehaoInfoPage_api(paramobj).then(res => {
          commit('setsutkehaoInfo', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getstuskInfoPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getstuskInfoPage_api(paramobj).then(res => {
          commit('setsutstuskInfo', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getstuInfoPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getstuInfoPage_api(paramobj).then(res => {
          commit('setsutstuInfo', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getstuQiandanInfoPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getstuQiandanInfoPage_api(paramobj).then(res => {
          commit('setsutQiandanInfo', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getkechengInfoPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getkechengInfoPage_api(paramobj).then(res => {
          commit('setsutkechengInfo', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getzafeiInfoPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getzafeiInfoPage_api(paramobj).then(res => {
          commit('setsutzafeiInfo', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    UpdateStu({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        UpdateStu_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    delStu({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        delStu_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    PauseStudy({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        PauseStudy_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    longPauseStudy({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        longPauseStudy_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    stuJieke({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        stuJieke_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    huifuStudy({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        huifuStudy_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    zhuanxiaoqu({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        zhuanxiaoqu_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getzxqCampus({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getzxqCampus_api(paramobj).then(res => {
          commit('setsutzxqCampus', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getzxqbuxiList({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getzxqbuxiList_api(paramobj).then(res => {
          commit('setsutzxqbuxiList', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getallJFkcshuList({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getallJFkcshuList_api(paramobj).then(res => {
          commit('setsutallJFkcshuList', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getxinbxkc({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getxinbxkc_api(paramobj).then(res => {
          commit('setsutxinbxkc', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getStuTearchPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getStuTearchPage_api(paramobj).then(res => {
          commit('setsutStuTearch', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getStuCardPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getStuCardPage_api(paramobj).then(res => {
          commit('setsutStuCard', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetBanzhurenFenpei({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        GetBanzhurenFenpei_api(paramobj).then(res => {
          commit('setsutBanzhurenFenpei', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    FenPingTeacher({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        FenPingTeacher_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    deleteTeacher({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        deleteTeacher_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getstuclassPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getstuclassPage_api(paramobj).then(res => {
          commit('setsutstuclass', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateCardID({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        updateCardID_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    delstuCard({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        delstuCard_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getStuIntegralPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getStuIntegralPage_api(paramobj).then(res => {
          commit('setsutstuIntegral', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    delJiFen({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        delJiFen_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getJFpaimingPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getJFpaimingPage_api(paramobj).then(res => {
          commit('setsutJFpaiming', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    getallstu({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getallstu_api(paramobj).then(res => {
          commit('setsutallstu', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getJiFenByID({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getJiFenByID_api(paramobj).then(res => {
          commit('setsutjifenByID', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addJiFen({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        addJiFen_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    editJiFen({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        editJiFen_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getstuInfoqiandan({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getstuInfoqiandan_api(paramobj).then(res => {
          commit('setsutstuInfoqiandan', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getStuGragePage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getStuGragePage_api(paramobj).then(res => {
          commit('setsutStuGrage', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateStuGrade({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        updateStuGrade_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getGradeJiLuPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getGradeJiLuPage_api(paramobj).then(res => {
          commit('setsutGradeJiLu', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    editGrade({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        editGrade_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getStuBirthPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getStuBirthPage_api(paramobj).then(res => {
          commit('setsutStuBirth', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateBirth({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        updateBirth_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getStuStayPage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getStuStayPage_api(paramobj).then(res => {
          commit('setsutStuStay', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getOksusheList({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getOkList_api(paramobj).then(res => {
          commit('setsutOkList', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateRoom({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        updateRoom_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    delStuStay({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        delStuStay_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    delStay({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        delStay_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getRmManagePage({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        getRmManagePage_api(paramobj).then(res => {
          commit('setsutRmManage', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addStay({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        addStay_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    geteditStay({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        geteditStay_api(paramobj).then(res => {
          commit('setsuteditStay', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateStay({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        updateStay_api(paramobj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    Getnianji({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        Getnianji_api(paramobj).then(res => {
          commit('setsutnianji', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    Getstuparamtype({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        Getstuparamtype_api(paramobj).then(res => {
          commit('setsutstuparamtype', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    Getstuparamvalue({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        Getstuparamvalue_api(paramobj).then(res => {
          commit('setsutstuparamvalue', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    Getselectparamvalue({ commit }, paramobj) {
      return new Promise((resolve, reject) => {
        Getselectparamvalue_api(paramobj).then(res => {
          commit('setsutselectparam', res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },


  }
}
