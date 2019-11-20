<template>
  <div class="comments-floor">
    <div class="userInfo">
      <span class="username">地球发动机</span>
      <span class="time">2019-11-19 8:41</span>
    </div>
    <div class="content">我是来测试的</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.comments-floor {
  background: #f9f9f9;
  padding: 2px;
  border: 1px solid #dddddd;
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
  }
  .content {
    padding-bottom: 20px;
    padding-left: 20px;
  }
}
</style>