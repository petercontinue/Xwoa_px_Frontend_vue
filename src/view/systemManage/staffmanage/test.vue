<template>
  <div class="entire">
    <h2>遮罩层显示</h2>
    <div class="zhe-zhao-demo">
      <ul>
        <li v-for="(item, index) in list" :key="`a${index}`">
          <p>{{ item.title }}</p>
          <div class="detail-popover">
            <span>{{ item.title }}</span>
            <span>―</span>
            <span>{{ item.introduce }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { title: "新鲜水果", introduce: "果园现摘先送 让您吃到放心水果" },
        { title: "有机蔬菜", introduce: "有机肥施肥 人工采摘 放心无激素" },
        { title: "禽类肉类", introduce: "肉质新鲜 不冷冻" },
        { title: "禽类肉类", introduce: "肉质新鲜 不冷冻" },
        { title: "禽类肉类", introduce: "肉质新鲜 不冷冻" },
        { title: "禽类肉类", introduce: "肉质新鲜 不冷冻" },
        { title: "禽类肉类", introduce: "肉质新鲜 不冷冻" },
        { title: "有机蔬菜", introduce: "有机肥施肥 人工采摘 放心无激素" },
        { title: "新鲜水果", introduce: "果园现摘先送 让您吃到放心水果" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.zhe-zhao-demo {
  background: #fdf6f6;
  ul {
    display: flex;
    justify-content: space-between;
    // padding: 0 10%;
    li {
      width: 15%;
      height: 160px;
      background: #fff;
      text-align: center;
      padding-top: 30px;
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      text-align: center;
      .detail-popover {
        width: 200px;
        height: 160px;
        position: absolute;
        top: 160px;
        background: rgba(218, 196, 218, 0.9);
        color: white;
        border-radius: 12px;
        font-size: 16px;
        padding: 20px;
        p {
          font-size: 20px;
        }
        span {
          display: block;
          &:last-child {
            text-align: left;
          }
        }
      }
      &:hover {
        .detail-popover {
          position: absolute;
          top: 0;
          transition: all 0.6s ease;
        }
      }
    }
  }
}
</style>