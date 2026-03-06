<template>
  <Form
    ref="shangpinForm"
    :model="shangpinForm"
    :rules="shangpinFormRule"
    :label-width="200"
    :label-colon="true"
  >
    <Row>
      <Col span="18">
        <FormItem label="商品名称" prop="goodsName">
          <Input
            type="text"
            :maxlength="50"
            v-model="shangpinForm.goodsName"
            placeholder="请输入商品名称"
          />
        </FormItem>
      </Col>
      <Col
        span="2"
        style="text-align: left; padding-left: 5px; padding-top: 8px"
      >
        <label style="color: #2d8cf0">限50字</label>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="商品类别" prop="goodsTypeID">
          <Select
            v-model="shangpinForm.goodsTypeID"
            placeholder="请选择商品类别"
          >
            <Option
              v-for="item in goosTypeData"
              :value="item.id"
              :key="item.id"
              >{{ item.goodstype }}</Option
            >
          </Select>
        </FormItem>
      </Col>
      <Col
        span="2"
        style="text-align: left; padding-left: 5px; padding-top: 8px"
      >
        <router-link to="/goodCategory">设置</router-link>
      </Col>
      <Col span="10">
        <FormItem label="商品类型" prop="style">
          <RadioGroup v-model="shangpinForm.style">
            <Radio label="1">课程商品</Radio>
            <Radio label="2">实物商品</Radio>
            <Radio label="3">其他虚拟商品</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
    </Row>

    <Row>
      <Col span="12">
        <FormItem label="是否参加活动" prop="canjiahuodong">
          <RadioGroup v-model="canjiahuodong" @on-change="changecanjiahuodong">
            <Radio label="1">不参加营销活动</Radio>
            <Radio label="2">参加营销活动</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
      <Col span="12" v-if="showselecthuodong">
        <FormItem label="营销活动">
          <Select
            v-model="shangpinForm.huodongID"
            placeholder="请选择商品参与活动"
            style="width: 100%"
            @on-change="checkhuodong"
          >
            <Option
              v-for="item in huodongData"
              :value="item.id"
              :key="item.id"
              >{{ item.huodongName }}</Option
            >
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row v-if="!showselecthuodong">
      <Col span="6">
        <FormItem label="一口价" prop="basicPrice">
          <Tooltip
            content="没有商品属性的时候用一口价，如果同时还开启活动，这个价就是活动的原价"
            style="width: 100%"
            :max-width="300"
          >
            <InputNumber
              style="width: 100%"
              :max="1000000"
              :min="0.01"
              :step="0.01"
              v-model="shangpinForm.basicPrice"
              placeholder="请输入一口价"
            ></InputNumber>
          </Tooltip>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="兑换积分" prop="jifenPrice">
          <Tooltip
            content="不设置商品属性、不参加活动的商品才能用积分，如果设置商品属性，积分价使用属性规格的积分兑换价格"
            style="width: 100%"
            :max-width="300"
          >
            <InputNumber
              style="width: 100%"
              :max="1000000"
              :min="0.01"
              :step="0.01"
              v-model="shangpinForm.jifenPrice"
              placeholder="请输入积分兑换价"
            ></InputNumber>
          </Tooltip>
        </FormItem>
      </Col>
      <Col
        span="8"
        style="text-align: left; padding-left: 5px; padding-top: 8px"
      >
        <label style="color: #2d8cf0"
          >温馨提示：购买时只能用钱或只能用积分购买，暂不支持钱和积分组合购买；</label
        >
      </Col>
    </Row>
    <div v-if="flag == true">
      <Row v-if="shangpinForm.huodongID != 0">
        <Col span="12">
          <FormItem label="活动开始时间" prop="huodongStartTime">
            <DatePicker
              type="date"
              placeholder="请选择活动开始时间"
              style="width: 100%"
              v-model="shangpinForm.huodongStartTime"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="活动结束时间" prop="huodongEndTime">
            <DatePicker
              type="date"
              style="width: 100%"
              placeholder="请选择活动结束时间"
              v-model="shangpinForm.huodongEndTime"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12" v-if="shangpinForm.huodongID == 3">
          <FormItem label="限时抢购价" prop="onlyTimeBuyPrice">
            <Tooltip
              content="没有设置商品属性时，参与限时抢购使用这个价格，否则使用对应商品属性组合的限时抢购价格"
              style="width: 100%"
              :max-width="300"
            >
              <InputNumber
                style="width: 100%"
                :max="1000000"
                :min="0.01"
                :step="0.01"
                v-model="shangpinForm.onlyTimeBuyPrice"
                placeholder="请输入限时抢购价"
              ></InputNumber>
            </Tooltip>
          </FormItem>
        </Col>
        <Col span="12" v-if="shangpinForm.huodongID == 2">
          <FormItem label="最少砍价金额" prop="kanjiaOniceMinNum">
            <Tooltip
              content="参与砍价活动时，好友帮砍一次，最少可以砍价金额"
              style="width: 100%"
              :max-width="300"
            >
              <InputNumber
                style="width: 100%"
                :max="1000000"
                :min="0.01"
                :step="0.01"
                v-model="shangpinForm.kanjiaOniceMinNum"
                placeholder="请输入最少砍价金额"
              ></InputNumber>
            </Tooltip>
          </FormItem>
        </Col>
      </Row>
      <Row v-if="shangpinForm.huodongID == 2">
        <Col span="12">
          <FormItem label="最大砍价金额" prop="kanjiaOniceMaxNum">
            <Tooltip
              content="参与砍价活动时，好友帮砍一次，最大可以砍价金额"
              style="width: 100%"
              :max-width="300"
            >
              <InputNumber
                style="width: 100%"
                :max="1000000"
                :min="0.01"
                :step="0.01"
                v-model="shangpinForm.kanjiaOniceMaxNum"
                placeholder="请输入最大砍价金额"
              ></InputNumber>
            </Tooltip>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="砍价成功价格" prop="kanjiaSuccessPrice">
            <Tooltip
              content="参与砍价活动时，好友帮砍一次，最大可以砍价金额"
              style="width: 100%"
              :max-width="300"
            >
              <InputNumber
                style="width: 100%"
                :max="1000000"
                :min="0.01"
                :step="0.01"
                v-model="shangpinForm.kanjiaSuccessPrice"
                placeholder="请输入砍价成功价格"
              ></InputNumber>
            </Tooltip>
          </FormItem>
        </Col>
      </Row>
    </div>

    <Row>
      <FormItem label="三级返佣">
        <RadioGroup
          v-model="fanyongshezhi"
          @on-change="changefanyongshezhishow"
        >
          <Radio label="0"
            >通用返佣比(父级{{ defaultfidFanyongBili }}%，祖级{{
              defaultgfidFanyongBili
            }}%，设置)</Radio
          >
          <Radio label="1">单独设置返佣比</Radio>
        </RadioGroup>
      </FormItem>
    </Row>

    <Row v-if="fanyongshezhishow">
      <Col span="6">
        <FormItem label="父级返佣比例(%)" prop="fidFanyongBili">
          <InputNumber
            style="width: 100%"
            :max="100"
            :min="0.01"
            :step="0.01"
            v-model="shangpinForm.fidFanyongBili"
            placeholder="请输入父级返佣比例"
          ></InputNumber>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="祖级返佣比例(%)" prop="gfidFanyongBili">
          <InputNumber
            style="width: 100%"
            :max="100"
            :min="0.01"
            :step="0.01"
            v-model="shangpinForm.gfidFanyongBili"
            placeholder="请输入祖级返佣比例"
          ></InputNumber>
        </FormItem>
      </Col>
      <Col
        span="8"
        style="text-align: left; padding-left: 5px; padding-top: 8px"
      >
        <label style="color: #2d8cf0"
          >温馨提示：这是商城三级返佣的返佣比设置；</label
        >
      </Col>
    </Row>

    <Row>
      <Col span="8">
        <FormItem label="排序方式">
          <RadioGroup v-model="paixustyle">
            <Radio label="1">默认排序</Radio>
            <Radio label="2">置顶</Radio>
            <Radio label="3">指定排序</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
      <Col span="8" v-if="paixustyle == 3">
        <FormItem label="商品排序" prop="paixu">
          <InputNumber
            style="width: 100%"
            :max="1000000"
            :min="1"
            :step="1"
            v-model="shangpinForm.paixu"
            placeholder="请输入商品排序"
          ></InputNumber>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <FormItem label="上架状态" prop="shangjiaState">
          <RadioGroup v-model="shangpinForm.shangjiaState">
            <Radio label="1">立即上架</Radio>
            <Radio label="0">暂不上架</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <FormItem label="商品图片（最多5张）">
        <addgood-img @increment="changeImgs" :goodsID="goodsID"></addgood-img>
      </FormItem>
    </Row>
    <Row>
      <FormItem label="商品详情">
        <edit @increment="changeGoodsDetail" :goodsID="goodsID"></edit>
      </FormItem>
    </Row>
    <Row style="text-align: center">
      <Button type="success" @click="ok">保存商品信息</Button>
      <Button type="warning">取消</Button>
    </Row>
  </Form>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import addgoodImg from "@/components/zhaoshengbaoming/wxmall/addgoodImg.vue";
