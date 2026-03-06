import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"


export const updateuserpwd = (paramobj) => {
  return axios.request({
    url: '/xwcloud-sys/sys/StaffManagement/updateuserpwd',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

export const delFileFromAliOss = (paramobj) => {
  return axios.request({
    url: "/xwcloud-sys/aliyun/delFileFromAliOss",
    method: "delete",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}


export const addRate = (paramobj = { id, ratritem }) => {
  return axios.request({
    url: '/xwcloud-sys/sys/SystemSetting/addRate',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
    params: paramobj,
  })
}

export const delTeaRate = (paramobj = { ids }) => {
  return axios.request({
    url: '/xwcloud-sys/sys/SystemSetting/delTeaRate',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
    params: paramobj,
  })
}


export const saveUserdaohang = (paramobj) => {
  return axios.request({
    url: '/xwcloud-sys/sys/SystemSetting/saveUserdaohang',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj
  })
}
export const getTeaRateitemList = () => {
  return axios.request({
    url: '/xwcloud-sys/sys/SystemSetting/getTeaRateitemList',
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {}
  })
}

export const getdaibanTixin = () => {
  return axios.request({
    url: '/xwcloud-sys/sys/SystemSetting/getdaibanTixin',
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {}
  })
}

export const getdaohangtoStaff = () => {
  return axios.request({
    url: '/xwcloud-sys/sys/SystemSetting/getdaohangtoStaff',
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {}
  })
}

export const getqiyeName = ({ }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/SystemSetting/getqiyeName",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**系统剩余天数 */
export const getxitongremainDay = ({ }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/SystemSetting/getxitongremainDay",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}

/**
 * 加载权限按钮
 * @param {*} param0 
 */
export const GetPowerMenuButtons = ({ menuID }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/PowerManagement/GetPowerButton",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      menuID
    }
  })
}
/**
 * 分页查询员工信息
 * @param {*} param0 
 */
export const getStaffPages = (data) => {
  return axios.request({
    url: 'xwcloud-sys/sys/StaffManagement/getPxstafftablePage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: data
  })
}
/**
 * 查询所有校区信息
 */
export const getAllcampus = (data) => {
  return axios.request({
    url: 'xwcloud-sys/sys/StaffManagement/GetAllcampus',
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: data
  })
}
/**
 * 查询所有员工岗位信息
 */
export const getallstaffpost = () => {
  return axios.request({
    url: 'xwcloud-sys/sys/SystemSetting/GetAllStaffPostList',
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}

export const getmanagerNum = () => {
  return axios.request({
    url: 'xwcloud-sys/sys/StaffManagement/getmanagerNum',
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**
 * 保存员工信息
 * @param {*} param0 
 */
export const saveNewStaffInfo = ({ role, staffName, staffTel, password, staffSex, staffBirthday, campusID, staffPostID, staffState, joinTime, shuoMing, jiaoxueJingyan, showInApp }) => {
  const data = {
    role, staffName, staffTel, password, staffSex, staffBirthday, campusID, staffPostID, staffState, joinTime, shuoMing, jiaoxueJingyan, showInApp
  }
  return axios.request({
    url: 'xwcloud-sys/sys/StaffManagement/addPxstafftable',
    data: qs.stringify(data),
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    }
  })
}
/**
 * 根据员工ID获取员工详细信息
 * @param {员工ID} pxtafftableId 
 */
export const getPxstafftable = ({ pxtafftableId }) => {
  return axios.request({
    url: '/xwcloud-sys/sys/StaffManagement/getPxstafftable',
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      pxtafftableId
    }
  })
}
/**
 * 更新员工状态
 * @param {*} param0 
 */
export const UpdateStaffSate = ({ id, staffState }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/UpdateStaffSate",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      id, staffState
    }
  })
}
/**
 * 重置员工密码
 * @param {*} param0 
 */
export const resetStaffPassword = ({ Id }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/ResetTsaffPassword",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      Id
    }
  })
}
/**
 * 解除员工微信绑定
 * @param {*} param0 
 */
export const jiechustaffweixinBind = ({ staffID }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/jiechuStaffWeixinBind",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      staffID
    }
  })
}
/**
 * 分页查询任教科目
 * @param {*} param0 
 */
