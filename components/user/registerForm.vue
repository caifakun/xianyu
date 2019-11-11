<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha()">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegisterSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 这里是elemen-ui自定义验证规则---确认密码
    // 确认密码
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "", //进行用户名数据绑定
        password: "", //进行密码数据绑定
        checkPassword: "", //进行确认密码数据绑定
        captcha: "", // 进行验证码绑定
        nickname: "" //进行验昵称绑定
      },
      // 表单规则
      rules: {
        // 验证用户名
        username: [
          { required: true, message: "请输入用户名/手机", trigger: "blur" },
            { min: 11, max: 11, trigger: "blur" }  //这个是验证位数
        ],
        // 验证码
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        // 验证昵称
        nickname: [
          { required: true, message: "请输入你的昵称", trigger: "blur" }
        ],
        // 验证密码
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // 确认密码
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
    
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      // 这里的$confirm是element-ui弹窗提示方法
      // 判断如果用户名为空
      if (!this.form.username) {
        this.$confirm("手机号不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 如果手机号的长度不是11位
      if (this.form.username.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 如果满足条件，发送请求 进行短信验证
      this.$axios({
        url: "/captchas",
        method: "post",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        console.log(res.data);
        const { code } = res.data;
        this.$confirm("验证码为：" + code, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },
    // 提交登录
    handleRegisterSubmit() {}
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
