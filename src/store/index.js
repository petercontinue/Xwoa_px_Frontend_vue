import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import staff from './module/staff'
import kehoupingjia from './module/jiaowuManage/kehoupingjia'
import weiqingjia from '@/store/module/jiaowuManage/jiaxiaohulian/weiqingjia'
import weizuoye from '@/store/module/jiaowuManage/jiaxiaohulian/weizuoye'
import stuyueke from '@/store/module/jiaowuManage/jiaxiaohulian/stuyueke'
import teacheryueke from '@/store/module/jiaowuManage/jiaxiaohulian/teacheryueke'
import jwpublic from '@/store/module/jiaowuManage/jwpublic'
import laoxueyuanhuifang from '@/store/module/jiaowuManage/jiaxiaohulian/laoxueyuanhuifang'
import systemSetting from '@/store/module/jigouguanli/systemSetting'


import paikexiaoke from '@/store/module/jiaowuManage/paikexiaoke/paikexiaoke'
import qiandaoqiantuiliushui from '@/store/module/jiaowuManage/paikexiaoke/qiandaoqiantui/qiandaoqiantuiliushui'
import jiaxiaohulian from '@/store/module/jiaowuManage/jiaxiaohulian'
import shangkejilu from '@/store/module/jiaowuManage/shangkejilu/shangkejilu'
import zhaoshengbaoming from '@/store/module/zhaoshengbaoming/zhaoshengbaoming'
import gongziManage from '@/store/module/caiwuManage/gongziManage'
import feiyongtongji from '@/store/module/caiwuManage/feiyongtongji'
import caiwuliushui from '@/store/module/caiwuManage/caiwuliushui'
import shujutongji from '@/store/module/shujutongji/shujutongji'
import stuManage from '@/store/module/jiaowuManage/stuManage/stuManage'
import stuClass from '@/store/module/jiaowuManage/stuClass/stuClass'
import stukecheng from '@/store/module/jiaowuManage/stuKecheng/stukecheng'
import yixiangxueyuan from '@/store/module/zhaoshengbaoming/yixiangxueyuan'
import wxmall from '@/store/module/zhaoshengbaoming/wxmall' 
import tuifei from '@/store/module/caiwuManage/tuifei'
import shitingke from '@/store/module/zhaoshengbaoming/shitingke'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    staff,
    kehoupingjia,
    weiqingjia,
    weizuoye,
    stuyueke,
    teacheryueke,
    jwpublic,
    laoxueyuanhuifang,
    systemSetting,
    jiaxiaohulian,
    paikexiaoke,//排课消课
    qiandaoqiantuiliushui,//签到签退
    shangkejilu,//上课记录
    stuManage,//学员管理
    stukecheng,//学员班级
    stuClass, //学员班级
    zhaoshengbaoming,
    yixiangxueyuan,
    gongziManage,
    feiyongtongji,
    caiwuliushui,
    shujutongji,
    wxmall,
    tuifei,//退费管理
    shitingke//试听课
  }
})
