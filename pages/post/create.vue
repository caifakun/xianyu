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
            @image-added="imageUpload"
          ></vue-editor>
          <!-- @image-added="imageUpload" -->
          <el-upload
            action="http://127.0.0.1:1337/upload"
            list-type="picture-card"
            name="files"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>-->
          <el-form-item label="选择城市" class="select">
            <el-input class="inputCity" placeholder="请搜索游玩城市" v-model="form.city"></el-input>
          </el-form-item>
        </el-form>
        <el-row class="post">
          <el-button type="primary" class="button" @click="post">发布</el-button>
          <span class="or">或者</span>
          <a href="javascript:;" class="save" @click="save">保存到草稿</a>
        </el-row>
      </div>
      <div class="right">
        <h4 class="draft">草稿箱（{{draftDataList.length}}）</h4>
        <div class="draft-content" v-for="(item,index) in draftDataList" :key="index">
          <span class="main" @click="edit(index)">
            <span class="draft-title">{{item.title}}</span>
            <span class="el-icon-edit"></span>
          </span>
          <span class="del" @click="del(index)">删除</span>
          <p class="time">{{item.time}}</p>
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
let VueEditor;

if (process.browser) {
  let editor = require("vue2-editor").default;
  VueEditor = editor.VueEditor;
}

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
      // 这里是配置富文本框
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ],
      draftDataList: [] //用于存储草稿
    };
  },
  methods: {
    //   上传图片
    imageUpload(file, Edior, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("files", file);
      this.$axios({
        url: "/upload",
        method: "post",
        data: formData
      })
        .then(res => {
          const { data } = res;
          console.log(data);

          let url = this.$axios.defaults.baseURL + data[0].url;
          // 这里是想将我们上传到服务器的图片，放入编辑器当中
          // Edior 是编辑器元素
          // insertEmbed 是个方法
          // cursorLocation 代表光标的位置
          // image是文件名，url是上传图片的地址
          Edior.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSuccess(res) {
      console.log(res[0].url);
      // 这里可以知道如果图片在富文本插入的格式是这样的
      let url = this.$axios.defaults.baseURL + res[0].url;
      this.form.content = this.form.content + `<img src="${url}">`;
      // console.log(this.form.content);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //   发表文章
    post() {
      this.$axios({
        url: "/posts",
        method: "post",
        data: this.form,
        headers: {
          // Bearer属于jwt的token标准
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res);
      });
    },
    // 保存草稿
     save() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const time = `${year}-${month}-${day}`;
      // ES6 对象解构合并
      const draftData = { time, ...this.form };
      // 添加到草稿箱中
      // const data =  [];
      // data.push(draftData);
      this.$store.commit('post/setdraftDataList',draftData);
      
    },
    // 进行编辑草稿
    edit(index){
      this.draftData = {
        title : this.draftDataList[index].title,
        content : this.draftDataList[index].content,
        city : this.draftDataList[index].city
      };      
      this.form = this.draftData;
    }
  },
  mounted() {
    // 挂着完毕后，就把数据取出来
    setTimeout(()=>{
      this.draftDataList = this.$store.state.post.draftDataList;    
    })  
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
      img {
        width: 200px;
        height: 150px;
        object-fit: cover;
      }
    }
    .quillWrapper {
      margin-bottom: 20px;
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
      .main{
        cursor: pointer;
        &:hover{
          color:#ffa500;
          text-decoration: underline;
        }
      }
      .del{
        float: right;
        font-size: 12px;
        background: #409eff;
        color: #fff;
        padding: 4px 10px;
        border-radius: 10px;
        cursor: pointer;
      }
      .time {
        color: #999;
      }
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>