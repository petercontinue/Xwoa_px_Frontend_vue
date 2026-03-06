import {
    getqiandaoliushuiPage_api
} from '../../../../../api/jiaowuManage/paikexiaoke/qiandaoqiantui/qiandaoqiantuiliushui'

export default {
    state:{
        qiandaoliushuiList:[],
    },
    mutations:{
        setsutqiandaoliushuiList(state ,list){
            state.qiandaoliushuiList=list
        },
    },
    actions:{
        getqiandaoliushuiPage({commit},paramobj){
            return new Promise((resolve, reject) => {
                getqiandaoliushuiPage_api(paramobj).then(res => {
                    commit('setsutqiandaoliushuiList', res)
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        
    }
}