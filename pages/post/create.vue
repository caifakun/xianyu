<template>
  <div>
    <Header />
    <div class="container">
      <div class="left">
        <h2 class="text">发表新攻略</h2>
        <span class="share">分享你的个人游记，让更多人看到哦！</span>
        <el-form ref="form" :model="form" label-width="80px" class="form">
          <el-input v-model="form.title" placeholder="请输入标题" class="input"></el-input>
          <!-- 富文本框的配置
        v-model 是我们的富文本内容
        editorToolbar 使我们的工具栏配置 
        useCustomImageHandler= 是一个布尔值,
        如果为true 就可以自定义上传图片的方法
        定义完了这个,我们就可以监听一个事件
        image-added然后调用一个函数进行图片的上传
          发送 ajax 请求-->
          <vue-editor
            id="editor"
            :useCustomImageHandler="true"
            v-model="form.content"
            :editorToolbar="customToolbar"
          ></vue-editor>
          <!-- @image-added="imageUpload" -->
          <el-form-item label="选择城市" class="select">
            <el-input class="inputCity" placeholder="请搜索游玩城市" v-model="form.city"></el-input>
          </el-form-item>
        </el-form>
        <el-row class="post">
          <el-button type="primary" class="button" @click="post">发布</el-button>
          <span class="or">或者</span>
          <a href="javascript:;" class="save">保存到草稿</a>
        </el-row>
      </div>
      <div class="right">
        <h4 class="draft">草稿箱（0）</h4>
        <div class="draft-content">
          <span class="draft-title">123</span>
          <span class="el-icon-edit"></span>
          <p class="time">2019-11-18</p>
        </div>
        <div class="draft-content">
          <span class="draft-title">123</span>
          <span class="el-icon-edit"></span>
          <p class="time">2019-11-18</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
// 引入富文本插件
import { VueEditor } from "vue2-editor";
export default {
  components: {
    Header,
    Footer,
    VueEditor
  },
  data() {
    return {
      form: {
        title: "", //数据绑定标题
        content: "", //数据绑定文章内容
        city: "" //搜索游玩城市
      },
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ]
    };
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  overflow: hidden;
  .left {
    float: left;
    width: 750px;
  }
  .text {
    font-weight: normal;
    font-size: 22px;
    margin-bottom: 10px;
  }
  .share {
    display: block;
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
  }
  .form {
    margin-bottom: 20px;

    .input {
      margin-bottom: 20px;
    }
    /deep/.ql-toolbar {
      padding: 8px;
    }
    /deep/.ql-editor {
      height: 400px;
    }
  }
  .select {
    margin: 20px 0;
  }
  .selectCity {
    font-size: 14px;
  }
  .inputCity {
    width: 200px;
  }
  .post {
    margin-bottom: 30px;
    .or {
      font-size: 14px;
      margin-left: 15px;
    }
    .save {
      font-size: 14px;
      color: #ffa500;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .right {
    float: right;
    width: 200px;
    padding: 10px;
    border: 1px solid #dddddd;
    .draft {
      font-weight: normal;
    }
    .draft-content {
      margin: 10px 0;
      font-size: 14px;
      .time {
        color: #999;
      }
    }
  }
}
</style>