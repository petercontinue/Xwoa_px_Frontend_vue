import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-stu"

/**分页获取补习课程 */
export const getbuxiCoursePage_api = (paramobj = { current, size, campusID, stuID, stuName, subjectID, stuStatus, buxiStatus, buxiCourse, buxijifeiStyle, startDateTime, startEndTime, endstartTime, endTime, isShow, ksType, maxkeshi, minkeshi, keshi }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getbuxiCoursePage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/** 分页获取补习课程跨校区设置详情 */
export const getkxqinfo_api = (paramobj = { current, size, buxiID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getkxqinfo',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**设置课程启用|不启用 */
export const updateIsshow_api = (paramobj = { buxiID, show }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/updateIsshow',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**课程延期 */
export const KechengYanqi_api = (paramobj = { buxiID, endDate }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/KechengYanqi',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**改单价 */
export const editkcPrice_api = (paramobj = { bxkcID, newprice, newkeshi }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/editkcPrice',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**添加课时计费课程/课时包计费课程 时获取所有方式课程树 */
export const Getnewkc_api = (paramobj = { stuID, type }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/Getnewkc',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**添加课时计费课程 */
export const addKSCourse_api = (paramobj = { stuID, kcID, bx_startDate, bx_endDate, bx_odj, bx_dj }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/addKSCourse',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**添加课时包计费课程 */
export const addKSCourseBag_api = (paramobj = { stuID, kcID, bx_startDate, bx_endDate, bx_odj, bx_dj, bx_ksKSB, bx_priceKSB }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/addKSCourseBag',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**删除补习课程 */
export const delbuxi_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/delbuxi',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**检测是否可课程合并 */
export const getHebingTokechengCount_api = (paramobj = { oldbuxiID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getHebingTokechengCount',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取可合并课程 */
export const getHebingTokecheng_api = (paramobj = { oldbuxiID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getHebingTokecheng',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**课程合并 */
export const MergeCourse_api = (paramobj = { oldbxID, newbxID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/MergeCourse',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取科目课程 */
export const getnewkcInfo_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getnewkcInfo',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**换课 */
export const saveChangekecheng_api = (paramobj = { hkbuxiID, ISZK, ZK, oldkcMoney, kcID, KCjifeiStyleNew, hkStartDate, hkEndDate, hkKechengprice, hkKeshi }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/saveChangekecheng',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取学员能跨的校区 */
export const getStuKxqCanCampus_api = (paramobj = { stuID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getStuKxqCanCampus',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**跨校区上课设置 */
export const kxqbuxikcsave_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/kxqbuxikcsave',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**分页获取课程变动流水 */
export const getkcLiuShuiPage_api = (paramobj = { current, size, type, stuName, campusID, newStu }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getkcLiuShuiPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**分页获取学员发证 */
export const getfazhengPage_api = (paramobj = { current, size, stuName, FZstate }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getfazhengPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**分页获取课程证书设置查询 */
export const getzhengshuPage_api = (paramobj = { current, size, zsName }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getzhengshuPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**添加证书 */
export const addZs_api = (paramobj = { zsName }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/addZs',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**修改证书 */
export const updateZsList_api = (paramobj = { id, zsName }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/updateZsList',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**删除证书 */
export const delZs_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/delZs',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**查看证书绑定课程 */
export const lookBD_api = (paramobj = { current, size, zsid }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/lookBD',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**解除绑定 */
export const delBD_api = (paramobj = { kcID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/delBD',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**绑定证书 */
export const bangDingZs_api = (paramobj = { zsID, kcID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/bangDingZs',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/** 分页获取学员考级*/
export const getKaoJiPage_api = (paramobj = { current, size, stuName, campusName }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getKaoJiPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/** 删除考级*/
export const delKaoJi_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/delKaoJi',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**获取所有学员（带校区、年级） */
export const GetAllSelectedStuNames_api = (paramobj = { menuID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/GetAllSelectedStuNames',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取科目 */
export const GetcampusIDkemu_api = (paramobj = { campusID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/GetcampusIDkemu',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**添加考级 */
export const addKaoJI_api = (paramobj = { stuID, kemuid, jibie }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/addKaoJI',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**修改考级 */
export const updateKaoJI_api = (paramobj = { kjID, stuID, kemuid, jibie }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/updateKaoJI',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**分页获取考级申请 */
export const getKJsqPage_api = (paramobj = { current, size, }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getKJsqPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**添加考级申请 */
export const addKaoJiSq_api = (paramobj = { stuID, kemuid, jibie }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/addKaoJiSq',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**修改考级申请 */
export const updateKaoJiSq_api = (paramobj = { sqID, sqjibie }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/updateKaoJiSq',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**审核考级 */
export const shKaoJisq_api = (paramobj = { kaojisqID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/shKaoJisq',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}



/** 分页获取学员成绩*/
export const getScorePage_api = (paramobj = { current, size, scoreType, stuName, campusID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getScorePage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**添加学员成绩 */
export const addScore_api = (paramobj = { stuID, subjectID, kechengID, score, dankepaiming, zongfenpaiming, scoreType, testTypeID, testTitle, scoreDate, beiZhu }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/addScore',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取考试类型 */
export const getTesttype_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getTesttype',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**按照科目获取课程 */
export const getKcBySubject_api = (paramobj = { subjectID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getKcBySubject',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/** 修改学员成绩*/
export const updateScore_api = (paramobj = { id, scoreType, score, dankepaiming, zongfenpaiming, testTypeID, scoreDate, testTitle, beiZhu }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/updateScore',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**删除学员成绩 */
export const delScore_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/delScore',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**分页获取转送 */
export const getTransferPage_api = (paramobj = { current, size, songstuID, songcampus, songstu, shoucampus, shoustuID, shoustu, zhuansongDate, jingbanren }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getTransferPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**分页获取赠送 */
export const getZengSongPage_api = (paramobj = { current, size, stuID, stuName, campusID, stuGradeID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getZengSongPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**删除学员成绩 */
export const delTransfer_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/delTransfer',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**获取转送学员有的课程 */
export const getzhuangsongkecheng_api = (paramobj = { stuID, type }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getzhuangsongkecheng',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取赠送学员有的课程 */
export const getZSkechengs_api = (paramobj = { stuID, type }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getZSkechengs',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取一个学生没有的课程 */
export const getOtherKechengs_api = (paramobj = { stuID, type }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getOtherKechengs',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}


/**扩科转送获取课程 */
export const getcamkecheng_api = (paramobj = { stuID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getcamkecheng',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**保存课时转送 */
export const addKeShiZhs_api = (paramobj = { songstuID, zhuansongtype, songbuxikechengID, skeshi, shoustuID, songPrice, shoubuxikechengID, shkeshi, shPrice, shuoming, startDate, endDate }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/addKeShiZhs',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/** 转送天获取学员有的起止日期计费课程*/
export const getzhuangsongdaykecheng_api = (paramobj = { stuID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getzhuangsongdaykecheng',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**保存天转送 */
export const addDayZhs_api = (paramobj = { daysongstuID, daysongbxkechengID, sdays, daysprice, dayshoustuID, dayshoubxkechengID, dayshdays, dayshprice, dayshuoming, zhuansongdayType }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/addDayZhs',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**添加赠送课时 */
export const addZsKeShi_api = (paramobj = { songstuID, songbuxikechengID, zhuansongtype, shoukechengID, skeshi, kcPrice, startDate, endDate, songYangyin }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/addZsKeShi',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**添加赠送天 */
export const addZsDay_api = (paramobj = { songstuID, songbuxikechengID, zhuansongtype, shoukechengID, skeshi, otherStartDate, otherEndDate, songYangyin }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/addZsDay',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**删除赠送 */
export const delZsKeshi_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/delZsKeshi',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**保存发证 */
export const FZSave_api = (paramobj = { fzSID, stuID, imgaddress }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/FZSave',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
export const stuScorereadExcel_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/stuScorereadExcel',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
export const getAllpxsubjectList = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getAllpxsubjectList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
export const getAllbuxiStyleList = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getAllbuxiStyleList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
export const getAllClassTimeList = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getAllClassTimeList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
export const getstuOtherbuxi = (paramobj = { stuID, buxiID, classTime }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getstuOtherbuxi',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
export const savesharekeshi = (paramobj = { buxiID, sharebuxiID }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/savesharekeshi',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
export const getshareInfo = (paramobj = { buxiIDs, current, size }) => {
  return axios.request({
    url: prefix + '/stu/buxikecheng/getshareInfo',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}


