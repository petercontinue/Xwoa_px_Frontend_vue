<template>
  <div class="main">
    <Row style="margin-bottom: 15px"
      ><Col span="8">
        <div>
          看老师课表：
          <Select
            style="width: 200px"
            v-model="searchTeacher"
            @on-change="changeTeacher"
            filterable
          >
            <Option :value="item.id" :key="item.id" v-for="item in teacherData">{{
              item.name
            }}</Option>
          </Select>
        </div>
      </Col>
      <Col span="14">
        <Button type="success" @click="Addnewpaike">添加排课</Button>
        <Button type="info" @click="searchteacher">按时间查询空闲老师</Button>
        <Button type="info" @click="searchclassroom">按时间查询空闲教室</Button>
        <Button type="error" @click="deletepaike">按时间段删除排课</Button>
        <Button type="info" @click="showupdateTeacherInfo">按时间段修改排课老师</Button>
      </Col>
    </Row>
    <time-table :events="events" @eventClick="eventClick"></time-table>
    <addpaike-form v-model="showaddpaike" @handleSearch="init"></addpaike-form>
    <searchteacher-form v-model="showsearchteacher"></searchteacher-form>
    <searchclassroom-form v-model="showclassroom"></searchclassroom-form>
    <deletepaike v-model="showdelete" @handleSearch="init"></deletepaike>
    <updateteacher-form
      v-model="showupdateteacher"
      @handleSearch="init"
    ></updateteacher-form>
    <paikexiangqing-form
      v-model="showxiangqing"
      :paikeID="paikeID"
      @handleSearch="init"
    ></paikexiangqing-form>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import TimeTable from "../../../components/jiaowuManage/paikexiaoke/paike/TimeTable.vue";
import addpaikeForm from "../../../components/jiaowuManage/paikexiaoke/paike/addpaikeForm.vue";
import searchteacherForm from "../../../components/jiaowuManage/paikexiaoke/paike/searchteacherForm.vue";
import searchclassroomForm from "../../../components/jiaowuManage/paikexiaoke/paike/searchclassroomForm.vue";
import deletepaike from "../../../components/jiaowuManage/paikexiaoke/paike/deletepaike.vue";
import updateteacherForm from "../../../components/jiaowuManage/paikexiaoke/paike/updateteacherForm.vue";
import paikexiangqingForm from "../../../components/jiaowuManage/paikexiaoke/paike/paikexiangqingForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    TimeTable,
    addpaikeForm,
    searchteacherForm,
    searchclassroomForm,
    deletepaike,
    updateteacherForm,
    paikexiangqingForm,
  },
  data() {
    return {
      events: [],
      showaddpaike: false,
      showsearchteacher: false,
      showclassroom: false,
      showdelete: false,
      showupdateteacher: false,
      showxiangqing: false,
      paikeID: "",
      teacherData: [],
      searchTeacher: "",
    };
  },
  mounted() {
    this.init();
    api.get("xwcloud-pkxk/paike/paikexiaoke/getallstaff", {}).then((result) => {
      if (result.code == "Y" && result.success == true) {
        this.teacherData = result.obj;
      }
    });
  },
  methods: {
    init() {
      this.events = [];
      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      if (month < 9) {
        month = "0" + (month + 1);
      } else {
        month = month + 1;
      }
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getpaikeShowList", {
          teacherIDs: this.searchTeacher,
          yearMouth: "",
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
            callback(events);
          }
        })
        .catch((err) => {});
    },
    eventClick(data) {
      this.paikeID = data.event.id;
      this.showxiangqing = true;
    },
    Addnewpaike() {
      this.showaddpaike = true;
    },
    searchteacher() {
      this.showsearchteacher = true;
    },
    searchclassroom() {
      this.showclassroom = true;
    },
    deletepaike() {
      this.showdelete = true;
    },
    showupdateTeacherInfo() {
      this.showupdateteacher = true;
    },
    changeTeacher() {
      this.init();
    },
  },
};
</script>

<style>
/* //用什么插件必须引入相应的样式表，否则不能正常显示 */
@import "@fullcalendar/core/main.css";
@import "@fullcalendar/daygrid/main.css";
@import "@fullcalendar/timegrid/main.css";
</style>
