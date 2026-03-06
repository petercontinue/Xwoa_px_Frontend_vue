import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-stu"

/**
 * 获取学员档案
 * @param paramobj
 * @returns {*}
 */
export const getStuFilesPage_api = (paramobj = { current, size, campusID, stuName, stuID, parentTel, banzhuren, stuGradeID, buxiStateID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getStuFilesPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 学员积分详情
 */
export const getstuIntegraInfoPage_api = (paramobj = { current, size, stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getstuIntegraInfoPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 学员代金券使用详情
 */
export const getdaijinquanInfoPage_api = (paramobj = { current, size, stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getdaijinquanInfoPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 学员课耗详情
 */
export const getkehaoInfoPage_api = (paramobj = { current, size, stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getkehaoInfoPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 学员上课信息
 */
export const getstuskInfoPage_api = (paramobj = { current, size, stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getstuskInfoPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 学员信息
 */
export const getstuInfoPage_api = (paramobj = { stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getstuInfoPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**
 * 学员签单详情
 */
export const getstuQiandanInfoPage_api = (paramobj = { current, size, stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getstuQiandanInfoPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 课程详情
 */
export const getkechengInfoPage_api = (paramobj = { current, size, stuID, qdID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getkechengInfoPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 杂费详情
 */
export const getzafeiInfoPage_api = (paramobj = { current, size, qdID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getzafeiInfoPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 修改学员信息
 */
export const UpdateStu_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/UpdateStu',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj
  })
}
/**删除学员 */
export const delStu_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/delStu',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}

/**停课 */
export const PauseStudy_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/PauseStudy',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**休眠 */
export const longPauseStudy_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/longPauseStudy',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**结课 */
export const stuJieke_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/stuJieke',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**复课 */
export const huifuStudy_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/huifuStudy',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**转校区 */
export const zhuanxiaoqu_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/zhuanxiaoqu',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}


/**转校区获取可跨校区 */
export const getzxqCampus_api = (paramobj = { stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getzxqCampus',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**转校区学员补习课程 */
export const getzxqbuxiList_api = (paramobj = { stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getzxqbuxiList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**校区有的课程 */
export const getallJFkcshuList_api = (paramobj = { stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getallJFkcshuList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取所有开放班级 */
export const getAllClass_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getAllClass',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 分页获取按班级查询学员
 */
export const AsClassTOStuPage_api = (paramobj = { current, size, classID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/AsClassTOStuPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**新课程信息 */
export const getxinbxkc_api = (paramobj = { newkcID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getxinbxkc',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**分页获取分配班主任 */
export const getStuTearchPage_api = (paramobj = { current, size, Banzhuren, stuName, id, campusID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getStuTearchPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取可以做班主任的老师 */
export const GetBanzhurenFenpei_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/GetBanzhurenFenpei',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**
 * 班级详情
 */
export const getstuclassPage_api = (paramobj = { current, size, stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getstuclassPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/** 分配班主任 */
export const FenPingTeacher_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/FenPingTeacher',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/** 清除班主任 */
export const deleteTeacher_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/deleteTeacher',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**x学员卡 */
export const getStuCardPage_api = (paramobj = { current, size, stuName, stuID, campusID, cardID, stuGradeID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getStuCardPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**绑定/修改学员卡 */
export const updateCardID_api = (paramobj = { stuID, cardNum }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/updateCardID',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      // 'Content-Type': 'application/json;charset=utf-8'
    },
    params: paramobj,
  })
}
/**清除学员卡绑定 */
export const delstuCard_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/delstuCard',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**学员积分 */
export const getStuIntegralPage_api = (paramobj = { current, size, campusID, stuName, stuID, starDate, endDate, jingbanStaff, stuGradeID, type }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getStuIntegralPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**积分排名 */
export const getJFpaimingPage_api = (paramobj = { current, size }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getJFpaimingPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**删除积分记录 */
export const delJiFen_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/delJiFen',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**积分排名获取学员 */
export const getallstu_api = (paramobj = { menuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getallstu',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**根据积分ID获取积分信息 */
export const getJiFenByID_api = (paramobj = { jfID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getJiFenByID',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**添加积分 */
export const addJiFen_api = (paramobj = { stuID, type, integral, remark, Notice }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/addJiFen',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}

/**修改积分 */
export const editJiFen_api = (paramobj = { jfID, type, integral, remark, Notice }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/editJiFen',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取学员详情的签单大概信息 */
export const getstuInfoqiandan_api = (paramobj = { stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getstuInfoqiandan',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**分页获取学员年级|年龄段 */
export const getStuGragePage_api = (paramobj = { current, size, campusID, stuName, stuID, stuGradeID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getStuGragePage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/** 调级 */
export const updateStuGrade_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/updateStuGrade',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**获取调级记录 */
export const getGradeJiLuPage_api = (paramobj = { current, size, campusID, stuName, stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getGradeJiLuPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**撤销调级 */
export const editGrade_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/editGrade',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**获取学员生日 */
export const getStuBirthPage_api = (paramobj = { current, size, campusID, stuName, stuID, stuGradeID, month }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getStuBirthPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**修改生日 */
export const updateBirth_api = (paramobj = { id, stubirth }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/updateBirth',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取学员住宿 */
export const getStuStayPage_api = (paramobj = { current, size, campusID, stuName, stuID, stuGradeID, roomName }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getStuStayPage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取全部正常宿舍 */
export const getOkList_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/getOkList',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**修改学员宿舍 */
export const updateRoom_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/updateRoom',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**清理学员住宿 */
export const delStuStay_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/delStuStay',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**宿舍管理 */
export const getRmManagePage_api = (paramobj = { current, size, RoomNumber, campusID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/roomManage/getRmManagePage',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**删除宿舍 */
export const delStay_api = (paramobj) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/roomManage/delStay',
    method: 'delete',
    headers: {
      'Authorization': "Bearer " + getToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    data: paramobj,
  })
}
/**添加宿舍 */
export const addStay_api = (paramobj = { campusID, RoomNumber, renshu }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/roomManage/addStay',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**修改宿舍获取宿舍信息 */
export const geteditStay_api = (paramobj = { id }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/roomManage/geteditStay',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**修改宿舍 */
export const updateStay_api = (paramobj = { id, campusID, RoomNumber, renshu }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/roomManage/updateStay',
    method: 'post',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取全部年级 */
export const Getnianji_api = (paramobj = {}) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/Getnianji',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取自定义字段 */
export const Getstuparamtype_api = (paramobj = { stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/Getstuparamtype',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/**获取学员自定义字段 */
export const Getstuparamvalue_api = (paramobj = { stuID }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/Getstuparamvalue',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}
/** 获取下拉框数据 */
export const Getselectparamvalue_api = (paramobj = { stuParamTypeId }) => {
  return axios.request({
    url: prefix + '/stu/stuManagement/Getselectparamvalue',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + getToken()
    },
    params: paramobj
  })
}