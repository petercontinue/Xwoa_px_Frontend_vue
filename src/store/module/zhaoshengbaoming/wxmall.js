import * as wsc from '@/api/zhaoshengbaoming/wxmall'

export default {
    state: {
    },
    mutations: {
    },
    actions: {

        gettixianshenhePage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.gettixianshenhePage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        PassOrNoshenhetixian({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.PassOrNoshenhetixian(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        delwscUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.delwscUser(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        dongjieOrNotwscUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.dongjieOrNotwscUser(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        buytuke({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.buytuke(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        edittuikelevel({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.edittuikelevel(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getalltuikelvList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getalltuikelv(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getactivityPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getactivityPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteZhuti({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.deleteZhuti(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        zhanshiIsShow({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.zhanshiIsShow(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getAllgoodType({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getAllgoodType(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addOreditZhuti({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.addOreditZhuti(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getWscOrderPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWscOrderPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        orderFahuo({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.orderFahuo(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        orderWancheng({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.orderWancheng(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getOrderGoodsDetailByOrderNumberPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getOrderGoodsDetailByOrderNumberPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getShoppingCatPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getShoppingCatPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getTuihuokuanPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getTuihuokuanPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        refuseTuikuan({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.refuseTuikuan(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        rechargeOrderTuikuan({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.rechargeOrderTuikuan(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getorderpingjiaPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getorderpingjiaPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getWscUserPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWscUserPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getSqleLiushuiPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getSqleLiushuiPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetFangyongJiluPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetFangyongJiluPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetbuytuikeinfoPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetbuytuikeinfoPages(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        gettkteamPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.gettkteamPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getfanyongpaiming({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getfanyongpaiming(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        getWscYongjinBiliPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWscYongjinBiliPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateWscYongjinBiliByID({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.updateWscYongjinBiliByID(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getWscGoodsPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWscGoodsPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetGoodstypeList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetGoodstypeList(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllHuodongList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetAllHuodongList(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addWscGoods({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.addWscGoods(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetGoodsShuxingList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetGoodsShuxingList(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addWscGoodsGuige({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.addWscGoodsGuige(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllGuigeDataList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetAllGuigeDataList(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addGoodsAttributeList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.addGoodsAttributeList(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteWscGoodsGuigeByIDs({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.deleteWscGoodsGuigeByIDs(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteWscGoodsAttributeListByIDs({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.deleteWscGoodsAttributeListByIDs(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetAllShuxingValueList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetAllShuxingValueList(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addWscGoodsAttrPriceList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.addWscGoodsAttrPriceList(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetShuxingzuhePrice({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetShuxingzuhePrice(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteWscGoodsByIDs({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.deleteWscGoodsByIDs(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getWscGoodsTypePage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWscGoodsTypePage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addWscGoodsType({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.addWscGoodsType(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateWscGoodsTypeByID({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.updateWscGoodsTypeByID(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        deleteWscGoodsTypeByIDs({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.deleteWscGoodsTypeByIDs(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateWscGoodsStateByID({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.UpdateWscGoodsStateByID(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetGoodsInfoDetail({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetGoodsInfoDetail(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateWscGoodsByID({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.updateWscGoodsByID(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        zhaoxuexiu({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.zhaoxuexiu(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllHuodongTypeList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetAllHuodongTypeList(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllMyMobanFabuPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetAllMyMobanFabuPages(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetjigouInfoByqiyeID({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetjigouInfoByqiyeID(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        SavejigouInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.SavejigouInfo(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetWechatChongzhiPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetWechatChongzhiPages(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        agreeTuikuan({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.agreeTuikuan(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getWhdToupiaoHuodongPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWhdToupiaoHuodongPage(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        addWhdToupiaoHuodong({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.addWhdToupiaoHuodong(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        deleteWhdToupiaoHuodongByIDs({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.deleteWhdToupiaoHuodongByIDs(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        updateWhdToupiaoHuodongByID({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.updateWhdToupiaoHuodongByID(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        UpdateToupiaohuodongState({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.UpdateToupiaohuodongState(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getWhdToupiaoCansaiStuPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWhdToupiaoCansaiStuPage(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        addWhdToupiaoCansaiStu({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.addWhdToupiaoCansaiStu(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        deleteWhdToupiaoCansaiStuByIDs({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.deleteWhdToupiaoCansaiStuByIDs(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getWhdToupiaoRecordPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWhdToupiaoRecordPage(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getWscHuodongValPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWscHuodongValPage(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllShowHuodongList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetAllShowHuodongList(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        addWscHuodongVal({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.addWscHuodongVal(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        deleteWscHuodongValByIDs({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.deleteWscHuodongValByIDs(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        updateWscHuodongValByID({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.updateWscHuodongValByID(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getWhdChoujiangHuodongPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWhdChoujiangHuodongPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateUpStyle({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.updateUpStyle(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        addWhdChoujiangHuodong({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.addWhdChoujiangHuodong(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        updateWhdChoujiangHuodongByID({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.updateWhdChoujiangHuodongByID(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        deleteWhdChoujiangHuodongByID({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.deleteWhdChoujiangHuodongByID(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getWhdChoujiangJiangpinPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWhdChoujiangJiangpinPage(data).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        SavezhaoxuexiuHuodongInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.SavezhaoxuexiuHuodongInfo(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetH5MobanData({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetH5MobanData(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetMobanInfoDetail({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetMobanInfoDetail(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },

        GetJigoujianjieInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetJigoujianjieInfo(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getMobanMusicList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getMobanMusicList(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getwscHuodongInfoByID({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getwscHuodongInfoByID(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        fafangjiangpin({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.fafangjiangpin(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getGoodsTyleList({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getGoodsTyleList(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetCouponsPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetCouponsPages(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        AddOreditCoupons({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.AddOreditCoupons(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        delCouponsByID({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.delCouponsByID(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        Getuseryouhuiquan({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.Getuseryouhuiquan(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getWhdChoujiangRecordPage({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getWhdChoujiangRecordPage(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getAllWscUserDongtaiPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.getAllWscUserDongtaiPages(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAlldianzanPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetAlldianzanPages(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAllPingLunPages({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.GetAllPingLunPages(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        DeleteDongtaiInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                wsc.DeleteDongtaiInfo(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        }
    }
}
