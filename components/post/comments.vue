<template>
  <div class="comments">
    <!-- 评论区域 -->
    <p class="title">评论</p>
    <el-input
      class="textarea"
      type="textarea"
      :rows="2"
      placeholder="说点什么吧..."
      v-model="form.content"
      ref="textarea"
    ></el-input>
    <div class="commit">
      <div class="left">
        <el-upload
          action="http://127.0.0.1:1337/upload"
          list-type="picture-card"
          name="files"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- :file-list="fileList" -->
        <!-- 用于查看图片 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt class="look" />
        </el-dialog>
      </div>
      <div class="right">
        <el-button type="primary" @click="postComment">提交</el-button>
      </div>
    </div>
    <!-- 评论的内容 -->
    <div class="comments-content">
      <div
        class="comment-item"
        v-for="(item,index) in commentsList.data"
        :key="index"
        @mouseenter="show(index)"
        @mouseleave="leave(index)"
      >
        <div class="user">
          <div class="userInfo">
            <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
            <span class="username">{{item.account.nickname}}</span>
            <!-- <span class="time">2019-11-19 3:58</span> -->
            <span class="time">{{item.account.created_at | changeTime}}</span>
          </div>
          <span class="number">{{item.level}}</span>
        </div>
        <CommentsFloor :data="item" />
        <div class="item-content">
          <div class="text">{{item.content}}</div>
          <div class="picture" v-if="item.pics" >
            <img v-for="(e,i) in item.pics" :key="i" :src="`${$axios.defaults.baseURL}${e.url}`" alt="">
          </div>
          <span
            class="replay"
            :class="{show:current == index}"
            v-if="isShow"
            @click="replayComment(item.id)"
          >回复</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentsFloor from "@/components/post/commentsFloor.vue";
// 引入moment插件
// import moment from "moment";
export default {
  components: {
    CommentsFloor
  },
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
      form: {
        content: "", // 用于写评论内容
        score: [], // 评分对象
        pics: [], //图片
        post: this.$route.query.id, // 文章id
        follow: null //回复评论
      },
      fileList: [], //用于存储上传图片文件
      commentsList: [], //用于存储评论数据
      //用于放大图片
      dialogImageUrl: "",
      dialogVisible: false,

      // 用于设置回复按钮
      current: null,
      isShow: false
    };
  },
  methods: {
    // 显示回复按钮
    show(index) {
      this.current = index;
      this.isShow = true;
      console.log(123);
    },
    // 隐藏回复按钮
    leave(index) {
      this.current = index;
      this.isShow = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片成功
    handleSuccess(res) {
      this.form.pics.push(res[0]);

      // this.form.pics = this.fileList;
      // console.log( this.fileList);
      
    },
    // 移除图片
    handleRemove(file, fileList) {
      // 删除后重新赋值
      this.form.pics = fileList;
    },
    // 发表评论
    postComment() {
      if (this.form.content.trim() != "") {
        this.$axios({
          url: "/comments",
          method: "post",
          data: this.form,
          headers: {
            // Bearer属于jwt的token标准
            Authorization: "Bearer " + this.$store.state.user.userInfo.token
          }
        }).then(res => {
          // console.log(res);
          const { message } = res.data;
          if (message == "提交成功") {
            this.$message.success("发布评论成功");
            this.form.content = "";
            this.fileList = [];
          }
        });
      }
      
      // else {
      //   this.$message.error("请输入内容");
      // }
    },
    // 回复评论
    replayComment(id) {
      this.$refs.textarea.focus();
      
      this.form.follow = id;
      this.postComment();
    }
  },
  mounted() {
    // 获取评论
    this.$axios({
      url: "/posts/comments",
      params: {
        post: this.form.post
      }
    }).then(res => {
      // console.log(res);
      this.commentsList = res.data;
      console.log(this.commentsList);
    });
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
      position: relative;
      padding-left: 30px;
      margin-bottom: 20px;
      .text {
        margin-top: 20px;
      }
      .replay {
        position: absolute;
        display: none;
        right: 20px;
        bottom: -10px;
        font-size: 14px;
        color: #1e50a2;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .picture{
        margin-top: 10px;
        img{
          padding: 5px;
          width: 80px;
          height: 80px;
          object-fit: cover;
          border: 1px dashed #ddd;
          border-radius: 10px;
        }
      }
    }
  }
}
.show {
  display: block !important;
}
</style>