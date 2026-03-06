import * as feiyongtongji from '@/api/caiwuManage/feiyongtongji';

import { setToken, getToken } from '@/libs/util'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        getCampusYearPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getCampusYearPage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getCampusMonthPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getCampusMonthPage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGerenYearPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getGerenYearPage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGerenMonthPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getGerenMonthPage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getGerenMonthDetailPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getGerenMonthDetailPage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getDetailedIncomeDetails({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getDetailedIncomeDetails_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getDetailedZafeiDetailsPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getDetailedZafeiDetailsPage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getDetailedShangpingDetailsPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getDetailedShangpingDetailsPage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getYejitongbihuanbi({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getYejitongbihuanbi_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKemushoufeiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getKemushoufeiPage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKemukehaoPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getKemukehaoPage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKemuyufeePage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getKemuyufeePage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getBanjishoufeiPage({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getBanjishoufeiPage_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getShoufeiDetail({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getShoufeiDetail_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKucunxuefei({ commit }, paramobj) {
            return new Promise((resolve, reject) => {
                feiyongtongji.getKucunxuefei_api(paramobj).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        
        
    }
}