export const GetrenjiaokemuPages = ({ size, current, staffID, subjectName, teachCampusName }) => {
  return axios.request({
    url: '/xwcloud-sys/sys/StaffManagement/GetTeacheSubjectPages',
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      size, current, staffID, subjectName, teachCampusName
    }
  })
}
/**
 * 查询所有科目信息
 * @param {*} param0 
 */
export const getSubjectList = ({ }) => {
  return axios.request({
    url: '/xwcloud-sys/sys/StaffManagement/GetAllSubjectList',
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}

export const GetAllSubjecbycampusIDtList = ({ campusID }) => {
  return axios.request({
    url: '/xwcloud-sys/sys/StaffManagement/GetAllSubjecbycampusIDtList',
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },

    params: {
      campusID
    }
  })
}

/**
 * 保存教师任教科目
 * @param {*} param0 
 */
export const saveteachsubject = (paramsobj) => {
  return axios.request({
    url: '/xwcloud-sys/sys/StaffManagement/saveteachSubject',
    params: paramsobj,
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**
 * 修改任教科目信息
 * @param {*} param0 
 */
export const UpdateteachSubject = ({ id, qiyeID, shuoming, staffID, teachSubjectID }) => {
  const data = {
    id, qiyeID, shuoming, staffID, teachSubjectID
  }
  return axios.request({
    url: '/xwcloud-sys/sys/StaffManagement/UpdateteachSubject',
    data: qs.stringify(data),
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**
 * 查询人教科目信息
 * @param {*} param0 
 */
export const getTeachSubjectInfo = ({ Id }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/GetTeachingSubjectInfo",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      Id
    },
  })
}
/**
 * 删除任教科目信息
 * @param {*} param0 
 */
export const DeleteTeachSubject = ({ Id }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/DeleteTeachSubject",
    method: "delete",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      Id
    }
  })
}
/**
 * 分页查询工作日报
 * @param {*} param0 
 */
export const GetAllWorkdayRecordPages = ({ size, current, StaffName, CampusName, StaffPostName, SLogDate, ELogDate }) => {
  return axios.request({
    url: '/xwcloud-sys/sys/StaffManagement/GetAllWorkdayRecordPages',
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      size, current, StaffName, CampusName, StaffPostName, SLogDate, ELogDate
    }
  })
}
/**
 * 添加日工作总结
 * @param {*} param0 
 */
export const AddWorkdayRecords = ({ staffID, LogDate, LogContent, ImgsUrl, qiyeID }) => {
  const data = {
    staffID, LogDate, LogContent, ImgsUrl, qiyeID
  }
  return axios.request({
    url: '/xwcloud-sys/sys/StaffManagement/AddWorkdayRecord',
    data: qs.stringify(data),
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**
 * 修改工作日报信息
 * @param {*} param0 
 */
export const UpdateWorkdayRecord = ({ id, staffID, LogDate, LogContent, ImgsUrl, qiyeID }) => {
  const data = {
    id, staffID, LogDate, LogContent, ImgsUrl, qiyeID
  }
  return axios.request({
    url: '/xwcloud-sys/sys/StaffManagement/UpdateWorkdayRecord',
    data: qs.stringify(data),
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**
 * 删除工作日报
 * @param {*} param0 
 */
export const DeleteWorkdayRecord = ({ Id }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/DeleteWorkdayRecord",
    method: "delete",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      Id
    }
  })
}
/**
 * 根据ID查询工作日报
 * @param {*} param0 
 */
export const GetdailyworkInfobyId = ({ Id }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/GetdailyworkInfobyId",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      Id
    }
  })
}
/**
 * 分页查询周工作总结
 * @param {*} param0 
 */
