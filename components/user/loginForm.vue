<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "", //进行双向数据绑定
        password: "" //进行双向数据绑定
      },
      // 表单规则
      rules: {
        // 验证用户名
        username: [
          { required: true, message: "请输入用户名/手机", trigger: "blur" },
        //   { min: 11, max: 11, trigger: "blur" }  这个是验证位数
        ],
        // 验证密码
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      // 发送ajax请求登录时候，先判断表单信息
      this.$refs.form.validate(valid => {
        //   如果valid为ture
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "post",
            data: this.form
          }).then(res => {
            console.log(res.data);
            // vuex不能直接修改store的值
            // 调用mutations下的方法修改userInfo,调用时候传入res.data
            this.$store.commit('user/setUserInfo',res.data);
            this.$router.push({
              path:'/' //登录成功后跳转主页
            })
          })
        //   这里用于捕捉失败
        //   .catch(res=>{
        //       console.log(res.response)
        //   })
        }
      });
    }
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