import edit from "@/components/zhaoshengbaoming/wxmall/edit.vue";

export default {
  components: {
    addgoodImg,
    edit,
  },
  props: {
    goodsID: {
      type: String,
    },
  },
  name: "addbuxistyle",
  data() {
    return {
      show: this.value,
      loading: true,
      shangpinForm: {
        goodsName: "",
        goodsTypeID: "",
        basicPrice: 0.01,
        jifenPrice: 0.01,
        shangjiaState: "1",
        huodongID: 0,
        huodongStartTime: "",
        huodongEndTime: "",
        onlyTimeBuyPrice: 0.01,
        kanjiaOniceMinNum: 0.01,
        kanjiaOniceMaxNum: 0.01,
        kanjiaSuccessPrice: 0.01,
        style: "1",
        paixu: 0,
        fidFanyongBili: 0,
        gfidFanyongBili: 0,
        goodInfo: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
      },
      flag: false,
      shangpinFormRule: {
        goodsName: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "change",
            type: "string",
          },
        ],
        goodsTypeID: [
          {
            required: true,
            message: "请选择商品类别",
            trigger: "change",
            type: "string",
          },
        ],
        basicPrice: [
          {
            required: true,
            message: "请输入一口价",
            trigger: "change",
            type: "number",
          },
        ],
        jifenPrice: [
          {
            required: true,
            message: "请输入积分兑换价",
            trigger: "change",
            type: "number",
          },
        ],
        shangjiaState: [
          {
            required: true,
            message: "请选择上架状态",
            trigger: "change",
            type: "string",
          },
        ],
        huodongID: [
          {
            required: true,
            message: "请选择参与活动",
            trigger: "change",
            type: "string",
          },
        ],
        style: [
          {
            required: true,
            message: "请选择商品类型",
            trigger: "change",
            type: "string",
          },
        ],
      },
      goosTypeData: [],
      huodongData: [],
      canjiahuodong: "1",
      showselecthuodong: false,
      fanyongshezhi: "0",
      fanyongshezhishow: false,
      defaultfidFanyongBili: 0,
      defaultgfidFanyongBili: 0,
      paixustyle: "1",
    };
  },
  methods: {
    ...mapActions([
      "addWscGoods",
      "GetGoodstypeList",
      "GetAllHuodongList",
      "GetGoodsInfoDetail",
      "updateWscGoodsByID",
      "GetSanjiFanyongInfo",
    ]),
    ok() {
      this.$refs["shangpinForm"].validate((valid) => {
        if (valid) {
          if (this.shangpinForm.huodongID != 0) {
            this.shangpinForm.huodongStartTime = toolbox.dateFtt(
              this.shangpinForm.huodongStartTime,
              "yyyy-MM-dd"
            );
            this.shangpinForm.huodongEndTime = toolbox.dateFtt(
              this.shangpinForm.huodongEndTime,
              "yyyy-MM-dd"
            );
          }
          console.log(this.shangpinForm);
          if (this.goodsID == "0") {
            this.addWscGoods(this.shangpinForm).then((result) => {
              if (result.code == "Y" && result.success == true) {
                this.$Message.success("商品信息保存成功");
                this.$refs["shangpinForm"].resetFields();
                this.$emit("increment", result.msg);
              } else {
                this.$Message.error("商品信息保存失败");
              }
            });
          } else {
            this.updateWscGoodsByID(this.shangpinForm).then((result) => {
              if (result.code == "Y" && result.success == true) {
                this.$Message.success("商品信息修改成功");
                this.$refs["shangpinForm"].resetFields();
              } else {
                this.$Message.error(result.msg);
              }
            });
          }
        } else {
          this.$Message.error("请将必填字段填写完整!");
          // 官方目前没有解决方案
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
        }
      });
    },
    checkstaffTel() {},
    changeGoodsDetail(content) {
      this.shangpinForm.goodInfo = content;
    },
    changeImgs(imgList) {
      this.shangpinForm.img1 = JSON.parse(imgList)[0].url;
      this.shangpinForm.img2 = JSON.parse(imgList)[1].url;
      this.shangpinForm.img3 = JSON.parse(imgList)[2].url;
      this.shangpinForm.img4 = JSON.parse(imgList)[3].url;
      this.shangpinForm.img5 = JSON.parse(imgList)[4].url;
    },
    checkhuodong() {
      if (this.shangpinForm.huodongID != 0) {
        this.flag = true;
      } else if (this.shangpinForm.huodongID == 0) {
        this.flag = false;
      }
    },
    changecanjiahuodong() {
      console.log(this.canjiahuodong);
      if (this.canjiahuodong == 2) {
        this.showselecthuodong = true;
      } else {
        this.showselecthuodong = false;
        this.shangpinForm.huodongID=0;
      }
    },
    changefanyongshezhishow() {
      console.log(this.fanyongshezhi);
      if (this.fanyongshezhi == 0) {
        this.fanyongshezhishow = false;
      } else {
        this.fanyongshezhishow = true;
      }
    },
  },
  mounted() {
    this.GetSanjiFanyongInfo({ paramsID: this.shezhiID }).then((res) => {
      if (res.code == "Y" && res.success == true) {
        if (res.obj.modifyValue) {
          this.defaultfidFanyongBili = res.obj.modifyValue.split("_")[1];
          this.defaultgfidFanyongBili = res.obj.modifyValue.split("_")[0];
          this.shangpinForm.fidFanyongBili = res.obj.modifyValue.split("_")[1];
          this.shangpinForm.gfidFanyongBili = res.obj.modifyValue.split("_")[0];
        } else {
          console.log(res.obj.defaultValue);
          this.defaultfidFanyongBili = res.obj.defaultValue.split("_")[1];
          this.defaultgfidFanyongBili = res.obj.defaultValue.split("_")[0];
          this.shangpinForm.fidFanyongBili = res.obj.defaultValue.split("_")[1];
          this.shangpinForm.gfidFanyongBili =
            res.obj.defaultValue.split("_")[0];
        }
      }
    });
    if (this.goodsID != "0") {
      this.GetGoodsInfoDetail({ goodsID: this.goodsID }).then((response) => {
        if (response.code == "Y" && response.success == true) {
          this.shangpinForm.goodsName = response.obj.goodsName;
          this.shangpinForm.goodsTypeID = response.obj.goodsTypeID;
          this.shangpinForm.basicPrice = response.obj.basicPrice;
          this.shangpinForm.jifenPrice = response.obj.jifenPrice;
          this.shangpinForm.shangjiaState = response.obj.shangjiaState;
          this.shangpinForm.huodongID = response.obj.huodongID;
          this.shangpinForm.huodongStartTime = toolbox.dateFtt(
            response.obj.huodongStartTime,
            "yyyy-MM-dd"
          );
          this.shangpinForm.huodongEndTime = toolbox.dateFtt(
            response.obj.huodongEndTime,
            "yyyy-MM-dd"
          );
          this.shangpinForm.onlyTimeBuyPrice = response.obj.onlyTimeBuyPrice;
          this.shangpinForm.kanjiaOniceMinNum = response.obj.kanjiaOniceMinNum;
          this.shangpinForm.kanjiaOniceMaxNum = response.obj.kanjiaOniceMaxNum;
          this.shangpinForm.kanjiaSuccessPrice =
            response.obj.kanjiaSuccessPrice;
          this.shangpinForm.style = response.obj.style;
          this.shangpinForm.paixu = response.obj.paixu;
          this.shangpinForm.fidFanyongBili = response.obj.fidFanyongBili;
          this.shangpinForm.gfidFanyongBili = response.obj.gfidFanyongBili;
          this.shangpinForm.goodInfo = response.obj.goodinfo;
          this.shangpinForm.img1 = response.obj.img1;
          this.shangpinForm.img2 = response.obj.img2;
          this.shangpinForm.img3 = response.obj.img3;
          this.shangpinForm.img4 = response.obj.img4;
          this.shangpinForm.img5 = response.obj.img5;
        }
      });
    } else {
    }
    this.GetGoodstypeList({})
      .then((result) => {
        if (result.code == "Y" && result.success == true) {
          this.goosTypeData = result.obj;
        }
      })
      .catch((err) => {});
    this.GetAllHuodongList({}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        res.obj.forEach((element) => {
          if (element.id <= 3) {
            this.huodongData.push(element);
          }
        });
      }
    });
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["shangpinForm"].resetFields();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
