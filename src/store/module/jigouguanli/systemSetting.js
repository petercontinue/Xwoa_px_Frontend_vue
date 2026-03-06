import {
    getjigouqjandykTimes,
    editTimexianzhi,
    UpdateSysParamValue,
    getStuGradePage,
    addStuGrade,
    updateStugrade,
    deleteStuGrage,
    getAllbuxistylePage,
    addbuxistyle,
    updatebuxistyle,
    deletebuxistyle,
    getALlclasstimestyle,
    addclasstimestyle,
    updateClasstimestyle,
    deleteClasstimeStyle,
    getPagesClassRoomList,
    addClassRoom,
    GetclassroomInfo,
    editClassRoom,
    GetAllCampusInfoPages,
    EditCampusgongzhonghaoSetting,
    GetCampusInfoByCampusID,
    EditCampusShanghuInfo,
    updateCampusNameByCampusID,
    GetStuParamtypePages,
    AddStuParamTypeInfo,
    DeleteStuParamType,
    UpdateStuparamTypeInfo,
    GetPagesyxtelfromPages,
    Addyxtelfrom,
    Deleteyxtelfrom,
    Updateyxtelfrom,
    GetSystemParamsById,
    GetSanjiFanyongInfo,
    GetAllYixiangchengduPages,
    AddYixiangchengdu,
    DeleteYixiangchengdu,
    UpdateYixiangchengdu,
    getKaoshiLeibie,
    SaveKaoshileibie,
    GetAllStaffList,
    getAllqiandanotherMoneyPages,
    addqiandanotherMoney,
    editQiandanOtherMoney,
    deleteQiandanOtherMoney,
    getAllPaymoneyStylePages,
    addPayMoneyStyle,
    editPayMoneyStyle,
    deletePayMoneyStyle,
    GetAllShoufeibiaozhunPages,
    addShoufeiniaozhun,
    GetAllStuGradeList,
    GetAllbuxistyleList,
    updateShoufeibiaozhun,
    GetShouFeibiaozhunByID,
    deleteShoufeibiaozhun,
    getAllShouzhistylePages,
    addShouzhiStyle,
    deleteShouzhistyle,
    getshouzhistyleById,
    UpdateTuisongKaiGuan,
    GetAlltsKaiguangValue,
    getPagesAssets,
    GetAllAssetsStyleList,
    addAssetInfo,
    updateAssetInfo,
    deleteAssetInfo,
    getAllAssetStyle,
    addAssetStyle,
    updateAssetStyle,
    deleteAssetStyle,
    savezichanBaoFeiInfo,
    getAssetAddRecords,
    getAssetOutRecords,
    GetAllLogsPages,
    deleteClassRoom,
    getAllstaffPostPages,
    getstaffpostNameByID,
    addStaffpost,
    updatestaffpost,
    DeleteStaffPost,
    getAllMenu,
    savepowerInfo,
    saveCampusPower,
    GetOptionsById,
    AddOptions,
    DeleteOptions,
    EditOptions,
    savejigoujianjie,
    uploadimagetoqiniuyun,
    DeleteKaoshileibie,
    editShouzhistyle,
    gettuikelevelPage,
    savetklevel,
    deltklevel,
    settklevel,
    geteditlevelbyID
} from '@/api/jigouguanli/systemSetting'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        geteditlevelbyID({ commit }, data) {
            return new Promise((resolve, reject) => {
                geteditlevelbyID(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        savetklevel({ commit }, data) {
            return new Promise((resolve, reject) => {
                savetklevel(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deltklevel({ commit }, data) {
            return new Promise((resolve, reject) => {
                deltklevel(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        settklevel({ commit }, data) {
            return new Promise((resolve, reject) => {
                settklevel(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        gettuikelevelPage({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                gettuikelevelPage({ size, current }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getjigouqjandykTimes({ commit }, { }) {
            return new Promise((resolve, reject) => {
                getjigouqjandykTimes({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editTimexianzhi({ commit }, { type, times }) {
            return new Promise((resolve, reject) => {
                editTimexianzhi({
                    type, times
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateSysParamValue({ commit }, { id, value }) {
            return new Promise((resolve, reject) => {
                UpdateSysParamValue({
                    id, value
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStuGradePage({ commit }, { size, current, stuGradeName }) {
            return new Promise((resolve, reject) => {
                getStuGradePage({
                    size, current, stuGradeName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addStuGrade({ commit }, { stuGradeName }) {
            return new Promise((resolve, reject) => {
                addStuGrade({ stuGradeName }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateStugrade({ commit }, { id, stuGradeName }) {
            return new Promise((resolve, reject) => {
                updateStugrade({ id, stuGradeName }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteStuGrage({ commit }, { ids }) {
            return new Promise((resolve, reject) => {
                deleteStuGrage({
                    ids
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllbuxistylePage({ commit }, { size, current, buxiStyleName }) {
            return new Promise((resolve, reject) => {
                getAllbuxistylePage({
                    size, current, buxiStyleName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addbuxistyle({ commit }, { buxiStyleName }) {
            return new Promise((resolve, reject) => {
                addbuxistyle({ buxiStyleName }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updatebuxistyle({ commit }, { id, buxiStyleName, qiyeID }) {
            return new Promise((resolve, reject) => {
                updatebuxistyle({ id, buxiStyleName, qiyeID }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deletebuxistyle({ commit }, { ids }) {
            return new Promise((resolve, reject) => {
                deletebuxistyle({
                    ids
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getALlclasstimestyle({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                getALlclasstimestyle({
                    size, current
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addclasstimestyle({ commit }, { ClassTimeStyleName }) {
            return new Promise((resolve, reject) => {
                addclasstimestyle({
                    ClassTimeStyleName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateClasstimestyle({ commit }, { id, classTimeStyleName }) {
            return new Promise((resolve, reject) => {
                updateClasstimestyle({
                    id, classTimeStyleName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteClasstimeStyle({ commit }, { ids }) {
            return new Promise((resolve, reject) => {
                deleteClasstimeStyle({
                    ids
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPagesClassRoomList({ commit }, { size, current, campusID, classRoomName }) {
            return new Promise((resolve, reject) => {
                getPagesClassRoomList({
                    size, current, campusID, classRoomName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addClassRoom({ commit }, { classRoomName, campusID, ischongtu }) {
            return new Promise((resolve, reject) => {
                addClassRoom({
                    classRoomName, campusID, ischongtu
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetclassroomInfo({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                GetclassroomInfo({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editClassRoom({ commit }, { id, classRoomName, campusID, ischongtu }) {
            return new Promise((resolve, reject) => {
                editClassRoom({
                    id, classRoomName, campusID, ischongtu
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteClassRoom({ commit }, { ids }) {
            return new Promise((resolve, reject) => {
                deleteClassRoom({
                    ids
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllCampusInfoPages({ commit }, { size, current, campusName }) {
            return new Promise((resolve, reject) => {
                GetAllCampusInfoPages({
                    size, current, campusName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        EditCampusgongzhonghaoSetting({ commit }, { campusID, AppID, AppSecret }) {
            return new Promise((resolve, reject) => {
                EditCampusgongzhonghaoSetting({
                    campusID, AppID, AppSecret
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetCampusInfoByCampusID({ commit }, { CampusID }) {
            return new Promise((resolve, reject) => {
                GetCampusInfoByCampusID({
                    CampusID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        EditCampusShanghuInfo({ commit }, { campusID, wxShanghuID, wxShanghuKey }) {
            return new Promise((resolve, reject) => {
                EditCampusShanghuInfo({
                    campusID, wxShanghuID, wxShanghuKey
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateCampusNameByCampusID({ commit }, { campusID, campusName }) {
            return new Promise((resolve, reject) => {
                updateCampusNameByCampusID({
                    campusID, campusName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetStuParamtypePages({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                GetStuParamtypePages({
                    size, current
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        AddStuParamTypeInfo({ commit }, { StuParamTypeName, IsBiTian, widthType }) {
            return new Promise((resolve, reject) => {
                AddStuParamTypeInfo({
                    StuParamTypeName, IsBiTian, widthType
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteStuParamType({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                DeleteStuParamType({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateStuparamTypeInfo({ commit }, { id, stuParamTypeName, IsBiTian, widthType, qiyeID }) {
            return new Promise((resolve, reject) => {
                UpdateStuparamTypeInfo({
                    id, stuParamTypeName, IsBiTian, widthType, qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetPagesyxtelfromPages({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                GetPagesyxtelfromPages({
                    size, current
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Addyxtelfrom({ commit }, { telFromName, beizhu }) {
            return new Promise((resolve, reject) => {
                Addyxtelfrom({
                    telFromName, beizhu
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Deleteyxtelfrom({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                Deleteyxtelfrom({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Updateyxtelfrom({ commit }, { id, telFromName, beizhu }) {
            return new Promise((resolve, reject) => {
                Updateyxtelfrom({
                    id, telFromName, beizhu
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetSystemParamsById({ commit }, { paramsID }) {
            return new Promise((resolve, reject) => {
                GetSystemParamsById({
                    paramsID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetSanjiFanyongInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetSanjiFanyongInfo(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllYixiangchengduPages({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                GetAllYixiangchengduPages({
                    size, current
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        AddYixiangchengdu({ commit }, { telLevelName, beizhu }) {
            return new Promise((resolve, reject) => {
                AddYixiangchengdu({
                    telLevelName, beizhu
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteYixiangchengdu({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                DeleteYixiangchengdu({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateYixiangchengdu({ commit }, { id, telLevelName, beizhu, addStaffID, addTime, qiyeID }) {
            return new Promise((resolve, reject) => {
                UpdateYixiangchengdu({
                    id, telLevelName, beizhu, addStaffID, addTime, qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKaoshiLeibie({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                getKaoshiLeibie({
                    size, current
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        SaveKaoshileibie({ commit }, { id, testtype }) {
            return new Promise((resolve, reject) => {
                SaveKaoshileibie({
                    id, testtype
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllStaffList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllStaffList({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllqiandanotherMoneyPages({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                getAllqiandanotherMoneyPages({
                    size, current
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addqiandanotherMoney({ commit }, { othermoneyname }) {
            return new Promise((resolve, reject) => {
                addqiandanotherMoney({
                    othermoneyname
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editQiandanOtherMoney({ commit }, { id, othermoneyname, qiyeid }) {
            return new Promise((resolve, reject) => {
                editQiandanOtherMoney({
                    id, othermoneyname, qiyeid
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteQiandanOtherMoney({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                deleteQiandanOtherMoney({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllPaymoneyStylePages({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                getAllPaymoneyStylePages({
                    size, current
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addPayMoneyStyle({ commit }, { moneystyleName }) {
            return new Promise((resolve, reject) => {
                addPayMoneyStyle({
                    moneystyleName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editPayMoneyStyle({ commit }, { id, moneystyleName, qiyeID }) {
            return new Promise((resolve, reject) => {
                editPayMoneyStyle({
                    id, moneystyleName, qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deletePayMoneyStyle({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                deletePayMoneyStyle({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllShoufeibiaozhunPages({ commit }, { buxiStyleName, stuGradeName, size, current }) {
            return new Promise((resolve, reject) => {
                GetAllShoufeibiaozhunPages({
                    buxiStyleName, stuGradeName, size, current
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addShoufeiniaozhun({ commit }, { buxiStyleId, stuGradeId, minimumCharge }) {
            return new Promise((resolve, reject) => {
                addShoufeiniaozhun({
                    buxiStyleId, stuGradeId, minimumCharge
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllStuGradeList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllStuGradeList({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllbuxistyleList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllbuxistyleList({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateShoufeibiaozhun({ commit }, { id, buxiStyleId, stuGradeId, MinimumCharge, addTime, addStaffID, qiyeID }) {
            return new Promise((resolve, reject) => {
                updateShoufeibiaozhun({
                    id, buxiStyleId, stuGradeId, MinimumCharge, addTime, addStaffID, qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetShouFeibiaozhunByID({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                GetShouFeibiaozhunByID({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteShoufeibiaozhun({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                deleteShoufeibiaozhun({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllShouzhistylePages({ commit }, { size, current, leibie, type }) {
            return new Promise((resolve, reject) => {
                getAllShouzhistylePages({
                    size, current, leibie, type
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addShouzhiStyle({ commit }, { shouzhiStyle, isshouOrzhichu, beizhu }) {
            return new Promise((resolve, reject) => {
                addShouzhiStyle({
                    shouzhiStyle, isshouOrzhichu, beizhu
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editShouzhistyle({ commit }, { id, shouzhiStyle, isshouOrzhichu, beizhu }) {
            return new Promise((resolve, reject) => {
                editShouzhistyle({
                    id, shouzhiStyle, isshouOrzhichu, beizhu
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteShouzhistyle({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                deleteShouzhistyle({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getshouzhistyleById({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                getshouzhistyleById({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateTuisongKaiGuan({ commit }, { value, Id }) {
            return new Promise((resolve, reject) => {
                UpdateTuisongKaiGuan({
                    value, Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAlltsKaiguangValue({ commit }) {
            return new Promise((resolve, reject) => {
                GetAlltsKaiguangValue({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPagesAssets({ commit }, { size, current, campusID, assetsName, leibieID }) {
            return new Promise((resolve, reject) => {
                getPagesAssets({
                    size, current, campusID, assetsName, leibieID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllAssetsStyleList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllAssetsStyleList({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addAssetInfo({ commit }, { campusID, assetsName, leibie, guige, num, danwei, addTime, addstaffID, beizhu }) {
            return new Promise((resolve, reject) => {
                addAssetInfo({
                    campusID, assetsName, leibie, guige, num, danwei, addTime, addstaffID, beizhu
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateAssetInfo({ commit }, { id, campusID, assetsName, leibie, guige, num, danwei, qiyeID }) {
            return new Promise((resolve, reject) => {
                updateAssetInfo({
                    id, campusID, assetsName, leibie, guige, num, danwei, qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteAssetInfo({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                deleteAssetInfo({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllAssetStyle({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                getAllAssetStyle({
                    size, current
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addAssetStyle({ commit }, { assetsName }) {
            return new Promise((resolve, reject) => {
                addAssetStyle({
                    assetsName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateAssetStyle({ commit }, { id, assetsName, qiyeID }) {
            return new Promise((resolve, reject) => {
                updateAssetStyle({
                    id, assetsName, qiyeID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteAssetStyle({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                deleteAssetStyle({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        savezichanBaoFeiInfo({ commit }, { ID, outNum, outStaffId, outDate, beizhu }) {
            return new Promise((resolve, reject) => {
                savezichanBaoFeiInfo({
                    ID, outNum, outStaffId, outDate, beizhu
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAssetAddRecords({ commit }, { size, current, ID }) {
            return new Promise((resolve, reject) => {
                getAssetAddRecords({
                    size, current, ID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAssetOutRecords({ commit }, { size, current, ID }) {
            return new Promise((resolve, reject) => {
                getAssetOutRecords({
                    size, current, ID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllLogsPages({ commit }, { size, current, campusID, staffID, logType, SDate, Edate }) {
            return new Promise((resolve, reject) => {
                GetAllLogsPages({
                    size, current, campusID, staffID, logType, SDate, Edate
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllstaffPostPages({ commit }, { size, current, campusID, staffpostName }) {
            return new Promise((resolve, reject) => {
                getAllstaffPostPages({
                    size, current, campusID, staffpostName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getstaffpostNameByID({ commit }, { staffpostID }) {
            return new Promise((resolve, reject) => {
                getstaffpostNameByID({
                    staffpostID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addStaffpost({ commit }, { staffpostName, campusID }) {
            return new Promise((resolve, reject) => {
                addStaffpost({
                    staffpostName, campusID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updatestaffpost({ commit }, { id, staffpostName, campusID }) {
            return new Promise((resolve, reject) => {
                updatestaffpost({
                    id, staffpostName, campusID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteStaffPost({ commit }, { ids }) {
            return new Promise((resolve, reject) => {
                DeleteStaffPost({
                    ids
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllMenu({ commit }, { staffpostID }) {
            return new Promise((resolve, reject) => {
                getAllMenu({
                    staffpostID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        savepowerInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                savepowerInfo(
                    data
                ).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        saveCampusPower({ commit }, { staffpostID, campusIDs, menuID }) {
            return new Promise((resolve, reject) => {
                saveCampusPower({
                    staffpostID, campusIDs, menuID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetOptionsById({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetOptionsById(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        AddOptions({ commit }, data) {
            return new Promise((resolve, reject) => {
                AddOptions(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteOptions({ commit }, data) {
            return new Promise((resolve, reject) => {
                DeleteOptions(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        EditOptions({ commit }, data) {
            return new Promise((resolve, reject) => {
                EditOptions(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        savejigoujianjie({ commit }, data) {
            return new Promise((resolve, reject) => {
                savejigoujianjie(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        uploadimagetoqiniuyun({ commit }, data) {
            return new Promise((resolve, reject) => {
                uploadimagetoqiniuyun(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteKaoshileibie({ commit }, data) {
            return new Promise((resolve, reject) => {
                DeleteKaoshileibie(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
}