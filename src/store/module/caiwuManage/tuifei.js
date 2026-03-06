import * as tf from '@/api/caiwuManage/tuifei'
export default {
    state: {
    },
    mutations: {
    },
    actions: {
        gettuifeitongji({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.gettuifeitongji(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTuifeiPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.getTuifeiPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getshenpikaiguan({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.getshenpikaiguan(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        shengpibohui({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.shengpibohui(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        tongguoShenpi({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.tongguoShenpi(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTuifeishenpiPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.getTuifeishenpiPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        caiwugetallstu({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.caiwugetallstu(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        caiwugetpaystyle({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.caiwugetpaystyle(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        caiwugetallStaff({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.caiwugetallStaff(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        caiwugetStuqiandan({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.caiwugetStuqiandan(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTuifeiDetail({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.getTuifeiDetail(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getKechengfeiDetail({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.getKechengfeiDetail(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getshanpingDetail({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.getshanpingDetail(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getZafeiDetail({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.getZafeiDetail(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        PartOtherTuiFei({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.PartOtherTuiFei(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        allOtherTuiFei({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.allOtherTuiFei(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        PartWuPingTuiFei({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.PartWuPingTuiFei(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        allPartWuPingTuiFei({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.allPartWuPingTuiFei(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Partxuefeioffbufen({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.Partxuefeioffbufen(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Allxuefeioff({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.Allxuefeioff(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Alloff({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.Alloff(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deletetuifei({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.deletetuifei(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        tuiyueBystu({ commit }, data) {
            return new Promise((resolve, reject) => {
                tf.tuiyueBystu(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

    }
}
