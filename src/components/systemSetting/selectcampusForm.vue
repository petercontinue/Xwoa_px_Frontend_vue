<template>
  <Modal
    v-model="show"
    title="选择校区"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="45"
  >
    <CheckboxGroup v-model="selectCampus">
      <Checkbox
        :label="item.id"
        border
        v-for="item in allcampusData"
        :key="item.id"
        >{{ item.name }}</Checkbox
      >
    </CheckboxGroup>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    menuData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      allcampusData: [],
      selectCampus: [],
    };
  },
  methods: {
    ok() {
      let data = JSON.parse(this.menuData);
      let campuslist = "";
      this.selectCampus.forEach((element) => {
        campuslist += element + ",";
      });
      api.get("/xwcloud-sys/sys/PowerManagement/saveCampusPower",{
        staffpostID: data.staffpostID,
        campusIDs: campuslist.slice(0, campuslist.length - 1),
        menuID: data.id,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          // 提交表单数据成功则关闭当前的modal框
          this.closeModal(false);
        } else {
          this.$Message.error(res.msg);
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
        }
      });
    },
    checkstaffTel() {},
    closeModal(val) {
      this.$emit("input", val);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        let data = JSON.parse(this.menuData);
        if (data.dataFanweicheck == "-3") {
          data.datafanwei.split(',').forEach(element => {
              this.selectCampus.push(element);
          });
        }
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
