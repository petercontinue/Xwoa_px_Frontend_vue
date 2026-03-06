import {
    getAllKechengPages,
    GetAllSubjectList,
    GetAllBuxistyleList,
    GetAllClassTimeStyleList,
    GetAllSubjectListBycampusID,
    AddKechengInfo,
    DeleteKechengInfo,
    UpdateKechengState,
    getAllSubjectPages,
    AddSubjectInfo,
    UpdateSubJectInfo,
    DeleteSubjectbyId,
    GetAllKechengContent,
    PiliangAddKechengContent,
    DeleteKechengContent,
    addyiciKechengContent,
    UpdateKechengContent,
    GetAllYouhuizhengcePages,
    AddYouhuizhengCe,
    DeleteYouHuizhengce,
    GetYouhuizhengceInfos,
    UpdateYouhuiZhengce,
    getAllQianDanInfoPages,
    DeleteQianDanAndStu,
    GetAllTelFromList,
    GetAllZidingyiParams,
    GetAllStuGradeYoouhuizhengce,
    // getAllStaffList,
    GetAllPayMoneyStyleList,
    GetAllKechengBycampusID,
    GetAllClassByCampusID, GetQiandanOtherMoneyList, GetAllWupingList, getKechengbykechengID, AddNewStuAndQianDan, GetQiandanInfo, GetQiandanStaffInfo, GetQiandanPayMoneyList
    , GetQiandanBuyKechengList, GetqiandanSuppliesList, GetQiandanOtherMoneyListbyqdID, UpdateStuQianDan, getAllXufeiQianDanInfoPages, GetStuYuePages, GetAllDaijinquanLiushuiPages
    , GetQiandanSuppliesPages, GetQiandanOtherMoneyPages, getAllQianDanInfoHetongPages, GetAllxufeistuList, GetAllStukechengInfoList, AddXufeiQiandan, GetczyouhuizhengcePages
    , AddChongzhiyouhuizhengce, DeleteCzhuodong, UpdateChongzhiyouhuizhengce, AddNewStuChongzhi, Getkeyongchongzhihuodong, AddOldStuChongzhi, GetChongzhiLiushuiPages
    , GetUserChongzhixiangqingPages, getXiaoshouLiushuiPages, GetTeachingSuppliesByTiaoma, GetTeachingSuppliesPages, GetTeachingSuppliesbuyPages, SaveSaleWupingInfo
    , GetTodayXiaoshouliushui, DeleteTeachingSuppliesType, GetAllTypeByPages, AddTeachingSuppliesType, UpdateTeachingSuppliesType, GetAllTeachingSuppliesTypeList
    , Enter_supplies, DeleteTeachingSupplies, Out_supplie, outTeachingSuppliesJilu, EnterteachingSupplieJilu, AddTeachingSuppliesInfo, delcaigou, caigoushenhe, GetKechengInfoById
    , UpdateKechengInfo, GetQiandanInfoByQiandanID_ht, SaveQiandanHetong, DeleteImgs, GetAllQiandanshenpiInfoPages, DeleteQiandanshengPiInfo, PassQiandanShenpi, qiandanshenpibohui
    , panduanStuName, GetYxStuInfo, UpdateWupingState,
    updateqdbeizhu,
    setweikuan,
    getCampusTostaff,
    getPayStyle,
    getqiandanMessage,
    xinqianGetPaikeByclassIDList,
    GetAllDaizhifuqiandanPages,
    uploadFileToAliOss,
    Deletehetong
} from '@/api/zhaoshengbaoming/zhaoshengbaoming'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        getAllKechengPages({ commit }, { size, isShow, current, campusName, subjectID, kechengName, jifeiStyleID, buxiStyleName, classTimeStyleName }) {
            return new Promise((resolve, reject) => {
                getAllKechengPages({
                    size, isShow, current, campusName, subjectID, kechengName, jifeiStyleID, buxiStyleName, classTimeStyleName
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        xinqianGetPaikeByclassIDList({ commit }, data) {
            return new Promise((resolve, reject) => {
                xinqianGetPaikeByclassIDList(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllSubjectList({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetAllSubjectList(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllBuxistyleList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllBuxistyleList({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllClassTimeStyleList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllClassTimeStyleList({
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllSubjectListBycampusID({ commit }, { campusID }) {
            return new Promise((resolve, reject) => {
                GetAllSubjectListBycampusID({
                    campusID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        AddKechengInfo({ commit }, { kechengName, subjectID, buxiStyleID, is1v1KC, classTimeStyleID, kechengOriginalPrice, showInApp,
            kechengprice, keshiNum, buyZonjia, byMonthOrDay, isShow, ZSid, jifeiStyleID, campusID, qiyeID, bgColor, perdaysqj, perkeshiqj, qingjiaTimes, iskoukeshi, kechengImg, kechengbeizhu, kechengcontent }) {
            return new Promise((resolve, reject) => {
                AddKechengInfo({
                    kechengName, subjectID, buxiStyleID, is1v1KC, classTimeStyleID, kechengOriginalPrice, showInApp,
                    kechengprice, keshiNum, buyZonjia, byMonthOrDay, isShow, ZSid, jifeiStyleID, campusID, qiyeID, bgColor, perdaysqj, perkeshiqj, qingjiaTimes, iskoukeshi, kechengImg, kechengbeizhu, kechengcontent
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteKechengInfo({ commit }, { ids }) {
            return new Promise((resolve, reject) => {
                DeleteKechengInfo({
                    ids
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateKechengState({ commit }, { Id, state }) {
            return new Promise((resolve, reject) => {
                UpdateKechengState({
                    Id, state
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllSubjectPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                getAllSubjectPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        AddSubjectInfo({ commit }, { subjectName, campusID }) {
            return new Promise((resolve, reject) => {
                AddSubjectInfo({
                    subjectName, campusID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateSubJectInfo({ commit }, { id, subjectName, campusID }) {
            return new Promise((resolve, reject) => {
                UpdateSubJectInfo({
                    id, subjectName, campusID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteSubjectbyId({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                DeleteSubjectbyId({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllKechengContent({ commit }, { size, current, kechengID }) {
            return new Promise((resolve, reject) => {
                GetAllKechengContent({
                    size, current, kechengID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        PiliangAddKechengContent({ commit }, { kechengcontentList, kechengID }) {
            return new Promise((resolve, reject) => {
                PiliangAddKechengContent({
                    kechengcontentList, kechengID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteKechengContent({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                DeleteKechengContent({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addyiciKechengContent({ commit }, { kechengID, contentPaixu, kechengContent }) {
            return new Promise((resolve, reject) => {
                addyiciKechengContent({
                    kechengID, contentPaixu, kechengContent
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateKechengContent({ commit }, { id, kechengContent, contentPaixu }) {
            return new Promise((resolve, reject) => {
                UpdateKechengContent({
                    id, kechengContent, contentPaixu
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllYouhuizhengcePages({ commit }, { size, current, type, yhType }) {
            return new Promise((resolve, reject) => {
                GetAllYouhuizhengcePages({
                    size, current, type, yhType
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        AddYouhuizhengCe({ commit }, { youhuiType, xianzhijine, youhui, startDateTime, endDatetime, campusID, stuGradeIDs, useTimes }) {
            return new Promise((resolve, reject) => {
                AddYouhuizhengCe({
                    youhuiType, xianzhijine, youhui, startDateTime, endDatetime, campusID, stuGradeIDs, useTimes
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteYouHuizhengce({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                DeleteYouHuizhengce({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetYouhuizhengceInfos({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                GetYouhuizhengceInfos({
                    Id
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateYouhuiZhengce({ commit }, { id, youhuiType, xianzhijine, youhui, startDateTime, endDatetime, campusID, qiyeID, stuGradeIDs, useTimes }) {
            return new Promise((resolve, reject) => {
                UpdateYouhuiZhengce({
                    id, youhuiType, xianzhijine, youhui, startDateTime, endDatetime, campusID, qiyeID, stuGradeIDs, useTimes
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllQianDanInfoPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                getAllQianDanInfoPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteQianDanAndStu({ commit }, { qiandanID }) {
            return new Promise((resolve, reject) => {
                DeleteQianDanAndStu({
                    qiandanID
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllTelFromList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllTelFromList({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllZidingyiParams({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllZidingyiParams({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllStuGradeYoouhuizhengce({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetAllStuGradeYoouhuizhengce(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllPayMoneyStyleList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllPayMoneyStyleList({}).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllKechengBycampusID({ commit }, { campusID, jifeiStyleID }) {
            return new Promise((resolve, reject) => {
                GetAllKechengBycampusID({ campusID, jifeiStyleID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllClassByCampusID({ commit }, { campusID }) {
            return new Promise((resolve, reject) => {
                GetAllClassByCampusID({ campusID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetQiandanOtherMoneyList({ commit }) {
            return new Promise((resolve, reject) => {
                GetQiandanOtherMoneyList({}).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllWupingList({ commit }, { campusID }) {
            return new Promise((resolve, reject) => {
                GetAllWupingList({ campusID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getKechengbykechengID({ commit }, { kechengID }) {
            return new Promise((resolve, reject) => {
                getKechengbykechengID({ kechengID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        AddNewStuAndQianDan({ commit }, data) {
            return new Promise((resolve, reject) => {
                AddNewStuAndQianDan(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetQiandanInfo({ commit }, { qiandanID }) {
            return new Promise((resolve, reject) => {
                GetQiandanInfo({ qiandanID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetQiandanStaffInfo({ commit }, { qiandanID }) {
            return new Promise((resolve, reject) => {
                GetQiandanStaffInfo({ qiandanID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetQiandanPayMoneyList({ commit }, { qiandanID }) {
            return new Promise((resolve, reject) => {
                GetQiandanPayMoneyList({ qiandanID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetQiandanBuyKechengList({ commit }, { qiandanID }) {
            return new Promise((resolve, reject) => {
                GetQiandanBuyKechengList({ qiandanID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetqiandanSuppliesList({ commit }, { qiandanID }) {
            return new Promise((resolve, reject) => {
                GetqiandanSuppliesList({ qiandanID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetQiandanOtherMoneyListbyqdID({ commit }, { qiandanID }) {
            return new Promise((resolve, reject) => {
                GetQiandanOtherMoneyListbyqdID({ qiandanID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        updateqdbeizhu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                updateqdbeizhu(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateStuQianDan({ commit }, { qiandanid, buxikechengMoney, beizhu, bxKcData, stuName, stuSex, campusID, stuGradeID, buxiStateID, parentsTel, qiandanstaffinfo, paymoneystyle, isZhuanIntroduce,
            qiandandate, telFromID, oldSname, oldTname, shuxingValue, numberID, stuBrithday, dingjin, daijinquan, removedKCstr, wpData, zidingyiStuNO, wpPrice, zfData, zfAmount, selectYouhui, removeWPstr, removeZFstr }) {
            return new Promise((resolve, reject) => {
                UpdateStuQianDan({
                    qiandanid, buxikechengMoney, beizhu, bxKcData, stuName, stuSex, campusID, stuGradeID, buxiStateID, parentsTel, qiandanstaffinfo, paymoneystyle, isZhuanIntroduce,
                    qiandandate, telFromID, oldSname, oldTname, shuxingValue, numberID, stuBrithday, dingjin, daijinquan, removedKCstr, wpData, zidingyiStuNO, wpPrice, zfData, zfAmount, selectYouhui, removeWPstr, removeZFstr
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getAllXufeiQianDanInfoPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                getAllXufeiQianDanInfoPages(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetStuYuePages({ commit }, { size, current, campusID, stuName, stuGradeID, zidingyiStuID }) {
            return new Promise((resolve, reject) => {
                GetStuYuePages({ size, current, campusID, stuName, stuGradeID, zidingyiStuID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllDaijinquanLiushuiPages({ commit }, { size, current, campusID, zidingyiStuID, stuName, stuGradeID, jinbanStaffName }) {
            return new Promise((resolve, reject) => {
                GetAllDaijinquanLiushuiPages({ size, current, campusID, zidingyiStuID, stuName, stuGradeID, jinbanStaffName }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetQiandanSuppliesPages({ commit }, { size, current, campusID, zidingyiStuID, stuName, stuGradeID }) {
            return new Promise((resolve, reject) => {
                GetQiandanSuppliesPages({ size, current, campusID, zidingyiStuID, stuName, stuGradeID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetQiandanOtherMoneyPages({ commit }, { size, current, campusID, zidingyiStuID, stuName, stuGradeID }) {
            return new Promise((resolve, reject) => {
                GetQiandanOtherMoneyPages({ size, current, campusID, zidingyiStuID, stuName, stuGradeID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getAllQianDanInfoHetongPages({ commit }, { size, current, campusID, zidingyiStuID, stuName, stuGradeID, jinbanStaffName, Sqiandandate, Eqiandandate, yejistaffname }) {
            return new Promise((resolve, reject) => {
                getAllQianDanInfoHetongPages({ size, current, campusID, zidingyiStuID, stuName, stuGradeID, jinbanStaffName, Sqiandandate, Eqiandandate, yejistaffname }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllxufeistuList({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetAllxufeistuList(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllStukechengInfoList({ commit }, { stuID }) {
            return new Promise((resolve, reject) => {
                GetAllStukechengInfoList({ stuID }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        AddXufeiQiandan({ commit }, data) {
            return new Promise((resolve, reject) => {
                AddXufeiQiandan(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetczyouhuizhengcePages({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                GetczyouhuizhengcePages({ size, current }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        AddChongzhiyouhuizhengce({ commit }, { zongmoney, huodongmoney, sdate, edate }) {
            return new Promise((resolve, reject) => {
                AddChongzhiyouhuizhengce({ zongmoney, huodongmoney, sdate, edate }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        DeleteCzhuodong({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                DeleteCzhuodong({ Id }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        UpdateChongzhiyouhuizhengce({ commit }, { id, zongmoney, huodongmoney, sdate, edate }) {
            return new Promise((resolve, reject) => {
                UpdateChongzhiyouhuizhengce({ id, zongmoney, huodongmoney, sdate, edate }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        AddNewStuChongzhi({ commit }, data) {
            return new Promise((resolve, reject) => {
                AddNewStuChongzhi(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        Getkeyongchongzhihuodong({ commit }, { operateTime }) {
            return new Promise((resolve, reject) => {
                Getkeyongchongzhihuodong({ operateTime }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        AddOldStuChongzhi({ commit }, data) {
            return new Promise((resolve, reject) => {
                AddOldStuChongzhi(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetChongzhiLiushuiPages({ commit }, { size, current, campusID, stuName, stugradeID }) {
            return new Promise((resolve, reject) => {
                GetChongzhiLiushuiPages({
                    size, current, campusID, stuName, stugradeID
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetUserChongzhixiangqingPages({ commit }, { size, current, stuID }) {
            return new Promise((resolve, reject) => {
                GetUserChongzhixiangqingPages({
                    size, current, stuID
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getXiaoshouLiushuiPages({ commit }, { size, current, campusID, OrderNo, SuppliesName, staffName }) {
            return new Promise((resolve, reject) => {
                getXiaoshouLiushuiPages({
                    size, current, campusID, OrderNo, SuppliesName, staffName
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetTeachingSuppliesByTiaoma({ commit }, { tiaoma }) {
            return new Promise((resolve, reject) => {
                GetTeachingSuppliesByTiaoma({
                    tiaoma
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetTeachingSuppliesPages({ commit }, { size, current, campusID, name, typeName, specs, changpinTiaoma }) {
            return new Promise((resolve, reject) => {
                GetTeachingSuppliesPages({
                    size, current, campusID, name, typeName, specs, changpinTiaoma
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetTeachingSuppliesbuyPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetTeachingSuppliesbuyPages(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        SaveSaleWupingInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                SaveSaleWupingInfo(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetTodayXiaoshouliushui({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                GetTodayXiaoshouliushui({
                    size, current
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        DeleteTeachingSuppliesType({ commit }, { ID }) {
            return new Promise((resolve, reject) => {
                DeleteTeachingSuppliesType({
                    ID
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllTypeByPages({ commit }, { size, current }) {
            return new Promise((resolve, reject) => {
                GetAllTypeByPages({
                    size, current
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        AddTeachingSuppliesType({ commit }, { typeName }) {
            return new Promise((resolve, reject) => {
                AddTeachingSuppliesType({
                    typeName
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        UpdateTeachingSuppliesType({ commit }, { id, typeName }) {
            return new Promise((resolve, reject) => {
                UpdateTeachingSuppliesType({
                    id, typeName
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllTeachingSuppliesTypeList({ commit }) {
            return new Promise((resolve, reject) => {
                GetAllTeachingSuppliesTypeList({
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        Enter_supplies({ commit }, { campusID, id, acceptStaffId, typeId, name, specs, stockNum, stockUnit, addReason, addDate, buyPrice, salePrice, wupintiaoma }) {
            return new Promise((resolve, reject) => {
                Enter_supplies({
                    campusID, id, acceptStaffId, typeId, name, specs, stockNum, stockUnit, addReason, addDate, buyPrice, salePrice, wupintiaoma
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        DeleteTeachingSupplies({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                DeleteTeachingSupplies({
                    Id
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        UpdateWupingState({ commit }, { ID }) {
            return new Promise((resolve, reject) => {
                UpdateWupingState({
                    ID
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        Out_supplie({ commit }, { id, outNum, outReason, lingyongStaffId, jibanStaffId, outDate }) {
            return new Promise((resolve, reject) => {
                Out_supplie({
                    id, outNum, outReason, lingyongStaffId, jibanStaffId, outDate
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        outTeachingSuppliesJilu({ commit }, { size, current, suppliesID }) {
            return new Promise((resolve, reject) => {
                outTeachingSuppliesJilu({
                    size, current, suppliesID
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        EnterteachingSupplieJilu({ commit }, { size, current, suppliesID }) {
            return new Promise((resolve, reject) => {
                EnterteachingSupplieJilu({
                    size, current, suppliesID
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        AddTeachingSuppliesInfo({ commit }, { buyID, campusID, cgstaffName, typeId, name, specs, buyNum, stockUnit, reason, addDate }) {
            return new Promise((resolve, reject) => {
                AddTeachingSuppliesInfo({
                    buyID, campusID, cgstaffName, typeId, name, specs, buyNum, stockUnit, reason, addDate
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        delcaigou({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                delcaigou({
                    Id
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        caigoushenhe({ commit }, { Id, type }) {
            return new Promise((resolve, reject) => {
                caigoushenhe({
                    Id, type
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetKechengInfoById({ commit }, { Id }) {
            return new Promise((resolve, reject) => {
                GetKechengInfoById({
                    Id
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        UpdateKechengInfo({ commit }, { id, kechengName, subjectID, buxiStyleID, is1v1KC, classTimeStyleID, kechengOriginalPrice, kechengprice, keshiNum, buyZonjia,
            byMonthOrDay, isShow, ZSid, jifeiStyleID, campusID, qiyeID, bgColor, perdaysqj, perkeshiqj, qingjiaTimes, iskoukeshi, showInApp }) {
            return new Promise((resolve, reject) => {
                UpdateKechengInfo({
                    id, kechengName, subjectID, buxiStyleID, is1v1KC, classTimeStyleID, kechengOriginalPrice, kechengprice, keshiNum, buyZonjia,
                    byMonthOrDay, isShow, ZSid, jifeiStyleID, campusID, qiyeID, bgColor, perdaysqj, perkeshiqj, qingjiaTimes, iskoukeshi, showInApp
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetQiandanInfoByQiandanID_ht({ commit }, { qiandanID }) {
            return new Promise((resolve, reject) => {
                GetQiandanInfoByQiandanID_ht({
                    qiandanID
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        SaveQiandanHetong({ commit }, { qiandanID, imgurl }) {
            return new Promise((resolve, reject) => {
                SaveQiandanHetong({
                    qiandanID, imgurl
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        Deletehetong({ commit }, { qiandanID, newhetong }) {
            return new Promise((resolve, reject) => {
                Deletehetong({
                    qiandanID, newhetong
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        DeleteImgs({ commit }, { qiandanID, key }) {
            return new Promise((resolve, reject) => {
                DeleteImgs({
                    qiandanID, key
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllQiandanshenpiInfoPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetAllQiandanshenpiInfoPages(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        DeleteQiandanshengPiInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                DeleteQiandanshengPiInfo(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        PassQiandanShenpi({ commit }, data) {
            return new Promise((resolve, reject) => {
                PassQiandanShenpi(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        qiandanshenpibohui({ commit }, data) {
            return new Promise((resolve, reject) => {
                qiandanshenpibohui(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        panduanStuName({ commit }, data) {
            return new Promise((resolve, reject) => {
                panduanStuName(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetYxStuInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetYxStuInfo(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },

        setweikuan({ commit }, data) {
            return new Promise((resolve, reject) => {
                setweikuan(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getCampusTostaff({ commit }, data) {
            return new Promise((resolve, reject) => {
                getCampusTostaff(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getPayStyle({ commit }, data) {
            return new Promise((resolve, reject) => {
                getPayStyle(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getqiandanMessage({ commit }, data) {
            return new Promise((resolve, reject) => {
                getqiandanMessage(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllDaizhifuqiandanPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                GetAllDaizhifuqiandanPages(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        uploadFileToAliOss({ commit }, data) {
            return new Promise((resolve, reject) => {
                uploadFileToAliOss(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        }

    },
}