export const GetweekrecordPages = ({ size, current, StaffPostName, StaffName, CampusName, SstartDate, EstartDate }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/GetweekrecordPages",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      size, current, StaffPostName, StaffName, CampusName, SstartDate, EstartDate
    }
  })
}
/**
 * 根据ID查询周工作总结详情
 * @param {*} param0 
 */
export const getWeekworkrecordInfoById = ({ Id }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/getWeekworkrecordInfoById",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      Id
    }
  })
}
/**
 * 新增周工作总结
 * @param {*} param0 
 */
export const Addweekrecord = ({ startDate, endDate, thisWeekRecord, nextWeekRecord, imgsUrl }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/Addweekrecord",
    method: "post",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      startDate, endDate, thisWeekRecord, nextWeekRecord, imgsUrl
    }
  })
}
/**
 * 修改周工作总结
 * @param {*} param0 
 */
export const Updateweekrecord = ({ id, startDate, endDate, thisWeekRecord, nextWeekRecord, imgsUrl }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/Updateweekrecord",
    method: "post",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      id, startDate, endDate, thisWeekRecord, nextWeekRecord, imgsUrl
    }
  })
}
/**
 * 删除周工作总结
 * @param {*} param0 
 */
export const Deleteweekrecord = ({ Id }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/Deleteweekrecord",
    method: "delete",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      Id
    }
  })
}
/**
 * 分页查询员工异常考勤
 * @param {*} param0 
 */
export const GetyichangkaoqinPages = ({ size, current, campusName, staffpostName, staffName, type }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/GetyichangkaoqinPages",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      size, current, campusName, staffpostName, staffName, type
    }
  })
}
/**
 * 添加员工异常考勤
 * @param {*} param0 
 */
export const Addyuanggongyichangkaoqin = ({ id, staffID, type, riqi, shuoming, addDate, addstaffID, qiyeID }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/Addyuanggongyichangkaoqin",
    method: "post",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      id, staffID, type, riqi, shuoming, addDate, addstaffID, qiyeID
    }
  })
}
/**
 * 修改员工异常考勤信息
 * @param {*} param0 
 */
export const UpdateYuanggongyichangkaoqin = ({ id, staffID, type, riqi, shuoming, addDate, addstaffID, qiyeID }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/UpdateYuanggongyichangkaoqin",
    method: "post",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      id, staffID, type, riqi, shuoming, addDate, addstaffID, qiyeID
    }
  })
}
/**
 * 删除异常考勤
 * @param {*} param0 
 */
export const Deleteyichangkaoqin = ({ Id }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/Deleteyichangkaoqin",
    method: "delete",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      Id
    }
  })
}
/**
 * 根据校区id查询员工信息
 * @param {*} param0 
 */
export const getstaffListByCampusID = ({ campusID }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/getstaffListByCampusID",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      campusID
    }
  })
}
/**
 * 查询员工异常考勤详细信息
 * @param {*} param0 
 */
export const GetyichangkaoqingInfoById = ({ Id }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/GetyichangkaoqingInfoById",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      Id
    }
  })
}
/**
 * 分页查询员工通讯录
 * @param {*} param0 
 */
export const GetAllStaffTelPages = ({ size, current, UserName, staffName, campusName, staffPostName, stafftel }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/GetAllStaffTelPages",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      size, current, UserName, staffName, campusName, staffPostName, stafftel
    }
  })
}
/**
 * 修改员工通讯录
 * @param {*} param0 
 */
export const UpdateStaffTel = ({ staffTel, id }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/UpdateStaffTel",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      staffTel, id
    }
  })
}
/**
 * 分页查询员工通讯录信息
 * @param {*} param0 
 */
export const GetAllStaffBirthPages = ({ size, current, staffName, campusName, staffPostName, Sstaffbirth, Estaffbirth }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/GetAllStaffBirthPages",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      size, current, staffName, campusName, staffPostName, Sstaffbirth, Estaffbirth
    }
  })
}
/**
 * 修改员工生日
 * @param {*} param0 
 */
export const UpdateStaffBirth = ({ id, staffbirth }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/UpdateStaffBirth",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      id, staffbirth
    }
  })
}
export const wxqunfa = (paramsobj) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/wxqunfa",
    method: "post",
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    params: paramsobj
  })
}

