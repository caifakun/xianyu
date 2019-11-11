// store中的state必须要暴露出去，state表单存放数据的对象（state属性名是固定）
export const state = {
  userInfo: {
    // token:'',
    // user:{}
  }
}

// mutations是用于同步修改state的数据
export const mutations = {
  // 设置userInfo
  setUserInfo(state, data) {
    state.userInfo = data
    return state.userInfo //解决警告的问题
  },
  // 清楚userInfo
  clearUserInfo(state, data) {
    return state.userInfo = data
  }
}
// actions是用于异步修改state的数据
export const actions = {
  login(store, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "post",
      data,
    }).then(res => {
      // vuex不能直接修改store的值
      // 调用mutations下的方法修改userInfo,调用时候传入res.data
      // this.$store.commit('user/setUserInfo',res.data);

      // 调用当前模块下的mutations是不需要加上模块名字的
      store.commit('setUserInfo', res.data)
    })
  },
  sendCaptcha(store, tel) {
    // 如果满足条件，发送请求 进行短信验证
    return this.$axios({
      url: "/captchas",
      method: "post",
      data: {
        tel
      }
    }).then(res => {
      const {
        code
      } = res.data;
      return code;
    });
  },
  register(store, data) {
    return this.$axios({
      url: "/accounts/register",
      method: "post",
      data
    }).then(res => {
    // console.log(res.data);
    // 调用当前模块下的mutations是不需要加上模块名字的
      store.commit('setUserInfo', res.data);
    });
  }
}
