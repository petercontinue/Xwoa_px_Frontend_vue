<template>
  <div>
    <!-- defaultView: 默认视图（dayGridMonth月视图） -->
    <FullCalendar
      defaultView="dayGridMonth"
      :events="events"
      :plugins="calendarPlugins"
      :weekends="true"
      :allDaySlot="false"
      eventLimit="3"
      height="auto"
      slotDuration="00:30:00"
      :minTime="minTime"
      :maxTime="maxTime"
      locale="zh-cn"
      :header="header"
      :buttonText="buttonText"
      eventTextColor="#fff"
      eventBackgroundColor="#00bcd4"
      eventBorderColor="#00bcd4"
      navLinks="true"
      nowIndicator="true"
      :displayEventEnd="true"
      @eventClick="eventClick"
      :eventRender="eventRender"
      @eventMouseEnter="eventMouseEnter"
      @eventMouseLeave="eventMouseLeave"
    ></FullCalendar>
    <addpaike-form
      v-model="showupdatePaike"
      :paikeData="paikeData"
      :savetype="savetype"
    ></addpaike-form>

    <!-- <div id="template" style="display: none">
       <i-button @click="test()">Click me!</i-button>
         <Button type="success" @click="chongpaiAll">添加排课</Button>
     <button type='button' class='ivu-btn ivu-btn-success ivu-btn-small' @click='chongpaiAll()'><span>{{yyjtest}}</span></button>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; //点击日历触发的事件
import toolbox from "@/libs/toolbox";
import addpaikeForm from "@/components/jiaowuManage/paikexiaoke/paike/addpaikeForm.vue";
import * as api from "@/api/api.js";

import { tippy } from "vue-tippy";

export default {
  components: {
    FullCalendar, //
    addpaikeForm,
  },
  props: {
    //事件
    events: {
      type: Array,
      required: true,
      default: () => [],
    },
    //每天开始时间
    minTime: {
      type: String,
      required: false,
      default: "00:00:00",
    },
    //每天结束时间
    maxTime: {
      type: String,
      required: false,
      default: "23:59:59",
    },
  },
  data() {
    return {
      showtishi: false,
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      header: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      },
      buttonText: {
        today: "今天",
        month: "月",
        week: "周",
        day: "天",
      },
      savetype: 1,
      showupdatePaike: false,
      paikeData: "",
      yyjtest: "哈哈哈哈哈",
    };
  },
  methods: {
    ...mapActions(["getpaikeInfo", "Delpaike"]),
    //@dateClick="handleDateClick"
    //点击日期
    handleDateClick(info) {
      console.log(info.event);
    },
    //点击事件查看详情
    eventClick(info) {
      this.$emit("eventClick", info);
    },
    eventRender(event) {
      //当Event对象开始渲染时触发
      this.events.forEach((element) => {
        if (element.id == event.event.id) {
          event.el.innerHTML =
            "<div style='text-align:center;'><P>" +
            element.startLessonDateTime.split(":")[0] +
            ":" +
            element.startLessonDateTime.split(":")[1] +
            "~" +
            element.endLessonDateTime.split(":")[0] +
            ":" +
            element.endLessonDateTime.split(":")[1] +
            "</P><P>" +
            element.title.split("&")[0] +
            "</P><p>" +
            element.title.split("&")[2] +
            "</p><p>" +
            element.title.split("&")[1] +
            "</p></div>";
        }
      });
      //
    },

    eventMouseEnter(info) {
      //鼠标hover事件，对应也有其他鼠标事件监听
      // console.log(info)
      // const template = document.getElementById('template');
      // console.log(template);
      // this.getpaikeInfo({ id: info.event.id }).then((result) => {
      //   if (result.code == "Y" && result.success == true) {
      //     this.paikeData = JSON.stringify(result.obj[0]);
      //     tippy(info.el, {
      //       //tippy hover插件
      //       //template.innerHTML,
      //       content:
      //         "<button type='button' class='ivu-btn ivu-btn-success ivu-btn-small' onclick='chongpaiAll'><span>重排所有</span></button>&nbsp;" +
      //         "<button type='button' class='ivu-btn ivu-btn-success ivu-btn-small' onClick='chongpaiAll'><span>继续排课</span></button>&nbsp;" +
      //         "<button type='button' class='ivu-btn ivu-btn-error ivu-btn-small' onClick='test()'><span>删除所有</span></button>&nbsp;" +
      //         "<button type='button' class='ivu-btn ivu-btn-info ivu-btn-small' onClick='chongpaiAll'><span>修改</span></button>&nbsp;" +
      //         "<button type='button' class='ivu-btn ivu-btn-warning ivu-btn-small' onClick='chongpaiAll'><span>删除</span></button>" +
      //         "<div align='left'>" +
      //         "<div style='color: #FFFFFF'>上课日期：" +
      //         toolbox.dateFtt(result.obj[0].haveClassDate, "yyyy-MM-dd") +
      //         "</div>" +
      //         "<div style='color: #FFFFFF'>上课时间：" +
      //         result.obj[0].startLessonDateTime +
      //         "-" +
      //         result.obj[0].endLessonDateTime +
      //         "</div>" +
      //         "<div style='color: #FFFFFF'>课程：" +
      //         result.obj[0].kechengName +
      //         "</div>" +
      //         "<div style='color: #FFFFFF'>班级：" +
      //         result.obj[0].className +
      //         "</div>" +
      //         "<div style='color: #FFFFFF'>学生姓名：" +
      //         result.obj[0].xkstuName +
      //         "</div>" +
      //         "<div style='color: #FFFFFF'>教室：" +
      //         result.obj[0].classRoomName +
      //         "</div>" +
      //         "<div style='color: #FFFFFF'>任课教师：" +
      //         result.obj[0].teacherNames +
      //         "</div>" +
      //         "</div>", //允许Html配置
      //       theme: "light", //主题选取
      //       interactive: true, //可交互的
      //       placement: "right", //悬浮框位置
      //       allowHTML: true, //是否允许html文本
      //       arrow: true,
      //     });
      //   }
      // });
    },

    //   eventMouseEnter(info) {
    //     console.log("鼠标移入事件");
    //     // this.$emit("eventClick", info);
    //     // this.showtishi = true;
    //     // console.log(this.showtishi);
    // },
    eventMouseLeave(info) {
      // this.showtishi = false;
      console.log("鼠标移出事件1");
    },
    chongpaiAll() {
      console.log("6666");
      // this.savetype = 2;
      // this.showupdatePaike = true;
    },
    test() {
      console.log("哈哈哈");
    },
  },
  watch: {
    yyjtest(val) {
      alert("hahaha");
    },
  },
};
</script>
