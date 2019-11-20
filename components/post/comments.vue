<template>
  <div class="comments">
    <!-- 评论区域 -->
    <p class="title">评论</p>
    <el-input class="textarea" type="textarea" :rows="2" placeholder="说点什么吧..." v-model="textarea"></el-input>
    <div class="commit">
      <div class="left">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- 用于查看图片 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt class="look" />
        </el-dialog>
      </div>
      <div class="right">
        <el-button type="primary">提交</el-button>
      </div>
    </div>
    <!-- 评论的内容 -->
    <div class="comments-content">
      <div class="comment-item">
        <div class="user">
          <div class="userInfo">
            <img src="@/static/images/avatar.jpg" alt />
            <span class="username">地球发动机</span>
            <span class="time">2019-11-19 3:58</span>
          </div>
          <span class="number">1</span>
        </div>
        <div class="item-content">
            <div class="text">啦啦啦啦</div>
        </div>
      </div>

      <div class="comment-item">
        <div class="user">
          <div class="userInfo">
            <img src="@/static/images/avatar.jpg" alt />
            <span class="username">地球发动机</span>
            <span class="time">2019-11-19 3:58</span>
          </div>
          <span class="number">1</span>
        </div>
        <div class="item-content">
          <CommentsFloor />
          <div class="text">啦啦啦啦</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentsFloor from "@/components/post/commentsFloor.vue";
export default {
  components: {
    CommentsFloor
  },
  data() {
    return {
      textarea: "",
      //用于放大图片
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 18px;
  margin-bottom: 20px;
}
/deep/textarea {
  resize: none;
}
.commit {
  margin: 10px 0 30px;
  overflow: hidden;
  .left {
    float: left;
    /deep/.el-upload {
      width: 100px;
      height: 100px;
      i {
        position: relative;
        top: -20px;
      }
    }
    /deep/.el-upload-list__item {
      width: 100px;
      height: 100px;
    }
  }
  .right {
    float: right;
    .el-button {
      width: 60px;
      height: 30px;
      line-height: 30px;
      padding: 0;
    }
  }
}

// 评论内容样式
.comments-content {
  border: 1px solid #dddddd;
  margin-bottom: 20px;
  .comment-item {
    padding: 20px 20px 5px;
    border-bottom: 1px dashed #ddd;
    &:last-child {
      border-bottom: 0;
    }

    .user {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .userInfo {
        display: flex;
        align-items: center;
        flex: 1;
        img {
          width: 16px;
          height: 16px;
          margin: 5px;
        }
        .username {
          color: #666;
          font-size: 12px;
          margin-right: 5px;
        }
        .time {
          color: #999;
          font-size: 12px;
        }
      }
      .number {
        color: #666;
        font-size: 12px;
      }
    }
    .item-content {
      padding-left: 30px;
      margin-bottom: 20px;
      .text {
        margin-top: 10px;
      }
    }
  }
}
</style>