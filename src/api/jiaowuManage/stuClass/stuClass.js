import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'
import qs from "qs"

var prefix = "xwcloud-stu"

/**获取班课 */
export const getStuClassPage_api = (paramobj = { current, size, is1v1Class, className, campusName, jingbanren, addTime, isShow }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getStuClassPage',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**添加班级（非一对一） */
export const addClass_api = (paramobj = { className, zidingyiClassID, campusID, maxStuNum }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/addClass',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**修改班级获取班级信息 */
export const getupdateClass_api = (paramobj = { id }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getupdateClass',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**修改班级 */
export const updateClass_api = (paramobj = { id, className, zidingyiClassID, campusID }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/updateClass',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**班级启用/不启用 */
export const UpdateOtOIsShow_api = (paramobj) => {
    return axios.request({
        url: prefix + '/stu/stuClass/UpdateOtOIsShow',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj,
    })
}
/**删除班级 */
export const delClass_api = (paramobj) => {
    return axios.request({
        url: prefix + '/stu/stuClass/delClass',
        method: 'delete',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj,
    })
}
/**查询学员班级 */
export const getClassToStu_api = (paramobj = { current, size, stuID }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getClassToStu',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

/**查看班级学员名单 */
export const getstumingdan_api = (paramobj = { current, size, classID }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getstumingdan',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**导出学员班课 */
export const exportClassOtO_api = (paramobj = { clType, classIDs }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/exportClassOtO',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**一对一修改班级 */
export const UpdatestuClassbyOne_api = (paramobj = { id, className, }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/UpdatestuClassbyOne',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**转班插班 */
export const getzhuangbanchaban_api = (paramobj = { current, size, campusID, stuID, stuName, stuGradeID, kechengName, isShow, className, type }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getzhuangbanchaban',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**建班保存 */
export const addclass_api = (paramobj = { campusID, className, zidiyingClassID }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/addclass',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**获取去全部可用班级 */
export const getallbanke_api = (paramobj) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getallbanke',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**获取补习课程目前已插入的班级 */
export const getOldClass_api = (paramobj = { buxiID }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getOldClass',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**插班 */
export const StuCharu_api = (paramobj = { classID, buxiID, CBckb, pkid }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/StuCharu',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**转班 */
export const saveChangeClass_api = (paramobj = { buxiID, oldClassID, newClassID }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/saveChangeClass',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**已插班级 */
export const getHaveClass_api = (paramobj = { current, size, buxiID }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getHaveClass',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**1个班级的退班 */
export const tuichuClass_api = (paramobj) => {
    return axios.request({
        url: prefix + '/stu/stuClass/tuichuClass',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj
    })
}
/**批量插班 */
export const allnoStuCharu_api = (paramobj) => {
    return axios.request({
        url: prefix + '/stu/stuClass/allnoStuCharu',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj
    })
}
/**批量插班 */
export const saveplChangeClass_api = (paramobj) => {
    return axios.request({
        url: prefix + '/stu/stuClass/saveplChangeClass',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj
    })
}
/**获取可跨校区学员 */
export const Getkxqstu_api = (paramobj = {}) => {
    return axios.request({
        url: prefix + '/stu/stuClass/Getkxqstu',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**获取选中跨校区学员课程 */
export const Getkxqbxkecheng_api = (paramobj = { stuID }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/Getkxqbxkecheng',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**获取学员所在校区以外的校区-不受权限控制 */
export const GetKxqCampus_api = (paramobj = { buxiID }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/GetKxqCampus',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/** 获取学员补习课程补习方式*/
export const getbuxistyle_api = (paramobj = { buxiID }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getbuxistyle',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**获取去校区班级 */
export const getkxqclass_api = (paramobj = { campusID }) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getkxqclass',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}
/**跨校区插班保存 */
export const savekxqClass_api = (paramobj) => {
    return axios.request({
        url: prefix + '/stu/stuClass/savekxqClass',
        method: 'post',
        headers: {
            'Authorization': "Bearer " + getToken(),
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: paramobj
    })
}
export const getPaikeByclassIDList = (paramobj) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getPaikeByclassIDList',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

export const getInPaikeByClassandBuxi = (paramobj) => {
    return axios.request({
        url: prefix + '/stu/stuClass/getInPaikeByClassandBuxi',
        method: 'get',
        headers: {
            'Authorization': "Bearer " + getToken()
        },
        params: paramobj
    })
}

