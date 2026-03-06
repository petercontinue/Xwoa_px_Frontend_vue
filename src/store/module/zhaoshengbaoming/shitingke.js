import * as shiting from '@/api/zhaoshengbaoming/shitingke'

export default {
    state: {
    },
    mutations: {
    },
    actions: {

        GetAllshitingkePages({ commit }, data) {
            return new Promise((resolve, reject) => {
                shiting.GetAllshitingkePages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        SaveshitingkechengInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                shiting.SaveshitingkechengInfo(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deletShitingke({ commit }, data) {
            return new Promise((resolve, reject) => {
                shiting.deletShitingke(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        }
    }
}
