<template>
  <Modal
    v-model="show"
    title="学员课表详情"
    @on-ok="ok"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
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
    </div>
  </Modal>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; //点击日历触发的事件
export default {
  name: "stuInfokebiao",
  components: {
    FullCalendar,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
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
      show: this.value,
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
    };
  },
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    ok() {
      this.closeModal();
    },

    //@dateClick="handleDateClick"
    //点击日期
    handleDateClick(info) {
      console.log(info.event);
    },
    //点击事件查看详情
    eventClick(info) {
      // console.log(info.event.id);

      this.$emit("eventClick", info);
      // if (this.showtishi == true) {
      //   this.showtishi = false;
      // } else {
      //   this.showtishi = true;
      // }
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
      console.log("鼠标移入事件");
      this.$emit("eventClick", info);
      // this.showtishi = true;
      // console.log(this.showtishi);
    },
    eventMouseLeave(info) {
      // this.showtishi = false;
      console.log("鼠标移出事件");
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      if (val) {
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
