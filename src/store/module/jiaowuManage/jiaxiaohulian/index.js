import {
    addXiangce_api,
    getXiangcePage_api,
    delXiangce,
    editXiangce,
    getXiangceImagePage,
    GetXiangceInfo,
    addXiangceImage,
    delXiangceImage
} from '@/api/jiaowuManage/jiaxiaohulian/xiangce'
import {
    getManyiduPage_api,
    delManyidu_api
} from '@/api/jiaowuManage/jiaxiaohulian/manyidupingjia'
import {
    getStuFeedback_api
} from '@/api/jiaowuManage/jiaxiaohulian/stufeedback'
import {
    getPxbooksPage_api,
    delBook_api,
    getPxbook_api,
    editBook_api,
    inboundRecordPage_api,
    outboundRecordsPage_api,
    getBorrowingRecordsPage_api,
    borrowingRecordsPage_api,
    returnBook_api,
    warehousing_api,
    outOfStock_api,
    borrowBooks_api,
    tushuInfoMuban
} from '@/api/jiaowuManage/jiaxiaohulian/books'

import {
    getPxjiazhanggonggaoPage_api,
    delPxjiazhanggonggao_api,
    addPxjiazhanggonggao_api,
    getPxjiazhanggonggao_api,
    editPxjiazhanggonggao_api,
    GetStuweixinPages,
    editStuWxInfo,
    freeze,
    thaw,
    resetPassword,
    unbindWeChat,
    GetStuWechatMessagePages,
    GetAllTuisongType,
    wechatGroupSending,
    GetAllClassInfoList,
    classGroupPosting,
    campusMassRelease
} from '@/api/jiaowuManage/jiaxiaohulian/jiazhangweigonggao'
import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        ManyiduList: [],
        StuFeedback: [],
        PxbooksList: [],
    },
    mutations: {
        setManyiduList(state, list) {
            state.ManyiduList = list
        },
        setStuFeedback(state, list) {
            state.StuFeedback = list
        },
        setPxbooksList(state, list) {
            state.PxbooksList = list
        },
    },
    actions: {
        addXiangce({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addXiangce_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getXiangcePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getXiangcePage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getManyiduPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getManyiduPage_api(paramobj).then(res => {
                    commit('setManyiduList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delManyidu({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delManyidu_api(paramobj).then(res => {

                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getStuFeedback({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getStuFeedback_api(paramobj).then(res => {
                    commit('setStuFeedback', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPxbooksPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getPxbooksPage_api(paramobj).then(res => {
                    commit('setPxbooksList', res)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delBook({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delBook_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPxbook({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getPxbook_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editBook({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                editBook_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        inboundRecordPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                inboundRecordPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        outboundRecordsPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                outboundRecordsPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getBorrowingRecordsPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getBorrowingRecordsPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        borrowingRecordsPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                borrowingRecordsPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        returnBook({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                returnBook_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        warehousing({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                warehousing_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        outOfStock({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                outOfStock_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        borrowBooks({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                borrowBooks_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        tushuInfoMubandowload({commit},paramobj){
            return new Promise((resolve, reject) => {
                tushuInfoMuban(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPxjiazhanggonggaoPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getPxjiazhanggonggaoPage_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delPxjiazhanggonggao({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delPxjiazhanggonggao_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addPxjiazhanggonggao({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addPxjiazhanggonggao_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getPxjiazhanggonggao({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getPxjiazhanggonggao_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editPxjiazhanggonggao({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                editPxjiazhanggonggao_api(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetStuweixinPages({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetStuweixinPages(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editStuWxInfo({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                editStuWxInfo(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        freeze({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                freeze(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        thaw({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                thaw(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        resetPassword({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                resetPassword(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        unbindWeChat({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                unbindWeChat(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetStuWechatMessagePages({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetStuWechatMessagePages(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllTuisongType({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetAllTuisongType(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        wechatGroupSending({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                wechatGroupSending(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllClassInfoList({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetAllClassInfoList(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        classGroupPosting({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                classGroupPosting(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        campusMassRelease({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                campusMassRelease(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delXiangce({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delXiangce(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editXiangce({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                editXiangce(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getXiangceImagePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                getXiangceImagePage(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetXiangceInfo({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                GetXiangceInfo(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addXiangceImage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                addXiangceImage(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        delXiangceImage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                delXiangceImage(paramobj).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}