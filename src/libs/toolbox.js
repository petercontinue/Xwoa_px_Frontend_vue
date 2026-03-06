import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
export default {
  dateFtt(date, fmt) {
    date = new Date(date);
    var o = {
      "M+": date.getMonth() + 1,     //月份 
      "d+": date.getDate(),     //日 
      "h+": date.getHours(),     //小时 
      "m+": date.getMinutes(),     //分 
      "s+": date.getSeconds(),     //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds()    //毫秒 
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  exportExcel(url, params, fileName, self, isModal = true) {
    axios
      .request({
        method: "get",
        url: url,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        params: params,
        responseType: "blob",
      })
      .then((res) => {

        // 文件下载
        const blob = new Blob([res], {
          type: "application/vnd.ms-excel",
        });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", fileName + ".xls");
        link.click();
        link = null;
        self.$Message.success("导出成功");
        if (isModal) {
          self.closeModal(false);
        }
      })
      .catch((err) => {
        self.$Message.error("下载失败");
      });
  },

  formatLocalDateTime(date) {
    let year = date.year;
    let month = date.monthValue > 10 ? date.monthValue : "0" + date.monthValue;
    let day = date.dayOfMonth > 10 ? date.dayOfMonth : "0" + date.dayOfMonth;
    let hour = date.hour > 10 ? date.hour : "0" + date.hour;
    let minute = date.minute > 10 ? date.minute : "0" + date.minute;
    let second = date.second > 10 ? date.second : "0" + date.second;
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  },
  formatLocalDateTime(date) {
    let year = date.year;
    let month = date.monthValue > 10 ? date.monthValue : "0" + date.monthValue;
    let day = date.dayOfMonth > 10 ? date.dayOfMonth : "0" + date.dayOfMonth;
    return year + "-" + month + "-" + day;
  }
}