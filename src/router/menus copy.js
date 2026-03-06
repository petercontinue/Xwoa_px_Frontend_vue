import Main from '../view/main/main.vue'
import parentView from '../view/parent-view/parent-view.vue'
export default [
    {
        path: '/zhaoshengbaoming',
        name: '招生报名',
        meta: {
            icon: 'md-person-add',
            title: '招生报名'
        },
        component: Main,
        children: [
            {
                path: 'baomingjiaofei',
                name: '微营销',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '微营销'
                },
                component: parentView,
                children: [
                    {
                        path: '/zhaoxuexiu',
                        name: "招生活动模板",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: "招生活动模板"
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/zhaoxuexiu.vue')
                    },
                    {
                        path: '/h5creat',
                        name: '制作招生活动模板',
                        meta: {
                            icon: "ios-arrow-forward",
                            title: "制作招生活动模板",
                            hideInMenu: true,
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/h5creat.vue')
                    },
                    {
                        path: '/zhaoxuexiuyulan',
                        name: '招学秀预览',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '招学秀预览',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/zhaoxuexiuyulan.vue')
                    },

                    {
                        path: '/weixinchongzhi',
                        name: "微信充值",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: "微信充值"
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/weixinchongzhi.vue')
                    },
                    {
                        path: '/weuixintoupiao',
                        name: "微信投票",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: "微信投票"
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/weuixintoupiao.vue')
                    },
                    {
                        path: '/zhutiSetting',
                        name: "主题设置",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: "主题设置",
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/zhutiSetting.vue')
                    },
                    {
                        path: '/toupiaostuinfo',
                        name: "投票参赛学员",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: "投票参赛学员",
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/toupiaostuinfo.vue')
                    },
                    {
                        path: "/yingxiaohuodong",
                        name: "营销活动设置",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: "营销活动设置",
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/yingxiaohuodong.vue')
                    },
                    // {
                    //     path: '/weixinkanjia',
                    //     name: "微信砍价",
                    //     meta: {
                    //         icon: "ios-arrow-forward",
                    //         title: "微信砍价"
                    //     },
                    // },
                    // {
                    //     path: '/weixinpingtuan',
                    //     name: "微信拼团",
                    //     meta: {
                    //         icon: "ios-arrow-forward",
                    //         title: "微信拼团"
                    //     },
                    // },
                    {
                        path: '/xinyunchoujiang',
                        name: "幸运抽奖",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: "幸运抽奖"
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/xinyunchoujiang.vue')
                    },
                    {
                        path: "/coupons",
                        name: "优惠券",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: "优惠券",
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/coupons.vue')
                    },
                    {
                        path: '/dongtaifenxiang',
                        name: "动态分享",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: "动态分享"
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/dongtaifenxiang.vue')
                    },
                    {
                        path: '/jiangpinSetting',
                        name: '奖品设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '奖品设置',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/jiangpinSetting.vue')
                    },
                    {
                        path: '/huojiangliushui',
                        name: '奖品流水',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '奖品流水',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/weixinyingxiao/huojiangliushui.vue')
                    },
                    // {
                    //     path: '/xianshiqianggou',
                    //     name: "限时抢购",
                    //     meta: {
                    //         icon: "ios-arrow-forward",
                    //         title: "限时抢购"
                    //     },
                    // }
                ]
            },
            {
                path: 'wxshangcheng',
                name: '小程序商城',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '小程序商城'
                },
                component: parentView,
                children: [
                    {
                        path: '/goodsManage',
                        name: '商城商品',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '商城商品'
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/shangchengGoods.vue')
                    },
                    {
                        path: '/addnewgoods',
                        name: '添加商品',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '添加商品',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/addnewgoods.vue')
                    },
                    {
                        path: '/goodCategory',
                        name: '商品类别管理',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '商品类别管理',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/goodCategory.vue')
                    },
                    {
                        path: '/ordersManage',
                        name: '订单管理',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '订单管理'
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/ordersManage.vue')
                    },
                    {
                        path: '/shoppingCart',
                        name: '购物车',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '购物车'
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/shoppingCart.vue')
                    },
                    {
                        path: '/returnGoodsManage',
                        name: '退货管理',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '退货管理'
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/tuihuoManage.vue')
                    },
                    {
                        path: '/evaluationManage',
                        name: '评价管理',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '评价管理'
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/pingjiaManage.vue')
                    },
                    {
                        path: '/saleLiushui',
                        name: '销售流水',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '销售流水'
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/saleliushui.vue')
                    },
                    {
                        path: '/shangchengUsers',
                        name: '商城用户',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '商城用户'
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/wscUser.vue')
                    },
                    {
                        path: '/sanjiFanyong',
                        name: '三级返佣',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '三级返佣'
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/sanjifanyong.vue')
                    },
                    {
                        path: '/buytuikeinfo',
                        name: '购买成为推客记录',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '返佣比率设置',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/buytuikeinfo.vue')
                    },
                    {
                        path: '/lookTeam',
                        name: '查看团队',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '查看团队',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/lookTeam.vue')
                    },
                    {
                        path: '/fanyongrank',
                        name: '返佣排名',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '返佣排名',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/fanyongrank.vue')
                    },
                    {
                        path: '/tixianshenhe',
                        name: '提现审核',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '提现审核',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/wxmall/tixianshenhe.vue')
                    },
                    {
                        path: '/shangchengSetting',
                        name: '商城设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '商城设置',
                            hideInMenu: true
                        },
                        // component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/kechengshezhi.vue')
                    },
                ]
            },
            // {
            //     path: "shitinginfo",
            //     name: "试听课管理",
            //     meta: {
            //         icon: 'md-arrow-dropdown-circle',
            //         title: '试听课管理'
            //     },
            //     component: parentView,
            //     children: [{
            //         path: '/shitingkecheng',
            //         name: '试听课',
            //         meta: {
            //             icon: 'md-funnel',
            //             title: '试听课'
            //         },
            //         component: () => import('@/view/zhaoshengbaoming/shitingke/shitingkeList.vue')
            //     }, {
            //         path: '/shitongrecords',
            //         name: '试听记录',
            //         meta: {
            //             icon: 'md-funnel',
            //             title: '试听记录'
            //         },
            //         component: () => import('@/view/zhaoshengbaoming/shitingke/shitingrecords.vue')
            //     }]
            // },
            {
                path: 'yixiangxueyuan',
                name: '意向学员',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '意向学员'
                },
                component: parentView,
                children: [
                    {
                        path: '/yixiangxueyuan',
                        name: '意向学员管理',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '意向学员管理'
                        },
                        component: () => import('@/view/zhaoshengbaoming/yixiangStu/yxStu.vue')
                    },
                    {
                        path: '/genjintixing',
                        name: '跟进提醒',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '跟进提醒'
                        },
                        component: () => import('@/view/zhaoshengbaoming/yixiangStu/genjinTip.vue')
                    },
                    {
                        path: '/weixinliuyan',
                        name: '微信留言',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '微信留言',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/zhaoshengbaoming/yixiangStu/weixinLiuyan.vue')
                    },
                    {
                        path: '/genjinliushui',
                        name: '跟进流水',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '跟进流水'
                        },
                        component: () => import('@/view/zhaoshengbaoming/yixiangStu/genjinLiushui.vue')
                    },
                    {
                        path: '/yaoyuedaofangliushui',
                        name: '邀约到访流水',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '邀约到访流水'
                        },
                        component: () => import('@/view/zhaoshengbaoming/yixiangStu/yaoyueDaofangLiushui.vue')
                    },
                    {
                        path: '/shitingkecheng',
                        name: '试听活动',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '试听活动'
                        },
                        component: () => import('@/view/zhaoshengbaoming/shitingke/shitingkeList.vue')
                    },
                    {
                        path: '/shitingliushui',
                        name: '试听流水',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '试听流水'
                        },
                        component: () => import('@/view/zhaoshengbaoming/yixiangStu/shitingLiushui.vue')
                    },
                    {
                        path: '/yixiangqiandanliushui',
                        name: '意向签单流水',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '意向签单流水'
                        },
                        component: () => import('@/view/zhaoshengbaoming/yixiangStu/yxqiandanLiushui.vue')
                    },
                    {
                        path: '/zhaoshengmubiao',
                        name: '招生目标',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '招生目标'
                        },
                        component: () => import('@/view/zhaoshengbaoming/yixiangStu/zhaoshengMubiao.vue')
                    },
                ]
            },
            {
                path: 'baomingjiaofei',
                name: '报名交费',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '报名交费'
                },
                component: parentView,
                children: [
                    {
                        path: '/kechengshezhi',
                        name: '课程设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '课程设置',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/kechengshezhi.vue')
                    }, {
                        path: '/kemushezhi',
                        name: '科目设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '科目设置',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/kemushezhi.vue')
                    }, {
                        path: '/kechengcontent',
                        name: '课程内容设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '课程内容设置',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/kechengcontent.vue')
                    },
                    {
                        path: "/youhuizhengce",
                        name: "报名优惠政策",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '报名优惠政策',
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/youhuizhengce.vue')
                    }, {
                        path: "/xinqian",
                        name: "新签报名",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '新签报名',
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/xinqian.vue')
                    },
                    {
                        path: '/addxinqian',
                        name: '添加新签',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '添加新签',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/addxinqian.vue')
                    },
                    {
                        path: '/updateqiandan',
                        name: '修改签单',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '修改签单',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/updateqiandan.vue')
                    },
                    {
                        path: '/qiandaninfo',
                        name: '签单详情',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '签单详情',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/xinqianInfo.vue')
                    },
                    {
                        path: "/xufei",
                        name: "续费",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '续费',
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/xufei.vue')
                    },
                    {
                        path: '/addxufei',
                        name: '添加续费',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '添加续费',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/addxufei.vue')
                    },
                    {
                        path: "/qiandanshenpi",
                        name: "签单审批",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: "签单审批"
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/qiandanshenpi.vue')
                    },
                    {
                        path: "/chongzhi",
                        name: "充值",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '充值',
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/chongzhi.vue')
                    },
                    {
                        path: '/chongzhiyhzc',
                        name: '充值优惠政策',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '充值优惠政策',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/chongzhiyhzc.vue')
                    },
                    {
                        path: '/addnewchongzhi',
                        name: '新生充值',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '新生充值',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/addnewchongzhi.vue')
                    },
                    {
                        path: '/chongzhiliushui',
                        name: '充值流水',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '充值流水',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/chongzhiliushui.vue')
                    },

                    {
                        path: "/daijinquanliushui",
                        name: "代金券流水",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '代金券流水',
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/daijinquanliushui.vue')
                    }, {
                        path: "/qdshangpinliushui",
                        name: "签单商品流水",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '签单商品流水',
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/qdshangpinliushui.vue')
                    }, {
                        path: "/zafeiliushui",
                        name: "杂费流水",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '杂费流水',
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/zafeiliushui.vue')
                    }, {
                        path: "/hetong",
                        name: "合同",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '合同',
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/hetong.vue')
                    }, {
                        path: "/hetongguanli",
                        name: "合同管理",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '合同管理',
                            hideInMenu: true
                        },
                        component: () => import('@/view/zhaoshengbaoming/baomingjiaofei/hetongguanli.vue')
                    }
                ]
            },

            {
                path: 'jinxiaocun',
                name: '进销存',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '进销存'
                },
                component: parentView,
                children: [
                    {
                        path: '/jxcshouyintai',
                        name: '进销存收银台',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '进销存收银台'
                        },
                        component: () => import('@/view/zhaoshengbaoming/jinxiaocun/jxcshouyintai.vue')
                    }, {
                        path: '/xiaoshouliushui',
                        name: '销售记录',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '销售记录'
                        },
                        component: () => import('@/view/zhaoshengbaoming/jinxiaocun/xiaoshouliushui.vue')
                    }, {
                        path: '/shangpinguanli',
                        name: '商品管理',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '商品管理'
                        },
                        component: () => import('@/view/zhaoshengbaoming/jinxiaocun/shangpinguanli.vue')
                    },
                    {
                        path: '/goodscategory',
                        name: '商品类别',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '商品类别',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/zhaoshengbaoming/jinxiaocun/goodscategory.vue')
                    },
                    {
                        path: '/caigoushenqing',
                        name: '采购申请审批',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '采购申请审批'
                        },
                        component: () => import('@/view/zhaoshengbaoming/jinxiaocun/caigoushenqing.vue')
                    }
                ]
            },
        ]
    },
    {
        path: '/jiaowuManage',
        name: '教务管理',
        meta: {
            icon: 'logo-buffer',
            title: '教务管理'
        },
        component: Main,
        children: [
            {
                path: 'tree_select_page',
                name: '学员管理',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '学员管理'
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/stuFiles',
                        name: '学员档案',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学员档案'
                        },
                        component: () => import('@/view/jiaowuManage/stuManage/stuFiles.vue')
                    },

                    {
                        path: '/stuTearch',
                        name: '分配班主任',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '分配班主任'
                        },
                        component: () => import('@/view/jiaowuManage/stuManage/stuTearch.vue')
                    },
                    {
                        path: '/stuCard',
                        name: '学员卡',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学员卡'
                        },
                        component: () => import('@/view/jiaowuManage/stuManage/stuCard.vue')
                    },
                    {
                        path: '/stuIntegar',
                        name: '学员积分',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学员积分'
                        },
                        component: () => import('@/view/jiaowuManage/stuManage/stuIntegar.vue')
                    },
                    {
                        path: '/stuGrage',
                        name: '学员年级/年龄段 -升级',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学员年级/年龄段 -升级'
                        },
                        component: () => import('@/view/jiaowuManage/stuManage/stuGrage.vue')
                    },
                    {
                        path: '/stuBirthDay',
                        name: '学员生日',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学员生日'
                        },
                        component: () => import('@/view/jiaowuManage/stuManage/stuBirthDay.vue')
                    },
                    {
                        path: '/stuStay',
                        name: '住宿',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '住宿'
                        },
                        component: () => import('@/view/jiaowuManage/stuManage/stuStay.vue')
                    },
                    {
                        path: '/stuQiandanInfo',
                        name: '学员签单详情',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学员签单详情',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/jiaowuManage/stuManage/stuQiandanInfo.vue')
                    },
                    {
                        path: '/gradejilu',
                        name: '调级记录',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '调级记录',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/jiaowuManage/stuManage/gradejilu.vue')
                    },


                ]
            },
            {
                path: 'tree_select_page',
                name: '学员课程',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '学员课程'
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/stukecheng',
                        name: '学员培训课程',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学员培训课程'
                        },
                        component: () => import('@/view/jiaowuManage/stuKecheng/stukecheng.vue')
                    },
                    {
                        path: '/Zhuangsong',
                        name: '转送',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '转送'
                        },
                        component: () => import('@/view/jiaowuManage/stuKecheng/Zhuangsong.vue')
                    },
                    {
                        path: '/Zengsong',
                        name: '赠送',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '赠送'
                        },
                        component: () => import('@/view/jiaowuManage/stuKecheng/Zengsong.vue')
                    },
                    {
                        path: '/KCchangeliushui',
                        name: '课程变动流水',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '课程变动流水'
                        },
                        component: () => import('@/view/jiaowuManage/stuKecheng/KCchangeliushui.vue')
                    }, {
                        path: '/stuScore',
                        name: '成绩',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '成绩'
                        },
                        component: () => import('@/view/jiaowuManage/stuKecheng/stuScore.vue')
                    },
                    {
                        path: '/stutKaoJi',
                        name: '考级',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '考级'
                        },
                        component: () => import('@/view/jiaowuManage/stuKecheng/stutKaoJi.vue')
                    },
                    {
                        path: '/kaojishenqing',
                        name: '考级申请',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '考级申请',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/jiaowuManage/stuKecheng/kaojishenqing.vue')
                    },
                    {
                        path: '/stuFazheng',
                        name: '发证',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '发证'
                        },
                        component: () => import('@/view/jiaowuManage/stuKecheng/stuFazheng.vue')
                    },
                    {
                        path: '/kcZhengshuSetting',
                        name: '课程证书设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '课程证书设置',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/jiaowuManage/stuKecheng/kcZhengshuSetting.vue')
                    },

                ]
            },
            {
                path: 'tree_select_page',
                name: '学员班级',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '学员班级'
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/ClassKecheng',
                        name: '班课',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '班课'
                        },
                        component: () => import('@/view/jiaowuManage/stuClass/ClassKecheng.vue')
                    },
                    {
                        path: '/OneByOneClass',
                        name: '一对一班级',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '一对一班级'
                        },
                        component: () => import('@/view/jiaowuManage/stuClass/OneByOneClass.vue')
                    },
                    {
                        path: '/zhuanbanchaban',
                        name: '转班插班',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '转班插班',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/jiaowuManage/stuClass/zhuanbanchaban.vue')
                    },

                ]
            },

            {
                path: 'tree_select_page',
                name: '排课消课',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '排课消课'
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/paike',
                        name: '排课',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '排课'
                        },
                        component: () => import('@/view/jiaowuManage/paikexiaoke/paike.vue')
                    },
                    {
                        path: "/kebiaoview",
                        name: "课表",
                        meta: {
                            title: "课表",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/paikexiaoke/kebiaoview.vue')
                    },
                    {
                        path: "/xiaokeqiandao",
                        name: "消课签到",
                        meta: {
                            title: "消课签到",
                            icon: 'ios-arrow-forward',
                            // hideInMenu: true
                        },
                        component: () => import('@/view/jiaowuManage/paikexiaoke/xiaokeqiandao.vue')
                    },
                    {
                        path: '/touxiangcaiji',
                        name: '头像采集',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '头像采集',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/jiaowuManage/paikexiaoke/touxiangcaiji')
                    },
                    {
                        path: "/kaoqingliushui",
                        name: "考勤流水",
                        meta: {
                            title: "考勤流水",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/paikexiaoke/kaoqingliushui.vue')
                    },
                    {
                        path: "/kaoqingcount",
                        name: "考勤统计",
                        meta: {
                            title: "考勤统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/paikexiaoke/kaoqingcount.vue')
                    },
                ]
            },
            {
                path: 'tree_select_page',
                name: '上课记录',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '上课记录'
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/stukehao',
                        name: '学员上课记录',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学员上课记录'
                        },
                        component: () => import('@/view/jiaowuManage/shangkejilu/stukehao.vue')
                    },
                    {
                        path: '/teacherkehao',
                        name: '教师上课记录',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '教师上课记录'
                        },
                        component: () => import('@/view/jiaowuManage/shangkejilu/teacherkehao.vue')
                    },
                    {
                        path: '/remainkeshishow',
                        name: '剩余课时',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '剩余课时'
                        },
                        component: () => import('@/view/jiaowuManage/shangkejilu/remainkeshishow.vue')
                    },
                    {
                        path: '/clearkeshi',
                        name: '学员课时清零记录',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学员课时清零记录'
                        },
                        component: () => import('@/view/jiaowuManage/shangkejilu/clearkeshi.vue')
                    },
                    {
                        path: '/remainkeshi',
                        name: '剩余课时详情',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '剩余课时详情',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/jiaowuManage/shangkejilu/remainkeshi.vue')
                    },
                    {
                        path: '/remainday',
                        name: '剩余天数详情',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '剩余天数详情',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/jiaowuManage/shangkejilu/remainday.vue')
                    },
                    {
                        path: '/xuefeixiangqiang',
                        name: '学费详情',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学费详情',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/jiaowuManage/shangkejilu/xuefeixiangqiang.vue')
                    },
                ]
            },

            {
                path: 'tree_select_page',
                name: '课后评价',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '课后评价'
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/teacherfankui',
                        name: '老师课后点评',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '老师课后点评'
                        },
                        component: () => import('@/view/jiaowuManage/kehoupingjia/renkelaoshi.vue')
                    },
                    {
                        path: "/stupjteacher",
                        name: "学员评价老师",
                        meta: {
                            title: "学员评价老师",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/kehoupingjia/xueyuanpinjialaoshi.vue')
                    },
                ]
            },
            {
                path: 'tree_select_page',
                name: '家校互联',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '家校互联'
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/weixinqunfa',
                        name: '微信群发',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '微信群发'
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/weixinqufa.vue')
                    },
                    {
                        path: "/weiqingjia",
                        name: "微请假",
                        meta: {
                            title: "微请假",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/weiqingjia.vue')
                    },
                    {
                        path: "/weizuoye",
                        name: "微作业",
                        meta: {
                            title: "微作业",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/weizuoye.vue')
                    },
                    {
                        path: "/xuesheyueke",
                        name: "约课(学员发起)",
                        meta: {
                            title: "约课(学员发起)",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/stuyueke.vue')
                    },
                    {
                        path: "/laoshiyueke",
                        name: "约课(老师发布)",
                        meta: {
                            title: "约课(老师发布)",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/jiaoshiyueke.vue')
                    },
                    {
                        path: "/laoxueyuanhuifan",
                        name: "老学员回访",
                        meta: {
                            title: "老学员回访",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/laoxueyuanhuifang.vue')
                    },
                    {
                        path: "/dianzixiangche",
                        name: "电子相册",
                        meta: {
                            title: "电子相册",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/photoalbum.vue')
                    },
                    {
                        path: "/manyidupingjia",
                        name: "满意度评价",
                        meta: {
                            title: "满意度评价",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/manyidupingjia.vue')
                    },
                    {
                        path: "/xueyuanfankui",
                        name: "学员反馈",
                        meta: {
                            title: "学员反馈",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/stufeedback.vue')
                    },
                    {
                        path: "/tushujieyue",
                        name: "图书借阅",
                        meta: {
                            title: "图书借阅",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/books.vue')
                    },
                    {
                        path: "/jieshujilu",
                        name: "借阅记录",
                        meta: {
                            title: "借书记录",
                            hideInMenu: true,
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/jieshujilu.vue')
                    },
                    {
                        path: "/jiazhangweigonggao",
                        name: "家长微公告",
                        meta: {
                            title: "家长微公告",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/jiazhangweigonggao.vue')
                    },
                    {
                        path: "/xueyuanweixinzhanhao",
                        name: "学员微信账号",
                        meta: {
                            title: "学员微信账号",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/xueyuanweixinzhanhao.vue')
                    },
                    {
                        path: "/photomanage",
                        name: "相册照片管理",
                        meta: {
                            title: "相册照片管理",
                            icon: 'ios-arrow-forward',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/jiaowuManage/jiaxiaohulian/photomanage.vue')
                    },
                ]
            },


        ]
    },

    {
        path: '/caiwuManage',
        name: '财务管理',
        meta: {
            icon: 'ios-analytics',
            title: '财务管理'
        },
        component: Main,
        children: [
            {
                path: '/tuifeimanage',
                name: '退费管理',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '退费管理'
                },
                component: () => import('@/view/caiwuManage/tuifeiManage.vue')
            },
            {
                path: '/tuifeiShenpi',
                name: '退费审批',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '退费审批'
                },
                component: () => import('@/view/caiwuManage/tuifeiShenpi.vue')
            },
            {
                path: '/addTuifei',
                name: '添加退费',
                meta: {
                    icon: 'ios-arrow-forward',
                    title: '添加退费',
                    hideInMenu: true,
                },
                component: () => import('@/view/caiwuManage/addTuifei.vue')
            },
            {
                path: '/gongziManage',
                name: '工资管理 ',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '工资管理 '
                },
                //component: () => import('@/view/caiwuManage/gongziManage/gongziguanli.vue')
                component: parentView,
                children: [
                    {
                        path: '/gongziManage',
                        name: '工资管理',
                        meta: {
                            icon: 'md-arrow-dropdown-circle',
                            title: '工资管理'
                        },
                        component: () => import('@/view/caiwuManage/gongziManage/gongziguanli.vue')
                    },
                    // {
                    //     path: "/gongzitiao",
                    //     name: "工资条",
                    //     meta: {
                    //         title: "工资条",
                    //         icon: 'ios-arrow-forward',
                    //     },
                    //     component: () => import('@/view/caiwuManage/gongziManage/gongzitiao.vue')
                    // },
                    // {
                    //     path: "/gongzixiangmu",
                    //     name: "工资项目",
                    //     meta: {
                    //         title: "工资项目",
                    //         icon: 'ios-arrow-forward',
                    //     },
                    //     component: () => import('@/view/caiwuManage/gongziManage/gongzixiangmu.vue')
                    // },
                    // {
                    //     path: "/gongzixiangmufenpei",
                    //     name: "工资项目分配",
                    //     meta: {
                    //         title: "工资项目分配",
                    //         icon: 'ios-arrow-forward',
                    //     },
                    //     component: () => import('@/view/caiwuManage/gongziManage/gongzifenpei.vue')
                    // },
                ]
            },
            {
                path: '/feiyongtongji',
                name: '费用统计',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '费用统计 '
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/yejipaiming',
                        name: '业绩排名',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '业绩排名'
                        },
                        component: () => import('@/view/caiwuManage/feiyongtongji/yejipaiming.vue')
                    },
                    {
                        path: "/yejitongbihuanbi",
                        name: "业绩同比环比",
                        meta: {
                            title: "业绩同比环比",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/caiwuManage/feiyongtongji/yejitongbihuanbi.vue')
                    },
                    {
                        path: "/kemushoufeitongji",
                        name: "科目收费统计",
                        meta: {
                            title: "科目收费统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/caiwuManage/feiyongtongji/kemushoufeitongji.vue')
                    },
                    {
                        path: "/banjishoufeitongji",
                        name: "班级收费统计",
                        meta: {
                            title: "班级收费统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/caiwuManage/feiyongtongji/banjishoufeitongji.vue')
                    },
                    {
                        path: "/kecunxuefei",
                        name: "库存学费",
                        meta: {
                            title: "库存学费",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/caiwuManage/feiyongtongji/kucunxuefei.vue')
                    },
                    {
                        path: "/tuifeitongji",
                        name: "退费统计",
                        meta: {
                            title: "退费统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/caiwuManage/tuifeitongji.vue')
                    },
                ]
            },
            {
                path: '/caiwuliushui',
                name: '财务流水',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '财务流水'
                },
                component: () => import('@/view/caiwuManage/caiwuliushui.vue')
            },
            {
                path: '/yingkuizongzhang',
                name: '盈亏总账',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '盈亏总账'
                },
                component: () => import('@/view/caiwuManage/yingkuizongzhang.vue')
            },
        ]
    },

    {
        path: '/shujutongji',
        name: '数据统计',
        meta: {
            icon: 'ios-pie',
            title: '数据统计'
        },
        component: Main,
        children: [
            {
                path: '/zhaoshengtongji',
                name: '招生统计',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '招生统计'
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/zhaoshengtujingfenxi',
                        name: '招生途径分析',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '招生途径分析'
                        },
                        component: () => import('@/view/shujutongji/zhaoshengtongji.vue')
                    },
                    {
                        path: "/yixiangqiandantongji",
                        name: "意向签单统计",
                        meta: {
                            title: "意向签单统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/yixiangqiandantongji.vue')
                    },
                    {
                        path: "/xueshenglaiyuanxuexiao",
                        name: "学生来源学校",
                        meta: {
                            title: "学生来源学校",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/xueshenglaiyuanxuexiao.vue')
                    },
                    {
                        path: "/xueshenglaiyuanjiaoshi",
                        name: "学生来源教师",
                        meta: {
                            title: "学生来源教师",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/xueshenglaiyuanjiaoshi.vue')
                    },
                    {
                        path: "/xueshengliushilv",
                        name: "学员流失率",
                        meta: {
                            title: "学员流失率",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/xueyuanliushilv.vue')
                    },
                    {
                        path: "/xvfeilv",
                        name: "续费率",
                        meta: {
                            title: "续费率",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/xvfeilv.vue')
                    },
                ]
            },
            {
                path: '/kehaotongji',
                name: '课耗统计',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '课耗统计 '
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/kemukehaotongji',
                        name: '科目课耗统计',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '科目课耗统计'
                        },
                        component: () => import('@/view/shujutongji/kemukehaotongji.vue')
                    },
                    {
                        path: "/banjikehaotongji",
                        name: "班级课耗统计",
                        meta: {
                            title: "班级课耗统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/banjikehaotongji.vue')
                    },
                    {
                        path: "/jiaoshikehaotongji",
                        name: "教师课耗统计",
                        meta: {
                            title: "教师课耗统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/jiaoshikehaotongji.vue')
                    },
                    {
                        path: "/banzhurenkehaotongji",
                        name: "班主任课耗统计",
                        meta: {
                            title: "班主任课耗统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/banzhurenkehaotongji.vue')
                    },
                    {
                        path: "/yuejukehao",
                        name: "月均课耗",
                        meta: {
                            title: "月均课耗",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/yuejukehaotongji.vue')
                    },
                    {
                        path: "/kehaoshourutongbihuanbi",
                        name: "课耗收入同比环比",
                        meta: {
                            title: "课耗收入同比环比",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/kehaoshourutongbihuanbi.vue')
                    },
                ]
            },
            {
                path: '/renshutongji',
                name: '人数统计',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '人数统计 '
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/xueshengrenshutongji',
                        name: '学生人数统计',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学生人数统计'
                        },
                        component: () => import('@/view/shujutongji/xueshengrenshutongji.vue')
                    },
                    {
                        path: "/jiaoshixueyuantongji",
                        name: "教师学员统计",
                        meta: {
                            title: "教师学员统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/jiaoshixueyuantongji.vue')
                    },
                    {
                        path: "/banzhurenxueyuantongji",
                        name: "班主任学员统计",
                        meta: {
                            title: "班主任学员统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/banzhurenxueyuantongji.vue')
                    },
                ]
            },
            {
                path: '/qitatongji',
                name: '其他统计',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '其他统计 '
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/kemuzhanbitongji',
                        name: '科目占比统计',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '科目占比统计'
                        },
                        component: () => import('@/view/shujutongji/kemuzhanbitongji.vue')
                    },
                    {
                        path: "/changqitingkexueyuan",
                        name: "长期停课学员",
                        meta: {
                            title: "长期停课学员",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/changqitingkexueyuan.vue')
                    },
                    {
                        path: "/paiketongji",
                        name: "排课统计",
                        meta: {
                            title: "排课统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/paiketongji.vue')
                    },
                    {
                        path: "/bankeshouyichaxvn",
                        name: "班课收益查询",
                        meta: {
                            title: "班课收益查询",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/bankeshouyichaxun.vue')
                    },
                    {
                        path: "/kemucaiwutongji",
                        name: "科目财务统计",
                        meta: {
                            title: "科目财务统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/subjectCaiwuTongji.vue')
                    },
                    {
                        path: "/kemubaomingtongji",
                        name: "科目报名统计",
                        meta: {
                            title: "科目报名统计",
                            icon: 'ios-arrow-forward',
                        },
                        component: () => import('@/view/shujutongji/subjectBaomingTongji.vue')
                    },
                ]
            },
        ]
    },

    {
        path: '/systemManage',
        name: '机构管理',
        meta: {
            icon: 'md-home',
            title: '机构管理'
        },
        component: Main,
        children: [
            {
                path: 'xitongshezhi',
                name: '系统设置',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '系统设置'
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/jigoushezhi',
                        name: '机构设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '机构设置'
                        },
                        component: () => import('@/view/systemManage/systemSeting/jigoushezhi.vue')
                    }, {
                        path: '/stushezhi',
                        name: '学员设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '学员设置'
                        },
                        component: () => import('@/view/systemManage/systemSeting/stuSetting.vue')
                    },
                    {
                        path: '/gangweiquanxian',
                        name: '岗位权限',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '岗位权限',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/gangweiquanxian.vue')
                    },
                    {
                        path: '/houtaiquanxian',
                        name: '后台权限',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '后台权限',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/houtaiquanxian.vue')
                    },
                    {
                        path: '/jiaowushezhi',
                        name: '教务设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '教务设置'
                        },
                        component: () => import('@/view/systemManage/systemSeting/jiaowuSetting.vue')
                    }, {
                        path: '/caiwushezhi',
                        name: '财务设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '财务设置'
                        },
                        component: () => import('@/view/systemManage/systemSeting/caiwuSetting.vue')
                    }, {
                        path: '/weixinshezhi',
                        name: '微信设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '微信设置'
                        },
                        component: () => import('@/view/systemManage/systemSeting/weixinSetting.vue')
                    }, {
                        path: '/dayinshezhi',
                        name: '打印设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '打印设置'
                        },
                        component: () => import('@/view/systemManage/systemSeting/dayinSetting.vue')
                    }, {
                        path: '/nianjishezhi',
                        name: '年级/年龄段',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '年级/年龄段',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/nianjishezhi.vue')
                    }, {
                        path: '/bixistyleSetting',
                        name: '培训方式',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '培训方式',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/bixistyleSetting.vue')
                    }, {
                        path: "/kechengshichang",
                        name: "课程时长",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '课程时长',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/kechengshichang.vue')
                    }, {
                        path: "/classroom",
                        name: "教室设置",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '教室设置',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/classroom.vue')
                    }, {
                        path: "/campusInfo",
                        name: "校区设置",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '校区设置',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/campusInfo.vue')
                    },
                    {
                        path: "/bmfujiaziduan",
                        name: "报名附加字段",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '报名附加字段',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/stushezhi/bmfujiaziduan.vue')
                    },
                    {
                        path: "/zhaoshengtujing",
                        name: "招生途径",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '招生途径',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/stushezhi/zhaoshengtujing.vue')
                    },
                    {
                        path: "/yixiangcd",
                        name: "意向程度",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '意向程度',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/stushezhi/yixiangcd.vue')
                    },
                    {
                        path: "/kaoshileibie",
                        name: "考试类别",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '考试类别',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/jiaowushezhi/kaoshileibie.vue')
                    },
                    {
                        path: "/teaRate",
                        name: "教师点评项目",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '教师点评项目',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/jiaowushezhi/TeaRate.vue')
                    },
                    {
                        path: "/shoufeizidingyi",
                        name: "费用自定义字段",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '费用自定义字段',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/caiwushezhi/shoufeizidingyi.vue')
                    },
                    {
                        path: "/shoufeistyle",
                        name: "收费方式设置",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '收费方式设置',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/caiwushezhi/shoufeistyle.vue')
                    },
                    {
                        path: "/shoufeibiaozhun",
                        name: "最低收费标准",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '最低收费标准',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/caiwushezhi/shoufeibiaozhun.vue')
                    },
                    {
                        path: "/liushuileibie",
                        name: "财务流水类别设置",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '财务流水类别设置',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/caiwushezhi/liushuileibie.vue')
                    },
                    {
                        path: '/tuikefangyonglevel',
                        name: '推客等级设置',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '推客等级设置',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/tuikefangyonglevel.vue')
                    }

                ]
            },
            {
                path: 'staffmanage',
                name: '员工管理',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '员工管理'
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/staffinfo',
                        name: '员工账号管理',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '员工账号管理'
                        },
                        component: () => import('@/view/systemManage/staffmanage/staffinfo.vue')
                    },
                    {
                        path: '/ygweixinqunfa',
                        name: '员工微信群发',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '员工微信群发'
                        },
                        component: () => import('@/view/systemManage/staffmanage/weixinqunfa.vue')
                    },
                    {
                        path: "/rejiaokemu",
                        name: "管理任教科目",
                        meta: {
                            title: "管理任教科目",
                            hideInMenu: true
                        },
                        component: () => import('@/view/systemManage/staffmanage/rejiaokemu.vue')
                    },
                    {
                        path: "/test",
                        name: "管理任教科目",
                        meta: {
                            title: "管理任教科目",
                            hideInMenu: true
                        },
                        component: () => import('@/view/systemManage/staffmanage/test.vue')
                    },
                    {
                        path: '/Dailywork',
                        name: '工作日报',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '工作日报'
                        },
                        component: () => import('@/view/systemManage/staffmanage/Dailywork.vue')
                    },
                    {
                        path: '/Weekwork',
                        name: '周工作总结',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '周工作总结'
                        },
                        component: () => import('@/view/systemManage/staffmanage/Weekwork.vue')
                    },
                    {
                        path: '/staffyichangkaoqin',
                        name: '员工异常考勤',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '员工异常考勤'
                        },
                        component: () => import('@/view/systemManage/staffmanage/staffyichangkaoqin.vue')
                    },
                    // {
                    //     path: '/staffbirthday',
                    //     name: '员工生日',
                    //     meta: {
                    //         icon: 'ios-arrow-forward',
                    //         title: '员工生日'
                    //     },
                    //     component: () => import('@/view/systemManage/staffmanage/staffbirthday.vue')
                    // },
                    // {
                    //     path: '/stafftongxunlu',
                    //     name: '员工通讯录',
                    //     meta: {
                    //         icon: 'ios-arrow-forward',
                    //         title: '员工通讯录'
                    //     },
                    //     component: () => import('@/view/systemManage/staffmanage/stafftongxunlu.vue')
                    // },
                    // {
                    //     path: '/gongsimsg',
                    //     name: '公司消息',
                    //     meta: {
                    //         icon: 'ios-arrow-forward',
                    //         title: '公司消息'
                    //     },
                    //     component: () => import('@/view/systemManage/staffmanage/gongsimsg.vue')
                    // }
                ]
            },
            {
                path: 'zichangguanli',
                name: '资产管理',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '资产管理'
                },
                // component: () => import('@/view/components/tree-select/index.vue')
                component: parentView,
                children: [
                    {
                        path: '/gdzichangguanli',
                        name: '固定资产管理',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '固定资产管理'
                        },
                        component: () => import('@/view/systemManage/systemSeting/zichanguanli/zichanguanli.vue')
                    }, {
                        path: "/zichangcategory",
                        name: "资产类别",
                        meta: {
                            icon: "ios-arrow-forward",
                            title: '资产类别',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/systemSeting/zichanguanli/zichangcategory.vue')
                    }
                ]
            },
            {
                path: 'xitongrizhi',
                name: '系统日志',
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '系统日志'
                },
                component: parentView,
                children: [
                    {
                        path: '/systemlog',
                        name: '系统日志',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '系统日志'
                        },
                        component: () => import('@/view/systemManage/systemSeting/xitongrizhi/systemlog.vue')
                    }
                ]
            },
            {
                path: 'gongsimsg',
                name: '消息管理',  //之前是放在员工管理的公司消息页面
                meta: {
                    icon: 'md-arrow-dropdown-circle',
                    title: '消息管理'
                },
                component: parentView,
                children: [
                    {
                        path: '/gongsimsg',
                        name: '消息管理',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '消息管理',
                            hideInMenu: true,
                        },
                        component: () => import('@/view/systemManage/staffmanage/gongsimsg.vue')
                    }, {
                        //多加一个是为了去掉单个菜单的报错
                        path: '/gongsimsg2',
                        name: '消息管理',
                        meta: {
                            icon: 'ios-arrow-forward',
                            title: '消息管理2',
                        },
                        component: () => import('@/view/systemManage/staffmanage/gongsimsg.vue')
                    }
                ]
            },
        ]
    },
]