export const campusOrstaffpostqunfa = (paramsobj) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/campusOrstaffpostqunfa",
    method: "post",
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    params: paramsobj
  })
}


/**
 * 分页查询员工微信消息
 * @param {*} param0 
 */
export const GetWechatMessageStaffPages = (paramsobj) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/GetWechatMessageStaffPages",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramsobj
  })
}
/**
 * 查询推送类型
 * @param {*} param0 
 */
export const GetTuisongTyleList = ({ }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/GetTuisongTyleList",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**
 * 查询所有在职员工（不分页）
 * @param {*} param0 
 */
export const getPxstafftableAllList = ({ }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/getPxstafftableAllList",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
  })
}
/**
 * 分页查询公司消息
 * @param {*} param0 
 */
export const GetGongsigonggaoPages = ({ size, current, gonggaoTitel, SgonggaoDate, EgonggaoDate }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/GetGongsigonggaoPages",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      size, current, gonggaoTitel, SgonggaoDate, EgonggaoDate
    }
  })
}
/**
 * 删除公司消息
 * @param {*} param0 
 */
export const DeleteGongsiGonggao = ({ Id }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/DeleteGongsiGonggao",
    method: "delete",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      Id
    }
  })
}
/**
 * 根据校区ID获取岗位信息
 * @param {*} param0 
 */
export const GetStaffPostByCampusID = ({ CampusID }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/GetStaffPostByCampusID",
    method: "get",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      CampusID
    }
  })
}
/**
 * 保存公司消息
 * @param {*} param0 
 */
export const savefasonggsXiaoxi = ({ Id, gonggaoTitel, gonggaoText, sendType, sendCampusId, campusID, sendStaffPostCampusId, sendStaffId }) => {
  return axios.request({
    url: "/xwcloud-sys/sys/StaffManagement/savefasonggsXiaoxi",
    method: "post",
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: {
      Id, gonggaoTitel, gonggaoText, sendType, sendCampusId, campusID, sendStaffPostCampusId, sendStaffId
    }
  })
}
/**
 * 查询校区业绩
 * @param {*} paramsobj 
 * @returns 
 */
export const getCampusYejiList = (paramsobj) => {
  return axios.request({
    url: '/xwcloud-sys/sys/home/getCampusYejiList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramsobj
  })
}
/**
 * 查询课耗收入统计信息
 * @param {*} paramsobj 
 * @returns 
 */
export const GetIndexKehaoInfo = (paramsobj) => {
  return axios.request({
    url: '/xwcloud-sys/sys/home/GetIndexKehaoInfo',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramsobj
  })
}
/**
 * 根据手机号码查询手机号码所属企业
 * @param {*} paramsobj 
 * @returns 
 */
export const GetAllqiyeInfoByuserPhone = (paramsobj) => {
  return axios.request({
    url: '/xwcloud-sys/weixin/GetAllqiyeInfoByuserPhone',
    method: 'get',
    params: paramsobj
  })
}
/**
 * 根据手机号码获取短信验证码
 * @param {*} paramsobj 
 * @returns 
 */
export const SendShortMessage = (paramsobj) => {
  return axios.request({
    url: '/xwcloud-sys/weixin/SendShortMessage',
    method: 'get',
    params: paramsobj
  })
}
/**
 * 保存重置密码
 * @param {*} paramsobj 
 * @returns 
 */
export const UpdateUserPassword = (paramsobj) => {
  return axios.request({
    url: '/xwcloud-sys/weixin/UpdateUserPassword',
    method: 'get',
    params: paramsobj
  })
}
export const editPxstafftable = (paramobj) => {
  return axios.request({
    url: '/xwcloud-sys/sys/StaffManagement/editPxstafftable',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
    params: paramobj,
  })
}

export const GetAllStaffPostListByCampusID = (paramobj = { campusID }) => {
  return axios.request({
    url: 'xwcloud-sys/sys/StaffManagement/GetAllStaffPostListByCampusID',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}