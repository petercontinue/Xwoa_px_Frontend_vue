<template>
  <Modal
    v-model="show"
    title="添加约课"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="70"
  >
    <Form
      ref="laoshiyuekeFrom"
      :model="jiaoshiyueke"
      :rules="jiaoshiyuekeRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select
          v-model="jiaoshiyueke.campusID"
          placeholder="请选择校区"
          @on-change="changeCampus"
        >
          <Option
            v-for="item in allcampusList"
            :value="item.id"
            :key="item.id"
            >{{ item.campusName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="老师" prop="teacherID">
        <Select
          v-model="jiaoshiyueke.teacherID"
          placeholder="请选择老师"
          @on-change="getKechengListData"
        >
          <Option
            v-for="item in allstaffList"
            :value="item.id"
            :key="item.id"
            >{{ item.staffName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="课程" prop="kechengID">
        <Select v-model="jiaoshiyueke.kechengID" placeholder="请选择课程">
          <Option
            v-for="kecheng in allkechengList"
            :value="kecheng.id"
            :key="kecheng.id"
            >{{ kecheng.kechengName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="班级" prop="classID">
        <Select v-model="jiaoshiyueke.classID" placeholder="请选择班级">
          <Option
            v-for="item in allclassData"
            :value="item.id"
            :key="item.id"
            >{{ item.className }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="上课日期" prop="haveLessonDate">
        <DatePicker
          type="date"
          placeholder="请选择日期"
          v-model="jiaoshiyueke.haveLessonDate"
          style="width: 100%"
        ></DatePicker>
      </FormItem>
      <FormItem label="上课教室" prop="classRoomID">
        <Select v-model="jiaoshiyueke.classRoomID" placeholder="请选择教室">
          <Option
            v-for="item in allclassroomList"
            :value="item.id"
            :key="item.id"
            >{{ item.classRoomName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="上课时间" prop="shijian">
        <TimePicker
          type="timerange"
          placement="bottom-end"
          placeholder="请选择时间"
          v-model="jiaoshiyueke.shijian"
          style="width: 100%"
          format="HH:mm"
        ></TimePicker>
      </FormItem>
      <FormItem label="课时" prop="keshi">
        <InputNumber
          :max="10000"
          :min="1"
          :step="0.1"
          v-model="jiaoshiyueke.keshi"
          placeholder="请输入课时"
          style="width: 100%"
        ></InputNumber>
      </FormItem>
      <FormItem label="最小人数" prop="miniStuNum">
        <InputNumber
          :max="10000"
          :min="1"
          :step="1"
          v-model="jiaoshiyueke.miniStuNum"
          placeholder="请输入最小人数"
          style="width: 100%"
        ></InputNumber>
      </FormItem>
      <FormItem label="最大人数" prop="maxStuNum">
        <InputNumber
          :max="10000"
          :min="1"
          :step="1"
          v-model="jiaoshiyueke.maxStuNum"
          placeholder="请输入最大人数"
          style="width: 100%"
        ></InputNumber>
      </FormItem>
      <FormItem label>
        <Checkbox v-model="jiaoshiyueke.isCheck">
          是否检测排课冲突
          <span style="color: red">(强烈建议检测！不检测可能导致重复数据)</span>
        </Checkbox>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button
        type="primary"
        v-if="!jiaoshiyueke.yukeID"
        @click="handleSubmit(1)"
        >保存并继续添加</Button
      >
      <Button type="primary" @click="handleSubmit(2)">保存并关闭</Button>
      <Button @click="handleReset('laoshiyuekeFrom')" style="margin-left: 8px"
        >取消</Button
      >
    </div>
  </Modal>
</template>
<script>
import { mapActions, Store } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "addjiaoshiyueke",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      jiaoshiyueke: {
        yukeID: "", //修改时使用
        campusID: "", // 校区ID
        teacherID: "", // 教师ID
        teacherName: "", // 教师名称
        kechengID: "", // 课程ID
        classID: "", // 班级ID
        haveLessonDate: "", // 上课日期
        classRoomID: "", // 教室ID
        startingTime: "", // 上课时间
        endTime: "", // 下课时间
        keshi: 2, // 课时数
        miniStuNum: 1, // 最小人数
        maxStuNum: 2, // 最大人数
        isCheck: true, // 是否检查排课冲突
        shijian: [],
      },
      jiaoshiyuekeRule: {
        // 验证输入
        campusID: [{ required: true, message: "请选择校区", trigger: "blur" }],
        teacherID: [{ required: true, message: "请选择教师", trigger: "blur" }],
        kechengID: [{ required: true, message: "请选择课程", trigger: "blur" }],
        classID: [{ required: true, message: "请选择班级", trigger: "blur" }],
        classRoomID: [
          { required: true, message: "请选择教室", trigger: "blur" },
        ],
        shijian: [
          {
            required: true,
            message: "请选择上课时间",
            trigger: "blur",
            type: "array",
          },
        ],
        haveLessonDate: [
          {
            required: true,
            type: "date",
            message: "请选择截止时间",
            trigger: "change",
          },
        ],
        keshi: [
          {
            required: true,
            message: "请填写课时数",
            trigger: "blur",
            type: "number",
          },
        ],
        maxStuNum: [
          {
            required: true,
            message: "请填写最大人数",
            trigger: "blur",
            type: "number",
          },
        ],
        miniStuNum: [
          {
            required: true,
            message: "请填写最小人数",
            trigger: "blur",
            type: "number",
          },
        ],
      },
      allcampusList: [],
      allclassData: [], // 班级数据列表
      allstaffList: [],
      allkechengList: [],
      allclassroomList: [],
    };
  },
  methods: {
    changeCampus() {
      // 选择校区后
      // 获取班级
      api.get("xwcloud-homeschool/homeschool/public/getClassList",{
        campusID: this.jiaoshiyueke.campusID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allclassData = res.obj;
        }
      });
      // 获取教师
      api.get("xwcloud-homeschool/homeschool/public/getStaffList",{
        campusID: this.jiaoshiyueke.campusID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstaffList = res.obj;
        }
      });
    },

    handleSubmit(type) {
      this.$refs["laoshiyuekeFrom"].validate((valid) => {
        if (valid) {
          this.jiaoshiyueke.haveLessonDate = toolbox.dateFtt(
            this.jiaoshiyueke.haveLessonDate,
            "yyyy-MM-dd"
          );
          this.allstaffList.forEach((element) => {
            if (element.id == this.jiaoshiyueke.teacherID) {
              this.jiaoshiyueke.teacherName = element.staffName;
            }
          });
          setTimeout(() => {
            if (this.jiaoshiyueke.yukeID == "") {
              api.post("xwcloud-homeschool/homeschool/pxyueketeacherfabu/addFabuYueke",{
                campusID: this.jiaoshiyueke.campusID,
                teacherID: this.jiaoshiyueke.teacherID,
                teacherName: this.jiaoshiyueke.teacherName,
                kechengID: this.jiaoshiyueke.kechengID,
                classID: this.jiaoshiyueke.classID,
                haveLessonDate: this.jiaoshiyueke.haveLessonDate,
                classRoomID: this.jiaoshiyueke.classRoomID,
                startingTime: this.jiaoshiyueke.startingTime,
                endTime: this.jiaoshiyueke.endTime,
                keshi: this.jiaoshiyueke.keshi,
                miniStuNum: this.jiaoshiyueke.miniStuNum,
                maxStuNum: this.jiaoshiyueke.maxStuNum,
                isCheck: this.jiaoshiyueke.isCheck,
              }).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("发布教师约课信息成功");
                  this.$refs["laoshiyuekeFrom"].resetFields();
                  this.$emit("handleSearch");
                  if (type == 2) {
                    this.closeModal(false);
                  }
                } else {
                  this.$Message.error(res.msg);
                }
              });
            } else {
              console.log(this.jiaoshiyueke);
              api.post("xwcloud-homeschool/homeschool/pxyueketeacherfabu/editFabuYueke",{
                yuekeID: this.jiaoshiyueke.yukeID,
                campusID: this.jiaoshiyueke.campusID,
                teacherID: this.jiaoshiyueke.teacherID,
                teacherName: this.jiaoshiyueke.teacherName,
                kechengID: this.jiaoshiyueke.kechengID,
                classID: this.jiaoshiyueke.classID,
                haveLessonDate: this.jiaoshiyueke.haveLessonDate,
                classRoomID: this.jiaoshiyueke.classRoomID,
                startingTime: this.jiaoshiyueke.startingTime,
                endTime: this.jiaoshiyueke.endTime,
                keshi: this.jiaoshiyueke.keshi,
                miniStuNum: this.jiaoshiyueke.miniStuNum,
                maxStuNum: this.jiaoshiyueke.maxStuNum,
                isCheck: this.jiaoshiyueke.isCheck,
              }).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("教师约课信息修改成功");
                  this.closeModal(false);
                  this.$emit("handleSearch");
                } else {
                  this.$Message.error(res.msg);
                  // 官方目前没有解决方案
                  this.loading = false;
                  setTimeout(() => {
                    this.loading = true;
                  }, 0);
                }
              });
            }
          }, 200);
        } else {
          this.$Message.error("请检查数据是否填对!");
        }
      });
    },
    handleReset() {
      this.$refs["laoshiyuekeFrom"].resetFields();
      this.closeModal(false);
    },

    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    getKechengListData() {
      // 获取课程
      api.get("xwcloud-homeschool/homeschool/pxyueketeacherfabu/getKechengList",{
        staffID: this.jiaoshiyueke.teacherID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allkechengList = res.obj;
          console.log(this.allkechengList);
        }
      });
    },
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["laoshiyuekeFrom"].resetFields();
        if (this.editData != "") {
          let eddata = JSON.parse(this.editData);
          console.log(eddata);
          this.jiaoshiyueke.campusID = eddata.campusID;
          this.changeCampus();
          this.jiaoshiyueke.teacherID = eddata.teacherIDs;
          this.getKechengListData();
          this.jiaoshiyueke.kechengID = eddata.kechengID;
          this.jiaoshiyueke.classID = eddata.classID;
          this.jiaoshiyueke.classRoomID = eddata.classroomID;
          this.jiaoshiyueke.haveLessonDate = toolbox.dateFtt(
            eddata.haveLessonDate,
            "yyyy-MM-dd"
          );
          this.jiaoshiyueke.shijian[0] = toolbox.dateFtt(
            eddata.startLessonTime,
            "hh:mm:ss"
          );
          this.jiaoshiyueke.shijian[1] = toolbox.dateFtt(
            eddata.endLessonTime,
            "hh:mm:ss"
          );
          this.jiaoshiyueke.keshi = eddata.keshiNum;
          this.jiaoshiyueke.miniStuNum = eddata.minSuccessYuekeStuNum;
          this.jiaoshiyueke.maxStuNum = eddata.maxStuNum;
          this.jiaoshiyueke.yukeID = eddata.id;
        } else {
          this.jiaoshiyueke.yukeID = "";
        }
        // 获取校区列表
        api.get("xwcloud-homeschool/homeschool/public/getCampusList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusList = res.obj;
          }
        });
        // 获取教室
        api.get("xwcloud-homeschool/homeschool/public/getClassRoomList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allclassroomList = res.obj;
          }
        });
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    "jiaoshiyueke.shijian"(val) {
      this.jiaoshiyueke.startingTime = val[0];
      this.jiaoshiyueke.endTime = val[1];
    },
  },
};
</script>
