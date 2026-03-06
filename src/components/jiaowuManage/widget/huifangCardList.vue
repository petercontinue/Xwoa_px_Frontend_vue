<template>
  <List item-layout="vertical">
    <ListItem v-for="(item, index) in datalist" :key="index">
      <ListItemMeta>
        <template slot="title">
          <p class="Ptitle">
            回访人:{{ item.huifangTeacherName }} | 回访时间:{{dateFtt(item.huifangTime)}}
            |
            <a
              href="javascript:void(0);"
              rel="edit"
              class="Aedit"
              @click.prevent="edit(index)"
              >编辑</a
            >
            <a
              href="javascript:void(0);"
              rel="del"
              class="Adel"
              @click.prevent="del(index)"
              >删除</a
            >
          </p>
        </template>
      </ListItemMeta>
      {{ item.text }}
    </ListItem>
  </List>
</template>

<script>
import toolbox from "@/libs/toolbox";
export default {
  name: "huifangCardList",
  props: {
    value: {},
  },
  data() {
    return {
      datalist: [],
    };
  },
  methods: {
    edit(index) {
      this.$emit("huifangCardEditEvent", index);
    },
    del(index) {
      this.$emit("huifangCardDelEvent", index);
    },
    dateFtt(val) {
      return toolbox.dateFtt(val, "yyyy-MM-dd");
    },
  },
  watch: {
    // 监控数据变化
    value(val) {
      // 当value改变时
      this.datalist = val;
    },
  },
};
</script>

<style>
.Aedit {
  color: #317eeb;
}
.Adel {
  color: red;
}
.Ptitle {
  background-color: #fafafa;
  color: #797979;
  height: 40px;
  line-height: 40px;
}
</style>
