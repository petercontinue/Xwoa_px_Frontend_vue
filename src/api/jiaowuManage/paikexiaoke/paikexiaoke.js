import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-pkxk"


/***
 * 获取年级
 */
export const getstugradeList_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getstugradeList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/***
 * 获取学员补习
 */
export const getstubuxiList_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getstubuxiList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}


/**
 * 分页获取自动消课
 * @param {*} paramobj
 */
export const getAutoPage_api = (paramobj = { current, size, campusID, renkeTea, banzhuren, stuName, state }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getAutoPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 分页获取考勤统计
 * @param {*} paramobj
 */
export const getKaoqingCountPage_api = (paramobj = { current, size, campusID, stuID, stuName }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getKaoqingCountPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 分页获取考勤流水
 * @param {*} paramobj
 */
export const getKaoqingliushuiPage_api = (paramobj = {
  current,
  size,
  campusID,
  stuID,
  stuName,
  kechengName,
  tearch,
  startDate,
  endDate
}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getKaoqingliushuiPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 分页获取人工排课签到签退
 * @param {*} paramobj
 */
export const getPaikeQiandaoPage_api = (paramobj = {
  current,
  size,
  campusID,
  stuName,
  kechengName,
  className,
  startDate,
  endDate
}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getPaikeQiandaoPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 分页获取人工消课
 * @param {*} paramobj
 */
export const getrengongxiaokePage_api = (paramobj = {
  current,
  size,
  campusID,
  teacherNames,
  startDate,
  endDate,
  className,
  kaoqing
}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getrengongxiaokePage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 分页获取离校刷卡
 * @param {*} paramobj
 */
export const getshuakaPage_api = (paramobj = { current, size, campusID, stuGradeID, stuID, stuName }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getshuakaPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 分页获取刷卡消课
 * @param {*} paramobj
 */
export const getshuakaxiaokePage_api = (paramobj = {
  current,
  size,
  cardNumber,
  campusID,
  stuName,
  teacherNames,
  buxiStyleID
}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getshuakaxiaokePage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 分页获取余额消课
 * @param {*} paramobj
 */
export const getyuexiaokePage_api = (paramobj = { current, size, campusID, stuName }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getyuexiaokePage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 分页获取自由签到
 * @param {*} paramobj
 */
export const getziyouqiandaoPage_api = (paramobj = { current, size, campusID, className }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getziyouqiandaoPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 设置自动消课
 */
export const savezdxk_api = (paramobj = { buxiID, classID, teachID, teachKeshi, zdyesorno }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/savezdxk',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**保存不排课消课 */
export const savenopaikexiaoeke_api = (paramobj) => {

  return axios.request({
    url: prefix + '/paike/paikexiaoke/savestukehao',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    // params: paramobj
    data: paramobj,
  })
}

/**保存排课消课 */
export const tiansavestukehao_api = (paramobj) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/tiansavestukehao',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    // params: paramobj
    data: paramobj,
  })
}
/**判断定金 */
export const pdstudingjin_api = (paramobj) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/pdstudingjin',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**判断课时 */
export const pdrkeshi_api = (paramobj) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/pdrkeshi',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**排课检测 */
export const IsHavePaike_api = (paramobj) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/IsHavePaike',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
    params: paramobj
  })
}


/**
 * 根据校区获取课程
 */
export const getallkechengByCampusId_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getallkechengByCampusId',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 根据当前登录用户查询可选课程信息
 * @param {*} paramobj 
 * @returns 
 */
export const GetAllkechengInfoByQuanxian = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetAllkechengInfoByQuanxian',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 不排课消课获取班级
 */
export const NOpaikegetclass_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/NOpaikegetclass',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 根据所有员工（在职）
 */
export const getallstaff_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getallstaff',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}


/**
 * 获取当前校区学员
 */
export const GetcampusStuName_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetcampusStuName',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 获取学员获取补习课程
 */
export const getxkStu_api = (paramobj = { stuID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getxkStu',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**课程时长 */
export const getclassTime_api = (paramobj = { kechengID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getclassTime',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 不排课消课按班级获取上课学员信息
 */
export const savestukehao_api = (paramobj = { haveclassDate, startLessonDateTime, endLessonDateTime, classID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/StuNoPaike',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**不排课消课获取自由学员 */
export const getzyStu_api = (paramobj = { stuID, buxiID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getzyStu',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 修改自动消课状态
 */
export const editAutoxiaoke_api = (paramobj = { autoID, type }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/editAutoxiaoke',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 按照校区获取班级
 */
export const getallqxclass_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getallqxclass',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 按照校区获取员工
 */
export const getstaffByCam_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getstaffByCam',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**消课打印 */
export const getxiaokedayingPage_api = (paramobj = { current, size }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getxiaokedayingPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**消课打印设置 */
export const getxiaokedaying_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getxiaokedaying',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}


/**按排课消课，把班级学生及考勤返回 */
export const getpaikexiaoekestuList_api = (paramobj = { pkID, stuName }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getpaikexiaoekestuList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}


/**(人工消课)班级考勤详情 */
export const getclasskaoqingPage_api = (paramobj = { current, size, paikeID, classID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getclasskaoqingPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 自由签到班级学员详情
 */
export const getziyouqiandaoLookStuPage_api = (paramobj = { current, size, classID, stuID, stuName }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getziyouqiandaoLookStuPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 班级内学员签到、签退事件
 */
export const SaveqianDaoqianTui_api = (paramobj = { stuID, Type }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/SaveqianDaoqianTui',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**自由签到班级已签到人数详情 */
export const getziyouqiandaostuNumPage_api = (paramobj = { current, size, classID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getziyouqiandaostuNumPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**自由签到班级已签退人数详情 */
export const getziyouqiantuistuNumPage_api = (paramobj = { current, size, classID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getziyouqiantuistuNumPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 自由签到班级已签到学员的签到详情
 */
export const getstuqiaoDaoNumPage_api = (paramobj = { current, size, stuID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getstuqiaoDaoNumPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 自由签到班级已签退学员的签到详情
 */
export const getstuqiaoTuiNumPage_api = (paramobj = { current, size, stuID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getstuqiaoTuiNumPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 人工签到签退 排课签到签退事件
 */
export const rgqiandaoqiantui_api = (paramobj = { stuID, paikeID, type, iskoukeshi }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/rgqiandaoqiantui',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 *  余额消课获取课程
 */
export const getKcToYueXiaoKe_api = (paramobj = { menuID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getKcToYueXiaoKe',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 添加余额消课
 */
export const addyuexiaoke_api = (paramobj = { cardNumber, kechengID, kechengName, money }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/addyuexiaoke',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 保存刷卡扣课时
 */
export const saveShaka_api = (paramobj = { cardNumber }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/saveShaka',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 刷卡签到签退
 */
export const shuaqiandaoqiantui_api = (paramobj = { cardNum }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/shuaqiandaoqiantui',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 天课表
 */
export const getDaykebiaopage_api = (paramobj = { current, size, campusID, teachName, haveClassDate, className }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getDaykebiaopage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 查询课表
 * @param {*} paramobj 
 */
export const getpaikeShowList_api = (paramobj = { teacherIDs, yearMouth }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getpaikeShowList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 查询校区所有课程
 * @param {*} param0 
 */
export const getallkechengByCampusId = ({ }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getallkechengByCampusId',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**
 * 根据课程查询任教老师
 * @param {*} param0 
 */
export const GetRenjiaoTeacher = ({ kechengID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetRenjiaoTeacher',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { kechengID }
  })
}
/**
 * 根据课程ID加载已设置的课程内容
 * @param {*} param0 
 * @returns 
 */
export const GetKechengContent = ({ kechengID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetKechengContent',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { kechengID }
  })
}

/**
 * 查询所有教室信息
 * @param {*} param0 
 */
export const GetAllClassRoom = ({ }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetAllClassRoom',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**
 * 保存排课信息
 * @param {*} paramobj 
 */
export const SavePaike_api = (paramobj = { tabdata, newStuData, kcContentCount, kecheng, classNum, showjiaoshi, classRoomID, checkPKchongtu }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/SavePaike',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**
 * 查询班级学生信息
 * @param {*} param0 
 */
export const GetClassStuList = ({ classID, paikeid }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetClassStuList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { classID, paikeid }
  })
}
/**
 * 查询空闲教师信息
 * @param {*} param0 
 */
export const getkongxianTeacher_api = ({ current, size, campusID, haveClassDate, starTime, endTime, TeacherName }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getkongxianTeacher',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { current, size, campusID, haveClassDate, starTime, endTime, TeacherName }
  })
}
/**
 * 查询空闲教室
 * @param {*} param0 
 */
export const getkongxianClassRoom_api = ({ current, size, campusID, haveClassDate, starTime, endTime, classRoomName }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getkongxianClassRoom',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { current, size, campusID, haveClassDate, starTime, endTime, classRoomName }
  })
}
/**
 * 按时间段删除排课
 * @param {*} param0 
 */
export const DeletDateTimePaike = ({ startDate, startTime, endDate, endTime }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/DeletDateTimePaike',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { startDate, startTime, endDate, endTime }
  })
}
/**
 * 按时间段修改排课老师
 * @param {*} param0 
 */
export const upDateTeacherByTime = ({ startDate, endDate, startLessonDateTime, endLessonDateTime, oldteaTeidt, newteaTeidt }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/upDateTeacherByTime',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { startDate, endDate, startLessonDateTime, endLessonDateTime, oldteaTeidt, newteaTeidt }
  })
}
/**
 * 查询排课详情
 * @param {*} param0 
 */
export const getpaikeInfo = ({ id }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getpaikeInfo',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { id }
  })
}
/**
 * 删除排课信息
 * @param {*} param0 
 */
export const Delpaike = ({ id }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/Delpaike',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { id }
  })
}
/**
 * 删除本批次的所有排课信息
 * @param {*} param0 
 */
export const DelAllpaike = ({ oldkechengID, oldclassID, classRooID, oldteaID, tstrDate, tendDate, deltype, tags }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/DelAllpaike',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { oldkechengID, oldclassID, classRooID, oldteaID, tstrDate, tendDate, deltype, tags }
  })
}
/**
 * 重排所有
 * @param {*} paramobj 
 */
export const chongpaiAllPaike = (paramobj = { tags, tabdata, newStuData, kcContentCount, kecheng, classNum, showjiaoshi, classRoomID, checkPKchongtu }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/chongpaiAllPaike',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**
 * 保存修改的排课信息
 * @param {*} paramobj 
 */
export const editSavePaike = (paramobj = { paikeid, editStuData, kecheng, editclass, showjiaoshi, editclassRoomID, editenddate, editstarttime, editendtime, checkPKchongtuEdit }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/editSavePaike',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**
 * 查询所有科目信息
 * @param {*} param0 
 */
export const GetAllKemuList = ({ }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetAllKemuList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    }
  })
}
/**
 * 查询科目课表信息
 * @param {*} param0 
 */
export const getsubjectkebiaoList = ({ subjectID, yearMouth }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getsubjectkebiaoList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { subjectID, yearMouth }
  })
}
/**
 * 查询教师课表
 * @param {*} param0 
 */
export const getTeacherkebiaoList = ({ teacherIDs, yearMouth }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getTeacherkebiaoList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { teacherIDs, yearMouth }
  })
}
/**
 * 查询所有学生信息
 * @param {*} param0 
 */
export const GetAllStuList = ({ }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetAllStuList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**
 *查询学生课表
 * @param {*} param0 
 */
export const getstukebiaoList = ({ stuID, yearMouth }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getstukebiaoList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { stuID, yearMouth }
  })
}
/**
 * 查询教室信息列表
 * @param {*} param0 
 */
export const GetAllClassroomList = ({ }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetAllClassroomList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**
 * 查询教室课表信息
 * @param {*} param0 
 */
export const getjiaoshikebiaoList = ({ classRoomID, yearMouth }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/getjiaoshikebiaoList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { classRoomID, yearMouth }
  })
}

export const GetPrintSubjectKebiao = ({ startDate, endDate, subjectID }) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetPrintSubjectKebiao',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: { startDate, endDate, subjectID }
  })
}

export const GetshualianxiaokeInfoPages = (paramobj) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetshualianxiaokeInfoPages',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

export const GetAllStuAndMubanImages = (paramobj) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/GetAllStuAndMubanImages',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 保存采集的学生照片信息
 * @param {*} paramobj 
 * @returns 
 */
export const SaveStuMubanImages = (paramobj) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/SaveStuMubanImages',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 删除采集的图片信息
 * @param {*} paramobj 
 * @returns 
 */
export const DeleteStuMubanImage = (paramobj) => {
  return axios.request({
    url: prefix + '/paike/paikexiaoke/DeleteStuMubanImage',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
