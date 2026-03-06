<template>
  <div>
    <Row style="margin-bottom: 15px">
      <Col span="8">
        <span>选择年月：</span>
        <DatePicker
          type="month"
          placeholder="选择年月"
          v-model="nianyue"
          @on-change="changeclassroom"
        ></DatePicker>
      </Col>
      <Col span="8">
        <span>教室名称：</span>
        <Select
          style="width: 75%; float: right"
          v-model="selectclassroomID"
          @on-change="changeclassroom"
          filterable
        >
          <Option :value="item.id" :key="item.id" v-for="item in allclassroomData">{{
            item.classroomname
          }}</Option>
        </Select>
      </Col>
      <Col span="8">
        <Button type="info" @click="exporclassroomKebiao">导出教室课表</Button>
        <Button type="success" v-print="'#printContent'">打印课表</Button>
      </Col>
    </Row>
    <time-table :events="events" @eventClick="eventClick" id="printContent"></time-table>
    <exportclassroomkebiao-form v-model="showexport"></exportclassroomkebiao-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import TimeTable from "../../../../components/jiaowuManage/paikexiaoke/paike/TimeTable.vue";
import exportclassroomkebiaoForm from "../../../../components/jiaowuManage/paikexiaoke/paike/exportclassroomkebiaoForm.vue";
import * as api from "@/api/api.js";
export default {
  components: {
    TimeTable,
    exportclassroomkebiaoForm,
  },
  data() {
    return {
      events: [],
      nianyue: new Date(),
      allclassroomData: [],
      selectclassroomID: "",
      showexport: false,
    };
  },
  methods: {
    eventClick(data) {
      console.log(data);
    },
    init() {
      this.events = [];
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getjiaoshikebiaoList", {
          classRoomID: this.selectclassroomID,
          yearMouth: toolbox.dateFtt(this.nianyue, "yyyy-MM-dd"),
        })
        .then((result) => {
          if (result.code == "Y" && result.success == true) {
            result.obj.forEach((element) => {
              this.events.push({
                title:
                  element.subjectName +
                  "&" +
                  element.classRoomName +
                  "&" +
                  element.xkstuName,
                start:
                  toolbox.dateFtt(element.haveClassDate, "yyyy-MM-dd") +
                  "T" +
                  element.startLessonDateTime,
                end:
                  toolbox.dateFtt(element.haveClassDate, "yyyy-MM-dd") +
                  "T" +
                  element.endLessonDateTime,
                startLessonDateTime: element.startLessonDateTime,
                endLessonDateTime: element.endLessonDateTime,
                color: element.bgColor,
                id: element.id,
              });
            });
            // callback(events);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeclassroom() {
      this.init();
    },
    exporclassroomKebiao() {
      this.showexport = true;
    },
  },
  mounted: function () {
    api.get("xwcloud-pkxk/paike/paikexiaoke/GetAllClassroomList", {}).then((res) => {
      console.log(res);
      if (res.code == "Y" && res.success == true) {
        this.allclassroomData = res.obj;
      }
    });
  },
};
</script>
<style>
/* //用什么插件必须引入相应的样式表，否则不能正常显示 */
@import "@fullcalendar/core/main.css";
@import "@fullcalendar/daygrid/main.css";
@import "@fullcalendar/timegrid/main.css";
</style>
