<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in form.users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="hanldeChange(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha(form.contactPhone)">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <!-- 这里只是为了监听totalPrice -->
    <span v-show="false">{{totalPrice}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // 乘机人信息
        users: [
          {
            username: "",
            id: ""
          }
        ],
        insurances: [], //存入选中保险的id
        contactName: "", //联系人名字
        contactPhone: "", //联系人电话
        captcha: "", //验证码
        invoice: true, //是否需要发票
        seat_xid: "", //座位id
        air: "" //航班id
      },
      // 机票信息
      infoData: {
        insurances: [] //保险
      },
      flightsData: {}
    };
  },
  computed: {
    totalPrice() {
      if (!this.flightsData.seat_infos) return;
      let price = 0;
      // 成人机票单价
      price += this.flightsData.seat_infos.org_settle_price;
      // 机建+燃油
      price += this.flightsData.airport_tax_audlet;
      // 保险费
      price += this.flightsData.insurances.length * 30;
      // 总人数
      price *= this.form.users.length;
      // 计算好后存到store中
      this.$store.commit("air/setTotalPrice", price);
      // 只是作为返回作用
      return "";
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.form.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.form.users.splice(index, 1);
    },
    // 判断保险是否选中
    hanldeChange(id) {
      const index = this.form.insurances.indexOf(id);
      // 判断是否存在
      if (index > -1) {
        //   存在就进行删除
        this.form.insurances.splice(index, 1);
      } else {
        this.form.insurances.push(id);
      }
    },

    // 发送手机验证码
    async handleSendCaptcha(phone) {
      if (!phone) {
        this.$message.error("请输入手机号", "提示");
        return;
      }
      const code = await this.$store.dispatch("user/sendCaptcha", phone);
      this.$confirm("验证码为：" + code, "提示", {
        showCancelButton: false // 隐藏取消按钮
      });
    },

    // 提交订单
    handleSubmit() {
      // 结构出来，修改this.form中air,seat_xid
      const { id: air, seat_xid } = this.$route.query;
      this.form = { ...this.form, air, seat_xid };
      //    console.log(this.form);
      this.$axios({
        url: "/airorders",
        method: "post",
        data: this.form,
        headers: {
          // Bearer属于jwt的token标准
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res);
        this.$message.success("正在生成订单，请稍后！");
      });
    }
  },
  mounted() {
    //   从url中拿到参数信息进行请求机票信息
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "/airs/" + id,
      method: "get",
      params: {
        seat_xid
      }
    }).then(res => {
      // console.log(res.data);
      const { insurances } = res.data;
      // 把保险信息存到this.infoData.insurances
      this.infoData.insurances = insurances;
      // 把机票信息存储到store中
      this.flightsData = res.data;
      console.log(this.flightsData);

      this.$store.commit("air/setFlightsData", res.data);
    });
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>