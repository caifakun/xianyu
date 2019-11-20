<template>
  <div class="comments-floor">
    <div class="userInfo">
      <span class="username">地球发动机</span>
      <span class="time">2019-11-19 8:41</span>
      <span class="number">1</span>
    </div>
    <div class="content">我是来测试的</div>
    <div class="picture">
      <img src="@/static/images/aoteman1.jpg" alt />
    </div>
    <div class="replay" :class="{show:current == index}" @mousenter="show(index)">回复</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用于显示回复按钮
      current: null,
      isShow: false
    };
  },
  methods: {
    show(index) {
      this.isShow = true;
    }
  }
};
</script>

<style lang="less" scoped>
.comments-floor {
  width: 628px;
  background: #f9f9f9;
  padding: 2px;
  margin: 0 auto;
  border: 1px solid #dddddd;
  overflow: hidden;
  .userInfo {
    padding: 5px 10px 0;
    font-size: 12px;
    margin-bottom: 20px;
    .username {
      color: #666;
    }
    .time {
      color: #999;
    }
    .number{
      float: right;
    }
  }
  .content {
    // float: left;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .picture {
    margin-left: 20px;
    img {
      padding: 5px;
      width: 80px;
      height: 80px;
      object-fit: cover;
      border: 1px dashed #ddd;
      border-radius: 10px;
    }
  }
  .replay {
    // display: none;
    float: right;
    margin-right: 20px;
    padding-top: 10px;
    font-size: 14px;
    color: #1e50a2;
  }
}
.show {
  display: block;
}
</style>