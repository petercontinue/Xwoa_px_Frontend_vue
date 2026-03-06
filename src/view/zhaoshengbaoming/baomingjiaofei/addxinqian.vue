<template>
  <div>
    <Steps :current="current" style="margin-top: 3%">
      <Step title="填写学员基本信息"></Step>
      <Step title=" 选择费项"></Step>
      <Step title=" 确认收费"></Step>
    </Steps>
    <Card style="margin-top: 2%" v-if="current == 0">
      <Form
        ref="addqiandanForm"
        :model="addqiandanForm"
        :rules="addqiandanFormRule"
        :label-width="180"
        :label-colon="true"
      >
        <Row>
          <!-- <Col span="8" style="text-align: center">
            <div class="demo-avatar">
              <Avatar icon="ios-person" size="100" style="margin: 50px" />
            </div>
          </Col>-->
          <Col span="24">
            <Row>
              <Col span="6" offset="6">
                <FormItem>
                  <RadioGroup v-model="stuType" @on-change="chongzhiStu">
                    <Radio label="新签学员"></Radio>
                    <Radio label="充值学员"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col
                span="6"
                offset="6"
                style="text-align: right"
                v-if="stuType == '新签学员'"
              >
                <FormItem label="学生姓名" prop="stuName">
                  <Input
                    type="text"
                    v-model="addqiandanForm.stuName"
                    placeholder="请输入学生姓名"
                    @on-blur="panduanstuName"
                  />
                </FormItem>
              </Col>

              <Col span="6" offset="6" v-if="stuType == '充值学员'">
                <FormItem label="学生姓名" prop="stuName">
                  <Select
                    v-model="addqiandanForm.stuID"
                    placeholder="请选择学生"
                    @on-change="SelectXufeiStu"
                    filterable
                  >
                    <Option v-for="item in AllstuData" :value="item.id" :key="item.id">{{
                      item.stuName
                    }}</Option>
                  </Select>
                </FormItem>
              </Col>

              <!-- <Col span="4" style="margin-left: 20px">
                <Button type="primary" @click="chongzhiStu" v-if="!showczStu"
                  >充值学员</Button
                >
                <Button type="primary" @click="chongzhiStu" v-if="showczStu"
                  >新签学员</Button
                >
              </Col> -->
            </Row>
            <Row>
              <Col span="6" offset="6">
                <FormItem label="联系电话" prop="parentsTel">
                  <Input
                    type="text"
                    :maxlength="11"
                    v-model="addqiandanForm.parentsTel"
                    placeholder="请输入联系电话"
                  />
                </FormItem>
              </Col>
              <Col
                span="12"
                style="text-align: left; padding-left: 5px; padding-top: 8px"
              >
                <label style="color: #2d8cf0"
                  >该联系电话即为学员/家长登录微信学员端的账号</label
                >
              </Col>
            </Row>
            <Row>
              <Col span="6" offset="6">
                <FormItem label="电话关系" prop="parentTelRelation">
                  <Select v-model="addqiandanForm.parentTelRelation" clearable filterable>
                    <Option value="1">本人</Option>
                    <Option value="2">爸爸</Option>
                    <Option value="3">妈妈</Option>
                    <Option value="4">爷爷</Option>
                    <Option value="5">奶奶</Option>
                    <Option value="6">外公</Option>
                    <Option value="7">外婆</Option>
                    <Option value="8">保姆</Option>
                    <Option value="9">其他</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6" offset="6">
                <FormItem label="选择校区" prop="campusID">
                  <Select v-model="addqiandanForm.campusID" placeholder="请选择校区">
                    <Option
                      v-for="item in allcampusData"
                      :value="item.id"
                      :key="item.id"
                      >{{ item.name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col
                span="12"
                style="text-align: left; padding-left: 5px; padding-top: 8px"
              >
                <label style="color: #2d8cf0"></label>
              </Col>
            </Row>
            <Row>
              <Col span="6" offset="6">
                <FormItem label="选择年级/年龄段" prop="stuGradeID">
                  <Select
                    v-model="addqiandanForm.stuGradeID"
                    placeholder="请选择年级/年龄段"
                  >
                    <Option
                      v-for="item in allcampusGrades"
                      :value="item.id"
                      :key="item.id"
                      >{{ item.stugradename }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col
                span="12"
                style="text-align: left; padding-left: 5px; padding-top: 8px"
              >
                <label style="color: #2d8cf0">自定义设置</label>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style="text-align: center; margin-bottom: 1%">
          <Button type="success" @click="showmoreclick">{{ btntext }}</Button>
        </Row>

        <!-- 更多字段 -->
        <div v-if="showmore">
          <Row>
            <Col span="8">
              <FormItem label="自定义学号" prop="zidingyiStuNO">
                <Input
                  type="text"
                  v-model="addqiandanForm.zidingyiStuNO"
                  placeholder="请输入自定义学号"
                  style="width: 70%; float: left"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="学员性别" prop="stuSex">
                <Select
                  v-model="addqiandanForm.stuSex"
                  placeholder="请选择学员性别"
                  style="width: 70%; float: left"
                >
                  <Option value="1">男</Option>
                  <Option value="2">女</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="学员状态" prop="buxiStateID">
                <Select
                  v-model="addqiandanForm.buxiStateID"
                  placeholder="请选择学员状态"
                  style="width: 70%; float: left"
                >
                  <Option value="2">在读</Option>
                  <Option value="3">停课</Option>
                  <Option value="4">结课</Option>
                  <Option value="5">退费</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="招生途径" prop="telFromID">
                <Select
                  v-model="addqiandanForm.telFromID"
                  placeholder="请选择招生途径"
                  style="width: 70%; float: left"
                >
                  <Option
                    v-for="item in alltelfromData"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.telFromName }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="学员生日" prop="stuBrithday">
                <DatePicker
                  type="date"
                  placeholder="请选择学员生日"
                  v-model="addqiandanForm.stuBrithday"
                  style="width: 70%; float: left"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="原就读学校" prop="oldSchoolID">
                <Input
                  type="text"
                  v-model="addqiandanForm.oldSchoolID"
                  placeholder="请输入原就读学校"
                  style="width: 70%; float: left"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="合作老师" prop="oldSchoolTeacherID">
                <Input
                  type="text"
                  v-model="addqiandanForm.oldSchoolTeacherID"
                  placeholder="请输入合作老师"
                  style="width: 70%; float: left"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="家长要求" prop="jiazhangDemand">
                <Input
                  type="textarea"
                  v-model="addqiandanForm.jiazhangDemand"
                  placeholder="请输入家长要求"
                  style="width: 35%; float: left"
                  maxlength="50"
                />
              </FormItem>
            </Col>
          </Row>

          <!-- 自定义字段 -->
          <Row>
            <Col span="24">
              <Collapse simple v-model="diyParamPanel">
                <Panel name="open">
                  自定义字段
                  <label style="color: #2d8cf0"
                    >(以下自定义字段在【机构管理-系统设置-学员设置
                    报名自定义字段】进行自定义设置的)</label
                  >
                  <p slot="content" style="padding-top: 10px">
                    <Row>
                      <Col span="8" v-for="diyParam in diyShortParam" :key="diyParam.id">
                        <FormItem
                          :label="diyParam.stuparamtypename"
                          :prop="'diyParam_' + diyParam.id"
                        >
                          <!-- v-model="diyParam.savevalue" -->
                          <Input
                            :placeholder="'请输入' + diyParam.stuparamtypename"
                            v-model="
                              addqiandanForm['diyParam_' + diyParam.id]['paramValue']
                            "
                            style="width: 70%; float: left"
                          ></Input>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="8" v-for="diyParam in diySelectParam" :key="diyParam.id">
                        <FormItem
                          :label="diyParam.stuparamtypename"
                          :prop="'diyParam_' + diyParam.id"
                        >
                          <!-- v-model="diyParam.savevalue" -->
                          <Select
                            clearable
                            filterable
                            v-model="
                              addqiandanForm['diyParam_' + diyParam.id]['paramValue']
                            "
                            style="width: 70%; float: left"
                          >
                            <Option
                              v-for="dropDown in dropDownOptions(diyParam.id)"
                              :key="dropDown.id"
                              :value="dropDown.id"
                              >{{ dropDown.dropDownOptions }}</Option
                            >
                          </Select>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12" v-for="diyParam in diyLongParam" :key="diyParam.id">
                        <FormItem
                          :label="diyParam.stuparamtypename"
                          :prop="'diyParam_' + diyParam.id"
                        >
                          <!-- v-model="diyParam.savevalue" -->
                          <Input
                            type="textarea"
                            v-model="
                              addqiandanForm['diyParam_' + diyParam.id]['paramValue']
                            "
                            :placeholder="'请输入' + diyParam.stuparamtypename"
                            style="width: 70%; float: left"
                          ></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </p>
                </Panel>
              </Collapse>
            </Col>
          </Row>

          <!-- <div v-for="item in zindingyi">
            <Row v-if="item.widthtype == 0">
              <FormItem :label="item.stuparamtypename" prop="zidingyiStuNO">
                <Input
                  type="text"
                  :v-model="item.savevalue"
                  placeholder="请输入"
                  style="width: 70%; float: left"
                />
              </FormItem>
            </Row>
            <Row v-if="item.widthtype == 1">
              <FormItem :label="item.stuparamtypename" prop="zidingyiStuNO">
                <Input
                  type="textarea"
                  :v-model="item.savevalue"
                  placeholder="请输入"
                  style="width: 70%; float: left"
                />
              </FormItem>
            </Row>
          </div>-->
        </div>
      </Form>
    </Card>

    <Card style="margin-top: 2%" v-if="current == 1">
      <Row>
        <Col span="24">
          <Button type="info" size="large" @click="addkeshikecheng"
            >添加【课时】计费课程</Button
          >
          <Button type="info" size="large" @click="addkeshibaokecheng"
            >添加【课时包】计费课程</Button
          >
          <Button type="info" size="large" @click="addqizhiriqikecheng"
            >添加【起止日期】计费课程</Button
          >
          <Button type="success" size="large" @click="editkechengInfo">编辑课程</Button>
          <Button type="warning" size="large" @click="deletekecheng">删除</Button>
        </Col>
      </Row>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selection"
            :columns="columns"
            highlight-row
            @on-row-click="onClickRow"
            :data="data"
          ></Table>
        </Col>
      </Row>

      <Row style="margin-top: 20px">
        <Col span="24">
          <Button type="info" size="large" @click="addzafei">添加杂费</Button>
          <Button type="warning" size="large" @click="deletezafei">删除杂费</Button>
        </Col>
      </Row>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selectionzf"
            highlight-row
            @on-row-click="onClickRowzf"
            :columns="columnszf"
            :data="datazf"
          ></Table>
        </Col>
      </Row>

      <Row style="margin-top: 20px">
        <Col span="24">
          <Button type="info" size="large" @click="addwuping">添加商品</Button>
          <Button type="warning" size="large" @click="deleteshangping">删除商品</Button>
        </Col>
      </Row>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selectionsp"
            highlight-row
            @on-row-click="onClickRowsp"
            :columns="columnssp"
            :data="datasp"
          ></Table>
        </Col>
      </Row>
    </Card>

    <Card style="margin-top: 2%" v-if="current == 2">
      <Form
        ref="querenForm"
        :model="querenForm"
        :rules="querenFormRule"
        :label-width="100"
        :label-colon="true"
      >
        <Row>
          <Col span="4" offset="4">
            <FormItem label="课程总金额" prop="amountKC">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountKC"
                placeholder="请输入课程总金额"
                style="width: 100%"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="杂费总金额" prop="amountOther">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountOther"
                placeholder="请输入杂费总金额"
                style="width: 100%"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="商品总金额" prop="amountWp">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountWp"
                placeholder="请输入商品总金额"
                style="width: 100%"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6" offset="4">
            <FormItem label="优惠政策" prop="youhuizhengce">
              <Select
                v-model="querenForm.youhuizhengce"
                placeholder="请选择优惠政策"
                style="width: 100%"
                @on-change="SelectYouhuizhengce"
              >
                <Option
                  v-for="item in allyouhuizhengce"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="12" style="text-align: left; padding-left: 5px; padding-top: 8px">
            优惠政策<label style="color: #2d8cf0"
              >【<router-link to="/youhuizhengce">点击这里</router-link>】</label
            >自定义设置
          </Col>
        </Row>
        <Row>
          <Col span="6" offset="4">
            <FormItem label="是否使用代金券" prop="userdaijinquan">
              <RadioGroup
                v-model="querenForm.userdaijinquan"
                @on-change="changeSelectDjq"
              >
                <Radio label="不使用代金券"></Radio>
                <Radio label="使用代金券"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem
              label="代金券金额"
              prop="daijinquan"
              v-if="querenForm.userdaijinquan == '使用代金券'"
            >
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.daijinquan"
                placeholder="请输入代金券金额"
                style="width: 100%; float: left"
                @on-change="changeDaijinquan"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12" offset="4">
            <FormItem label="合同总金额" prop="amountMoney">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountMoney"
                placeholder="请输入合同总金额"
                style="width: 40%; float: left"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="4" offset="4">
            <FormItem label="是否定金报名" prop="dingjinbaoming">
              <RadioGroup
                v-model="querenForm.dingjinbaoming"
                @on-change="changedingjinzt"
              >
                <Radio label="否"></Radio>
                <Radio label="是"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>

          <Col span="4">
            <FormItem
              label="定金金额"
              prop="dingjin"
              v-if="querenForm.dingjinbaoming == '是'"
            >
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.dingjin"
                placeholder="请输入定金金额"
                style="width: 100%"
                @on-change="changeDingjinMoney"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="6" offset="4">
            <FormItem label="实收金额" prop="amountshishou">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountshishou"
                placeholder="请输入实收金额"
                style="width: 100%"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6" offset="4">
            <FormItem label="是否是转介绍" prop="zhuanIntroduce">
              <RadioGroup
                v-model="querenForm.zhuanIntroduce"
                @on-change="changeZhuanjieshao"
              >
                <Radio label="不是转介绍"></Radio>
                <Radio label="是转介绍"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="6" v-if="isZhuanjieshaoShow">
            <FormItem label="转介绍学员" prop="zhuanjieshaoStuID">
              <Select
                v-model="querenForm.zhuanjieshaoStuID"
                placeholder="请选择转介绍学员"
                style="width: 100%"
              >
                <Option
                  v-for="item in zhuanjieshaoStuData"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.stuName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="6" v-if="isZhuanjieshaoShow">
            <FormItem label="转介绍老师" prop="zhuanjieshaoTeacherID">
              <Select
                v-model="querenForm.zhuanjieshaoTeacherID"
                placeholder="请选择转介绍老师"
                style="width: 100%"
              >
                <Option
                  v-for="item in zhuanjieshaoTeacherData"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.staffName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <!-- <Col span="8">
              <FormItem label="转介绍" prop="zhuanIntroduce">
                <Select
                  v-model="addqiandanForm.zhuanIntroduce"
                  placeholder="请选择转介绍"
                  style="width: 70%; float: left"
                >
                  <Option value="1">是</Option>
                  <Option value="2">否</Option>
                </Select>
              </FormItem>
            </Col> -->
        </Row>
        <Row>
          <Col span="8" offset="4">
            <FormItem label="业绩人" prop="yejistaff">
              <Select
                v-model="addqiandanForm.yejistaff"
                placeholder="请选择业绩人"
                style="width: 100%"
                multiple
                :filterable="true"
                @on-change="changeYejiren"
              >
                <Option v-for="item in allyejistaff" :value="item.id" :key="item.id">{{
                  item.staffName
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12" style="text-align: left; padding-left: 5px; padding-top: 8px">
            <label style="color: #2d8cf0">可多选</label>
          </Col>
        </Row>
        <Row>
          <Col span="6" offset="6">
            <List
              header="业绩人业绩金额"
              footer
              border
              style="width: 100%"
              v-if="yejirenMoney.length > 0"
            >
              <ListItem v-for="(item, index) in yejirenMoney" :key="index">
                {{ item.staffName }}：
                <InputNumber
                  placeholder="业绩金额"
                  :max="10000000"
                  :min="0.01"
                  :step="0.01"
                  @on-change="changeyejijine(item)"
                  v-model="item.yejiMoney"
                  style="width: 50%"
                ></InputNumber>
              </ListItem>
            </List>
          </Col>
        </Row>
        <Row style="margin-top: 15px">
          <Col span="8" offset="4">
            <FormItem label="付款方式">
              <RadioGroup v-model="payType" @on-change="changPaystyle">
                <Radio label="小程序付款"></Radio>
                <Radio label="充值余额付款"></Radio>
                <Radio label="其他付款方式"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="otherPayshow">
          <Col span="6" offset="6">
            <FormItem label="其他付款方式" prop="fufeistyles">
              <Select
                v-model="addqiandanForm.fufeistyles"
                placeholder="请选择付款方式"
                style="width: 100%"
                multiple
                @on-change="changefukuanstyle"
              >
                <Option v-for="item in fufeistyleData" :value="item.id" :key="item.id">{{
                  item.moneystyleName
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12" style="text-align: left; padding-left: 5px; padding-top: 8px">
            <label style="color: #2d8cf0">可多选</label>，付款方式类别<label
              style="color: #2d8cf0"
              >【点击这里】</label
            >自定义设置
          </Col>
        </Row>
        <Row style="margin: 10px">
          <Col span="6" offset="6">
            <List
              header="支付方式支付金额"
              footer
              border
              style="width: 100%"
              v-if="zhifustylemoney.length > 0"
            >
              <ListItem v-for="(item, index) in zhifustylemoney" :key="index">
                {{ item.zhifustyleName }}：
                <InputNumber
                  placeholder="支付方式支付金额"
                  :max="10000000"
                  :min="0.01"
                  :step="0.01"
                  v-model="item.payMoney"
                  style="width: 50%"
                  @on-change="changepaymoney(item)"
                ></InputNumber>
              </ListItem>
            </List>
          </Col>
        </Row>
        <Row>
          <Col span="6" offset="4">
            <FormItem label="签单日期" prop="qiandandate">
              <DatePicker
                type="date"
                placeholder="请选择签单日期"
                v-model="querenForm.qiandandate"
                format="yyyy-MM-dd"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12" offset="4">
            <FormItem label="费用说明" prop="beizhu">
              <Input
                type="textarea"
                v-model="querenForm.beizhu"
                placeholder="请输入费用说明,最多50字，选填"
                style="width: 100%"
                maxlength="50"
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Row
      style="text-align: center; margin: 30px; margin-bottom: 30px"
      v-if="current == 0"
    >
      <Button type="primary" @click="next">下一步</Button>
    </Row>
    <Row
      style="text-align: center; margin-top: 30px; margin-bottom: 30px"
      v-if="current == 1"
    >
      <Button type="primary" @click="back">上一步</Button>
      <Button type="primary" @click="next">下一步</Button>
    </Row>
    <Row
      style="text-align: center; margin-top: 30px; margin-bottom: 30px"
      v-if="current == 2"
    >
      <Button type="primary" @click="back">上一步</Button>
      <Button type="success" @click="saveqiandan(1)">保存并返回</Button>
      <Button type="success" @click="saveqiandan(2)">保存并继续</Button>
    </Row>
    <addkeshijifei-form
      v-model="showaddKeshikecheng"
      :campusID="addqiandanForm.campusID"
      :editData="editkecheng"
      @increment="savekeshikecheng"
    ></addkeshijifei-form>
    <addkeshibao-form
      v-model="showaddkeshibaokecheng"
      :campusID="addqiandanForm.campusID"
      :editData="editkecheng"
      @increment="savekeshikecheng"
    ></addkeshibao-form>
    <addqizhiriqikecheng-form
      v-model="showaddqizhikecheng"
      :campusID="addqiandanForm.campusID"
      :editData="editkecheng"
      @increment="savekeshikecheng"
    ></addqizhiriqikecheng-form>
    <addzafei-form
      v-model="showaddzafei"
      :campusID="addqiandanForm.campusID"
      :zfData="zfData"
      @increment="savezafei"
    ></addzafei-form>
    <addshangpin-form
      v-model="showaddwuping"
      :campusID="addqiandanForm.campusID"
      @increment="savewuping"
    ></addshangpin-form>
  </div>
</template>

<script>
import { routeEqual } from "@/libs/util";
import { mapMutations } from "vuex";
import addkeshijifeiForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addkeshijifeiForm";
import addkeshibaoForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addkeshibaoForm";
import addqizhiriqikechengForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addqizhiriqikechengForm";
import addzafeiForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addzafeiForm";
import addshangpinForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addshangpinForm";
import * as api from "@/api/api.js";

export default {
  components: {
    addkeshijifeiForm,
    addkeshibaoForm,
    addqizhiriqikechengForm,
    addzafeiForm,
    addshangpinForm,
  },
  data() {
    return {
      showczStu: false,
      current: 0,
      bitian_attrName_list:[],    //必填自定义字段
      addqiandanForm: {
        stuID: "",
        stuName: "",
        parentsTel: "",
        campusID: "",
        stuGradeID: "",
        zidingyiStuNO: "",
        stuSex: "",
        buxiStateID: "2",
        telFromID: "",
        stuBrithday: "",
        oldSchoolID: "",
        oldSchoolTeacherID: "",
        jiazhangDemand: "",
        parentTelRelation: "",
      },
      querenForm: {
        amountKC: 0,
        amountOther: 0,
        amountWp: 0,
        youhuizhengce: 0,
        userdaijinquan: "不使用代金券",
        daijinquan: 0,
        amountMoney: 0,
        dingjinbaoming: "否",
        appPay: "否",
        dingjin: 0,
        amountshishou: 0,
        fufeistyles: [],
        yejistaff: [],
        qiandandate: new Date(),
        beizhu: "",
        youhuiMoney: 0,
        zhuanIntroduce: "不是转介绍", //是不是转介绍
        zhuanjieshaoStuID: 0, //转介绍学员
        zhuanjieshaoTeacherID: 0, //转介绍老师
      },
      addqiandanFormRule: {
        stuName: [
          {
            required: true,
            message: "请输入学生姓名",
            trigger: "change",
            type: "string",
          },
        ],
        parentsTel: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
            type: "string",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "change",
          },
        ],
        parentTelRelation: [
          {
            required: true,
            message: "请选择电话关系",
            trigger: "change",
            type: "string",
          },
        ],
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        stuGradeID: [
          {
            required: true,
            message: "请选择年级",
            trigger: "change",
            type: "string",
          },
        ],
      },
      querenFormRule: {
        amountKC: [
          {
            required: true,
            message: "请输入课程总金额",
            trigger: "change",
            type: "number",
          },
        ],
        amountshishou: [
          {
            required: true,
            message: "请输入实收金额",
            trigger: "change",
            type: "number",
          },
        ],
        amountMoney: [
          {
            required: true,
            message: "请输入合同总金额",
            trigger: "change",
            type: "number",
          },
        ],
        fufeistyles: [
          {
            required: true,
            message: "请选择付费方式",
            trigger: "blur",
            type: "array",
          },
        ],
        yejistaff: [
          {
            required: true,
            message: "请选择业绩人",
            trigger: "blur",
            type: "array",
          },
        ],
      },
      allcampusData: [],
      allcampusGrades: [],
      alltelfromData: [],
      zindingyi: [],
      allyouhuizhengce: [],
      allyejistaff: [], //业绩人
      fufeistyleData: [], //付款方式
      zhuanjieshaoStuData: [], //转介绍学员
      zhuanjieshaoTeacherData: [], //转介绍老师
      showmore: false,
      btntext: "显示更多",
      checkAll: false,
      columns: [
        {
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: this.checkAll,
                },
                on: {
                  "on-change": () => {
                    this.value = !this.value;
                    this.data.forEach((item) => {
                      item._checked = this.value; //全选|全取消
                    });
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {},
              }),
            ]);
          },
        },
        {
          title: "是否启用",
          key: "isShow",
          align: "center",
          render: (h, params) => {
            if (params.row.isShow) {
              return h("div", [h("span", "启用")]);
            } else {
              return h("div", [h("span", "不启用")]);
            }
          },
        },
        {
          title: "培训科目",
          key: "kmName",
          align: "center",
        },
        {
          title: "培训方式",
          key: "pxStyleName",
          align: "center",
        },
        {
          title: "培训课程",
          key: "kcName",
          align: "center",
        },
        {
          title: "班级",
          key: "bjName",
          align: "center",
        },
        {
          title: "计费方式",
          key: "jifeistyle",
          align: "center",
          render: (h, params) => {
            if (params.row.jifeistyle == 1) {
              return h("div", [h("span", "按课时计费")]);
            } else if (params.row.jifeistyle == 2) {
              return h("div", [h("span", "按课时包计费")]);
            } else {
              return h("div", [h("span", "按起止日期计费")]);
            }
          },
        },
        {
          title: "开始日期",
          key: "startDate",
          align: "center",
        },
        {
          title: "结束日期",
          key: "endDate",
          align: "center",
        },
        {
          title: "原单价",
          key: "YDJ",
          align: "center",
        },
        {
          title: "购买价",
          key: "DJ",
          align: "center",
        },
        {
          title: "购买课时",
          key: "KS",
          align: "center",
        },
        {
          title: "赠送课时",
          key: "ZKS",
          align: "center",
        },
        {
          title: "折扣",
          key: "ZK",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.ZK == "1.00") {
              state = "未打折";
            } else {
              state = Number(params.row.ZK * 10).toFixed(2) + "折";
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "课程总价",
          key: "ZJ",
          align: "center",
        },
      ],
      data: [],
      //杂费数据项
      columnszf: [
        {
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: this.checkAll,
                },
                on: {
                  "on-change": () => {
                    this.value = !this.value;
                    this.datazf.forEach((item) => {
                      item._checked = this.value; //全选|全取消
                    });
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {},
              }),
            ]);
          },
        },
        {
          title: "费项名称",
          key: "zafeiName",
          align: "center",
        },
        {
          title: "费用金额",
          key: "zafeiZongjia",
          align: "center",
        },
      ],
      datazf: [],
      //商品数据项
      columnssp: [
        {
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: this.checkAll,
                },
                on: {
                  "on-change": () => {
                    this.value = !this.value;
                    this.datasp.forEach((item) => {
                      item._checked = this.value; //全选|全取消
                    });
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {},
              }),
            ]);
          },
        },
        {
          title: "商品名称",
          key: "wpName",
          align: "center",
        },
        {
          title: "商品单价",
          key: "wpChushouJia",
          align: "center",
        },
        {
          title: "购买数量",
          key: "wpShuliang",
          align: "center",
        },
        {
          title: "商品总价",
          key: "wpZongjia",
          align: "center",
        },
      ],
      datasp: [],
      showaddKeshikecheng: false,
      showaddkeshibaokecheng: false,
      showaddqizhikecheng: false,
      showaddzafei: false,
      showaddwuping: false,
      pinjunyeji: 0,
      pinjunpayMoney: 0,
      yejirenMoney: [],
      zhifustylemoney: [],
      editkecheng: "",
      diyParamPanel: "open",
      diyParamList: [],
      dropDownOptionList: [],
      AllstuData: [],
      zfData: "",
      otherPayshow: false,
      payType: "小程序付款",
      isZhuanjieshaoShow: false, //转介绍学员和老师下拉框是否显示
      stuType: "新签学员",
    };
  },
  computed: {
    diyShortParam: function () {
      console.log(
        this.diyParamList.filter((diyParam) => {
          return diyParam.widthtype == 0;
        })
      );
      return this.diyParamList.filter((diyParam) => {
        return diyParam.widthtype == 0;
      });
    },
    diyLongParam: function () {
      return this.diyParamList.filter((diyParam) => {
        return diyParam.widthtype == 1;
      });
    },
    diySelectParam: function () {
      return this.diyParamList.filter((diyParam) => {
        return diyParam.widthtype == 2;
      });
    },
    dropDownOptions: function (id) {
      return (id) => {
        return this.dropDownOptionList.filter((dropDownOption) => {
          return dropDownOption.stuParamTypeId == id && dropDownOption.isShow == 1;
        });
      };
    },
  },
  methods: {
    ...mapMutations(["setTagNavList", "closeTag"]),
    onClickRow(row, index) {
      //改变为勾选样式

      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    onClickRowzf(row, index) {
      //改变为勾选样式
      this.$refs.selectionzf.data[index]._checked = !this.$refs.selectionzf.data[index]
        ._checked;
    },
    onClickRowsp(row, index) {
      //改变为勾选样式
      this.$refs.selectionsp.data[index]._checked = !this.$refs.selectionsp.data[index]
        ._checked;
    },
    //是否是转介绍选择事件

    changeZhuanjieshao() {
      if (this.querenForm.zhuanIntroduce == "不是转介绍") {
        this.isZhuanjieshaoShow = false;
      } else {
        this.isZhuanjieshaoShow = true;
      }
    },
    //支付方式选择事件
    changPaystyle() {
      this.zhifustylemoney = [];
      if (this.payType == "小程序付款") {
        this.querenForm.appPay = "是";
        //加载小程序的
        this.otherPayshow = false;
        this.zhifustylemoney.push({
          paymoneyStyleID: -1,
          zhifustyleName: "小程序支付",
          payMoney: this.querenForm.amountshishou,
        });
      } else if (this.payType == "充值余额付款") {
        this.querenForm.appPay = "否";
        this.otherPayshow = false;
        this.zhifustylemoney.push({
          paymoneyStyleID: -2,
          zhifustyleName: "充值余额支付",
          payMoney: this.querenForm.amountshishou,
        });
      } else if (this.payType == "其他付款方式") {
        this.querenForm.appPay = "否";
        this.otherPayshow = true;
      }
    },
    next() {
      if (this.current == 2) {
        this.current = 0;
      } else if (this.current == 0) {
        this.$refs["addqiandanForm"].validate((valid) => {
          console.log("表单验证信息：");
          console.log(valid);
          for(let item of this.bitian_attrName_list) {
            if(JSON.stringify(this.addqiandanForm[item]) == "{}"){
              this.showmore = true;
              this.btntext = "收起";
              this.$Message.error("自定义字段中还有必填字段没填");
              return;
            }
          }
          if (valid) {
            this.current += 1;
          }
        });
      } else if (this.current == 1) {
        this.getyouhuizhengce();
        this.changPaystyle();
        this.current += 1;
      }
    },
    back() {
      this.current -= 1;
    },

    getAllstu() {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllxufeistuList",{ menuID: 141 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.AllstuData = res.obj;
          this.zhuanjieshaoStuData = res.obj; //转介绍学员
        }
      });
    },
    chongzhiStu() {
      this.addqiandanForm.campusID = "";
      this.addqiandanForm.stuGradeID = "";
      this.addqiandanForm.stuName = "";
      this.addqiandanForm.stuID = "";
      this.addqiandanForm.parentsTel = "";
      this.addqiandanForm.parentTelRelation = "";
      // this.showczStu = !this.showczStu;
    },
    SelectXufeiStu() {
      this.AllstuData.forEach((element) => {
        if (element.id == this.addqiandanForm.stuID) {
          this.addqiandanForm.campusID = element.campusID;
          this.addqiandanForm.stuGradeID = element.stuGradeID;
          this.addqiandanForm.stuName = element.stuName;
          this.addqiandanForm.parentsTel = element.parentTel;
          this.addqiandanForm.parentTelRelation = element.parentTelRelation;
          // this.GetAllStukechengInfoList({
          //   stuID: this.addqiandanForm.selectstuID,
          // }).then((res) => {
          //   console.log(res);
          //   if (res.code == "Y" && res.success == true) {
          //     this.data = res.obj;
          //   }
          // });
        }
      });
    },
    showmoreclick() {
      if (this.showmore == false) {
        this.showmore = true;
        this.btntext = "收起";
      } else {
        this.showmore = false;
        this.btntext = "显示更多";
      }
    },
    addkeshikecheng() {
      this.editkecheng = "";
      if (this.addqiandanForm.campusID == "" || this.addqiandanForm.stuGradeID == "") {
        this.$Message.error("请先选择校区和年级");
      } else {
        this.showaddKeshikecheng = true;
      }
    },
    addkeshibaokecheng() {
      this.editkecheng = "";
      if (this.addqiandanForm.campusID == "" || this.addqiandanForm.stuGradeID == "") {
        this.$Message.error("请选择校区和年级");
      } else {
        this.showaddkeshibaokecheng = true;
      }
    },
    addqizhiriqikecheng() {
      this.editkecheng = "";
      if (this.addqiandanForm.campusID == "" || this.addqiandanForm.stuGradeID == "") {
        this.$Message.error("请选择校区和年级");
      } else {
        this.showaddqizhikecheng = true;
      }
    },
    addzafei() {
      if (this.addqiandanForm.campusID == "" || this.addqiandanForm.stuGradeID == "") {
        this.$Message.error("请选择校区和年级");
      } else {
        this.zfData = "";
        if (this.datazf.length != 0) {
          this.zfData = JSON.stringify(this.datazf);
        }
        this.showaddzafei = true;
      }
    },
    addwuping() {
      if (this.addqiandanForm.campusID == "" || this.addqiandanForm.stuGradeID == "") {
        this.$Message.error("请选择校区和年级");
      } else {
        this.showaddwuping = true;
      }
    },
    getyouhuizhengce() {
      this.allyouhuizhengce = [];
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllStuGradeYoouhuizhengce",{
        stuGradeID: this.addqiandanForm.stuGradeID,
        jine: this.querenForm.amountMoney,
        campusID: this.addqiandanForm.campusID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allyouhuizhengce.push({
            campusID: "",
            endDatetime: "",
            id: "0",
            name: "不使用优惠政策",
            qiyeID: "",
            startDateTime: "",
            stuGradeIDs: "",
            useTimes: 0,
            xianzhijine: 0,
            youhui: 0,
          });
          res.obj.forEach((element) => {
            this.allyouhuizhengce.push(element);
          });
          console.log(this.allyouhuizhengce);
        }
      });
    },
    savekeshikecheng(addkecheng) {
      let datakeshi = JSON.parse(addkecheng);
      for (var i = 0; i < this.data.length; i++) {
        if (
          this.data[i].kcName == datakeshi.kcName &&
          this.data[i].kechengID == datakeshi.kechengID &&
          this.data[i].DJ == datakeshi.DJ
        ) {
          this.data.splice(i, 1);
        }
      }
      this.data.push(datakeshi);

      this.data.forEach((items) => {
        //取消所有对象的勾选，_checked设置为false
        this.$set(items, "_checked", false);
      });
      this.jisuanMoney();
    },
    savezafei(zafeidata) {
      this.datazf.push(JSON.parse(zafeidata));
      this.datazf.forEach((items) => {
        //取消所有对象的勾选，_checked设置为false
        this.$set(items, "_checked", false);
      });
      this.jisuanMoney();
    },
    savewuping(wpdata) {
      this.datasp.push(JSON.parse(wpdata));
      this.datasp.forEach((items) => {
        //取消所有对象的勾选，_checked设置为false
        this.$set(items, "_checked", false);
      });
      this.jisuanMoney();
    },
    //计算金额
    jisuanMoney() {
      let allkechengMoney = 0;
      let zafeiMoney = 0;
      let spMoney = 0;
      this.data.forEach((element) => {
        allkechengMoney += Number(element.ZJ);
        this.querenForm.amountKC = allkechengMoney;
      });
      this.datazf.forEach((element) => {
        zafeiMoney += Number(element.zafeiZongjia);
      });
      this.datasp.forEach((element) => {
        spMoney += Number(element.wpZongjia);
        this.querenForm.amountWp = spMoney;
      });
      this.querenForm.amountOther = zafeiMoney;
      this.querenForm.amountMoney =
        this.querenForm.amountKC + this.querenForm.amountWp + this.querenForm.amountOther;
      this.querenForm.amountshishou = this.querenForm.amountMoney;
    },
    //选择使用优惠政策
    SelectYouhuizhengce() {
      this.allyouhuizhengce.forEach((element) => {
        if (element.id == this.querenForm.youhuizhengce) {
          //打折优惠
          if (element.youhuiType == 1) {
            this.querenForm.amountshishou = Number(
              (this.querenForm.amountMoney * element.youhui) / 10
            ).toFixed(2);
            this.querenForm.youhuiMoney =
              this.querenForm.amountMoney -
              Number((this.querenForm.amountMoney * element.youhui) / 10).toFixed(2);
          }
          //满减优惠
          else {
            this.querenForm.amountshishou = Number(
              (this.querenForm.amountMoney - element.youhui).toFixed(2)
            );
            this.querenForm.youhuiMoney = element.youhui;
          }
        }
      });
    },
    deletekecheng() {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          let i = 0;
          while (i < this.data.length) {
            if (this.data[i]._checked) {
              this.data.splice(i, 1);
              this.jisuanMoney();
              i = 0;
            } else {
              i += 1;
            }
          }
        },
        onCancel: () => {},
      });
    },
    deletezafei() {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          let i = 0;
          while (i < this.datazf.length) {
            if (this.datazf[i]._checked) {
              this.datazf.splice(i, 1);
              this.jisuanMoney();
              i = 0;
            } else {
              i += 1;
            }
          }
        },
        onCancel: () => {},
      });
    },
    deleteshangping() {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          let i = 0;
          while (i < this.datasp.length) {
            if (this.datasp[i]._checked) {
              this.datasp.splice(i, 1);
              this.jisuanMoney();
              i = 0;
            } else {
              i += 1;
            }
          }
        },
        onCancel: () => {},
      });
    },
    //保存签单
    saveqiandan(type) {
      api.post("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddNewStuAndQianDan",{
        stuid: this.addqiandanForm.stuID,
        stuName: this.addqiandanForm.stuName,
        stuSex: this.addqiandanForm.stuSex,
        campusID: this.addqiandanForm.campusID,
        stuGradeID: this.addqiandanForm.stuGradeID,
        buxiStateID: this.addqiandanForm.buxiStateID,
        parentsTel: this.addqiandanForm.parentsTel,
        payMoneyStyle: this.addqiandanForm.payMoneyStyle,
        telFromID: this.addqiandanForm.telFromID,
        qianDanStaffID: this.querenForm.qianDanStaffID,
        qiandandate: this.querenForm.qiandandate,
        zidingyiStuNO: this.addqiandanForm.zidingyiStuNO,
        stuBrithday: this.addqiandanForm.stuBrithday,
        oldSchoolID: this.addqiandanForm.oldSchoolID,
        oldSchoolTeacherID: this.addqiandanForm.oldSchoolTeacherID,
        parentTelRelation: this.addqiandanForm.parentTelRelation,
        beizhu: this.querenForm.beizhu,
        daijinquan: this.querenForm.daijinquan,
        dingjin: this.querenForm.dingjin,
        isappPay: this.querenForm.appPay,
        amountKC: this.querenForm.amountKC,
        amountWp: this.querenForm.amountWp,
        amountOther: this.querenForm.amountOther,
        amountMoney: this.querenForm.amountMoney,
        amountShiji: this.querenForm.amountshishou,
        shijiAmount: this.querenForm.amountshishou,
        oldSname: "",
        oldTname: "",
        wpData: JSON.stringify(this.datasp),
        kcData: JSON.stringify(this.data),
        othermoneydata: JSON.stringify(this.datazf),
        qiandanstaffinfo: JSON.stringify(this.yejirenMoney),
        paytyles: JSON.stringify(this.zhifustylemoney),
        youhuizhengce: this.querenForm.youhuizhengce,
        yxStuID: this.addqiandanForm.yxStuID,
        stuparams: JSON.stringify(this.diyParamList),
        jiazhangDemand: this.addqiandanForm.jiazhangDemand,
        zhuanIntroduce: this.querenForm.zhuanIntroduce == "是转介绍" ? "1" : "0",
        zhuanjieshaoStuID: this.querenForm.zhuanjieshaoStuID,
        zhuanjieshaoTeacherID: this.querenForm.zhuanjieshaoTeacherID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          if (type == 1) {
            //保存并返回
            this.$router.push({
              path: "/xinqian",
              query: {},
            });
            this.guanbiyemian();
          } else {
            //保存并继续
            //this.$router.go(0);   //页面刷新，据说在safri浏览器上不支持这种页面刷新方法，应该用windows.location.reload()
            window.location.reload();
          }
        } else if (res.code == "100" && res.success == false) {
          this.$Message.error(res.msg);
        } else {
          this.$Message.error("保存签单信息出错了");
        }
      });
    },
    guanbiyemian() {
      let route = this.$store.state.app.tagNavList.filter(
        (item) => item.name === "添加新签"
      );
      let result = this.$store.state.app.tagNavList.filter(
        (item) => item.name != "添加新签"
      );
      this.handleCloseTag(result, undefined, route);
    },
    handleCloseTag(res, type, route) {
      this.closeTag(route);
      this.setTagNavList(res);
    },
    //改变代金券金额
    changeDaijinquan() {
      if (this.querenForm.dingjinbaoming == "是") {
        this.querenForm.amountshishou = this.querenForm.dingjin;
      } else {
        this.querenForm.amountshishou = Number(
          this.querenForm.amountMoney -
            this.querenForm.daijinquan -
            this.querenForm.youhuiMoney
        );
      }
      this.changPaystyle();
    },
    //改变代金券使用状态
    changeSelectDjq() {
      if (this.querenForm.userdaijinquan == "是") {
        this.querenForm.amountshishou = Number(
          this.querenForm.amountMoney -
            this.querenForm.daijinquan -
            this.querenForm.youhuiMoney
        );
      } else {
        this.querenForm.daijinquan = 0;
        this.querenForm.amountshishou = Number(
          this.querenForm.amountMoney - this.querenForm.youhuiMoney
        );
      }

      this.changPaystyle();
    },
    //修改定金支付金额
    changeDingjinMoney() {
      this.querenForm.amountshishou = this.querenForm.dingjin;

      this.changPaystyle();
    },
    //修改定金使用状态
    changedingjinzt() {
      if (this.querenForm.dingjinbaoming == "是") {
        this.querenForm.amountshishou = this.querenForm.dingjin;
      } else {
        this.querenForm.dingjin = 0;
        this.querenForm.amountshishou = Number(
          this.querenForm.amountMoney - this.querenForm.youhuiMoney
        );
      }
    },
    //选择业绩人信息
    changeYejiren() {
      this.pinjunyeji = Number(
        this.querenForm.amountshishou / this.addqiandanForm.yejistaff.length
      );
      this.yejirenMoney = [];
      this.addqiandanForm.yejistaff.forEach((element) => {
        this.allyejistaff.forEach((element1) => {
          if (element == element1.id) {
            this.yejirenMoney.push({
              staffID: element1.id,
              staffName: element1.staffName,
              yejiMoney: this.pinjunyeji,
            });
          }
        });
      });
    },
    //选择支付方式
    changefukuanstyle() {
      this.pinjunpayMoney = Number(
        this.querenForm.amountshishou / this.addqiandanForm.fufeistyles.length
      );
      this.zhifustylemoney = [];
      this.addqiandanForm.fufeistyles.forEach((element) => {
        this.fufeistyleData.forEach((element1) => {
          if (element == element1.id) {
            this.zhifustylemoney.push({
              paymoneyStyleID: element1.id,
              zhifustyleName: element1.moneystyleName,
              payMoney: this.pinjunpayMoney,
            });
          }
        });
      });
    },
    //修改业绩人的某个业绩金额
    changeyejijine(item) {
      this.pinjunyeji = Number(
        (this.querenForm.amountshishou - item.yejiMoney) /
          (this.addqiandanForm.yejistaff.length - 1)
      );
      this.yejirenMoney.forEach((element) => {
        if (element.staffName == item.staffName) {
        } else {
          element.yejiMoney = this.pinjunyeji;
        }
      });
    },
    //修改支付方式的支付金额
    changepaymoney(item) {
      this.pinjunpayMoney = Number(
        (this.querenForm.amountshishou - item.paymoney) /
          (this.addqiandanForm.fufeistyles.length - 1)
      );
      this.yejirenMoney.forEach((element) => {
        if (element.zhifustyleName == item.zhifustyleName) {
        } else {
          element.paymoney = this.pinjunpayMoney;
        }
      });
    },
    //编辑课程
    editkechengInfo() {
      let n = 0;
      let checkOne = [];
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i]._checked) {
          n += 1;
          checkOne = this.data[i];
        }
      }

      if (n == 0) {
        this.$Message.error("请选择修改的数据");
      } else if (n > 1) {
        this.$Message.error("只能选择一行");
      } else {
        this.editkecheng = JSON.stringify(checkOne);
        if (checkOne.jifeistyle == 1) {
          //按课时计费课程
          this.showaddKeshikecheng = true;
        } else if (checkOne.jifeistyle == 2) {
          //按课时包计费课程
          this.showaddkeshibaokecheng = true;
        } else if (checkOne.jifeistyle == 3) {
          //按起止日期计费课程
          this.showaddqizhikecheng = true;
        }
      }
    },
    panduanstuName() {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/panduanStuName",{ stuName: this.addqiandanForm.stuName }).then((res) => {
        if (res.code == "Y") {
        } else {
          this.$Message.error(res.msg);
          this.addqiandanForm.stuName = "";
        }
      });
    },
  },
  mounted() {
    this.getAllstu();
    this.addqiandanForm.yxStuID = this.$route.query.yxstuID;
    if (this.$route.query.yxstuID != 0) {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetYxStuInfo",{ yxstuID: this.$route.query.yxstuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.addqiandanForm.stuName = res.obj.stuName;
          this.addqiandanForm.parentsTel = res.obj.parentTel;
          this.addqiandanForm.campusID = res.obj.campusID;
          this.addqiandanForm.stuGradeID = res.obj.stuGradeID;
        }
      });
    }
    api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 141 }).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.allcampusData = res.obj;
      }
    });
    api.get("/xwcloud-sys/sys/SystemSetting/GetAllStuGradeList",{ campusID: this.addqiandanForm.campusID }).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.allcampusGrades = res.obj;
      }
    });
    api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllTelFromList",{}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.alltelfromData = res.obj;
      }
    });
    api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllZidingyiParams",{}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.zindingyi = res.obj;
        this.diyParamList = res.obj;
      }
    });
    //获取业绩人
    api.get("/xwcloud-sys/sys/SystemSetting/GetAllStaffList",{}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.allyejistaff = res.obj;
        this.zhuanjieshaoTeacherData = res.obj; //转介绍老师
      }
    });
    api.get("/xwcloud-sys/sys/StaffManagement/GetAllPxPayMoneyStyleList",{}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.fufeistyleData = res.obj;
      }
    });
    api.get("/xwcloud-zsbm/yxstu/YixiangStu/getYxDropdownOption",{}).then((res) => {
      if (res.code == "success") {
        this.dropDownOptionList = res.obj;
      }
    });
  },
  watch: {
    diyParamList(list) {
      this.bitian_attrName_list = [];  //清空
      console.log("pushRelu", list);
      list.forEach((diyParam, index) => {
        let attrName = "diyParam_" + diyParam.id;
        //push from
        if (!Object.hasOwnProperty.call(this.addqiandanForm, attrName)) {
          this.addqiandanForm[attrName] = {};
        }
        //push relu
        if (diyParam.isbitian == 1) {
          this.bitian_attrName_list.push(attrName);   //把必填的字段加进来
          this.addqiandanFormRule[attrName] = [
            {
              required: true,
              message: "请输入" + diyParam.stuparamtypename,
              trigger: "change",
              validator: (rule, value, callback) => {
                return this.addqiandanForm[attrName].paramValue ? true : false;
              },
            },
          ];

          this.showmore = true;
          this.btntext = "收起";
          // console.log("=======1:");
          // console.log(attrName);
          // console.log("=======2:");
          // console.log(this.addqiandanFormRule[attrName]);
        }
      });
      // console.log("=======3:");
      // console.log(this.addqiandanFormRule);
    },
  },
};
</script>
