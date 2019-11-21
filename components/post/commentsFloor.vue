<template>
  <!-- <div></div> -->
  <div class="comments-floor" v-if="item.parent">
    <floor v-if="item.parent" :item="item.parent" @replay="replay(item.parent.id)"/>
    <div class="item" @mouseout="hide" @mouseover="show">
      <div class="userInfo">
        <span class="username">{{item.account.nickname}}</span>
        <span class="time">{{item.account.created_at | changeTime}}</span>
        <span class="number" >{{item.level -1}}</span>
      </div>
      <div class="content">{{item.parent.content}}</div>
      <div class="picture" v-if="item.parent">
        <img v-for="(e,i) in item.parent.pics" :key="i" :src="`${$axios.defaults.baseURL}${e.url}`" alt />
        <!-- <img src="@/static/images/aoteman1.jpg" alt /> -->
      </div>
      <div class="replay"  v-show="isShow" @click="replay(item.id)">回复</div>
    </div>
    <!-- <span v-show="false">{{length}}</span> -->
  </div>
</template>

<script>
export default {
  name: "floor",
  props: ["item"],
  filters: {
    changeTime(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      var h = date.getHours();
      var m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      const time = `${year}-${month}-${day} ${h}:${m}`;
      return time;
    }
  },
  data() {
    return {
      // 用于显示回复按钮
      isShow: false,
    };
  },
  methods: {
    // 隐藏回复按钮
    hide() {
      this.isShow = false;
    },
    // 显示回复按钮
    show() {
      this.isShow = true;
    },
    // 回复楼层评论 
    
    replay(id) {
      // 这个函数,有可能是自己触发的,
      // 就是点击事件本身,没有 id
      // 我就应该往上一层传递自己的 id

      // 如果 data.id 存在证明 是前面的递归层传出来的数据
      // 我要原封不动继续往下传
      this.$emit("replay", id);
      
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
    .number {
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
  .item {
    position: relative;
    .replay {
      // display: none;
      position: absolute;
      right: 0;
      bottom: 5px;
      margin-right: 20px;
      padding-top: 10px;
      font-size: 14px;
      color: #1e50a2;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
.show {
  display: block !important;
}
</style>