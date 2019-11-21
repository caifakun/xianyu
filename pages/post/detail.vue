<template>
  <div>
    <Header />
    <div class="container">
      <div class="left" v-for="(item,index) in postsDetail" :key="index">
        <div class="breadcrumb">
          旅游攻略
          <i>/</i>
          <span>攻略详情</span>
        </div>
        <h1>{{item.title}}</h1>
        <div class="post-info">
          <div class="info">
            攻略：
            <span class="time">{{item.createdTime}}</span>
            <span class="read">阅读：{{item.watch || 0}}</span>
          </div>
        </div>
        <!-- 这里是文章详细内容 -->
        <div class="content" v-html="item.content">
          <!-- <p
            class="introduce"
          >大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。</p>
          <div class="picture">
            <img src="@/static/images/saiban.jpeg" alt />
            <span>图：塞班岛。</span>
            <span>by第五季旅游</span>
          </div>
          <div class="play">
            <h2>一、怎样用6000块玩转塞班？</h2>
            <p
              class="play-introduce"
            >大多数出境游客人不做预算或最终花费远远超出预算，对预算的合理分配对控制我们旅行的花费就很重要了，如何只花6000块玩转塞班岛，对预算超支say no？下面从5个方面来为您一一解读：机票+酒店、岛上交通、玩乐项目、吃以及购买纪念品。</p>
          </div>
          <div class="methods">
            <h3>1.怎样订机票+酒店性价比最高？</h3>
            <p class="how-to-do"></p>
          </div>-->
        </div>
        <!-- 这里是评论、收藏、分享、赞模块 -->
        <div class="post-ctrl">
          <div class="comments">
            <span class="el-icon-edit-outline"></span>
            <p>评论（{{item.comments.length || 0 }}）</p>
          </div>
          <div class="collection" @click="collection">
            <span class="el-icon-star-off"></span>
            <p>收藏</p>
          </div>
          <div class="share">
            <span class="el-icon-share"></span>
            <p>分享</p>
          </div>
          <div class="dianzan" @click="dianzan(item.id)" :class="{yellow:isDianZan == item.id}">
            <span class="el-icon-present"></span>
            <p>点赞（{{item.like || 0}}）</p>
          </div>
        </div>
        <!-- 这里引入评论组件 -->
        <Comments />
      </div>
      <div class="right">
        <h4>相关攻略</h4>
        <div class="strategy-item" v-for="(item,index) in strategies" :key="index">
          <a :href="`http://localhost:3000/post/detail?id=${item.id}`">
            <img :src="item.images[0]" v-if="item.images[0]" alt />
            <img src="@/static/images/aoteman1.jpg" v-else alt />
            <div class="item-right">
              <div class="content">{{item.title}}</div>
              <div class="bottom">
                <span class="time">{{item.createdTime}}</span>
                <span>阅读 {{item.watch || 0}}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import Comments from "@/components/post/comments.vue";
// 引入moment插件
import moment from "moment";
export default {
  components: {
    Header,
    Footer,
    Comments
  },
  data() {
    return {
      postsDetail: [], //文章详情
      strategies: [], //相关攻略
      isDianZan: null
    };
  },
  methods: {
    dianzan(id) {
      this.$axios({
        url: "/posts/like",
        method: "get",
        params: {
          id
        },
        headers: {
          // Bearer属于jwt的token标准
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        // console.log(res);
        const { message } = res.data;
        if (message == "点赞成功") {
          this.$message.success(message);
          this.postsDetail[0].like += 1;
          this.isDianZan = id;
        }
      });
    },
   
  },
  mounted() {
    // 获取文章详情
    const id = this.$route.query.id;
    this.$axios({
      url: "/posts",
      method: "get",
      params: {
        id
      }
    }).then(res => {
      console.log(res.data);
      const { data } = res.data;
      data.forEach(e => {
        var time = moment(e.created_at).format("YYYY-MM-DD HH:mm");
        e.createdTime = time;
        e.comments.forEach(item => {
          item.createdTime = time;
        });
      });
      this.postsDetail = data;
    });
    // 相关攻略
    this.$axios({
      url: "/posts/recommend",
      method: "get"
      // data:{},
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      data.forEach(e => {
        let time = moment(e.created_at).format("YYYY-MM-DD HH:mm");
        e.createdTime = time;
      });
      this.strategies = data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  overflow: hidden;
}
.left {
  float: left;
  width: 700px;
  .breadcrumb {
    font-size: 14px;
    font-weight: bold;
    i {
      font-weight: bolder;
      color: #c0c4cc;
    }
    span {
      font-weight: normal;
      color: #606266;
    }
  }
  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #dddddd;
  }
  .post-info {
    padding: 20px;
    overflow: hidden;
    .info {
      float: right;
      color: #999;
      .time {
        margin-right: 20px;
      }
    }
  }
  .content {
    width: 700px;
    /deep/p {
      line-height: 1.5;
      /deep/img {
        width: 700px !important;
        height: 340px;
        object-fit: cover;
        margin: 10px 0;
        // background-size: cover;
      }
    }
    /deep/span {
      /deep/img {
        width: 700px !important;
        height: 340px;
        object-fit: cover;
        margin: 10px 0;
      }
    }
  }

  .post-ctrl {
    padding: 50px 0 30px;
    display: flex;
    width: 400px;
    margin: 0 auto;
    justify-content: space-around;
    align-items: center;

    .comments,
    .share,
    .collection,
    .dianzan {
      flex: 0 0 25%;
      text-align: center;
      span {
        font-size: 35px;
        // color: #ffa500;
        margin-bottom: 5px;
        cursor: pointer;
      }
      p {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
.right {
  float: right;
  width: 280px;
  h4 {
    font-size: 18px;
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px solid #dddddd;
  }
  .strategy-item {
    padding: 20px 0;
    border-bottom: 1px solid #dddddd;
    a {
      display: flex;
      align-items: center;
      img {
        width: 100px;
        height: 80px;
        object-fit: cover;
      }
      .item-right {
        flex: 1;
        margin-left: 8px;
        .content {
          height: 45px;
          margin-bottom: 20px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
        }
        .bottom {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
.yellow {
  color: #ffa500;
}
</style>