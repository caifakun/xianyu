<template>
  <div>
    <Header />
    <div class="container">
      <div class="left">
        <div class="breadcrumb">
          旅游攻略
          <i>/</i>
          <span>攻略详情</span>
        </div>
        <h1>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h1>
        <div class="post-info">
          <div class="info">
            攻略：
            <span>2019-05-22</span>
            <span class="time">10:57</span>
            <span class="read">阅读：10438</span>
          </div>
        </div>
        <!-- 这里是文章详细内容 -->
        <div class="content">
          <p
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
          </div>
        </div>
        <!-- 这里是评论、收藏、分享、赞模块 -->
        <div class="post-ctrl">
          <div class="comments">
            <span class="el-icon-edit-outline"></span>
            <p>评论（100）</p>
          </div>
          <div class="collection">
            <span class="el-icon-star-off"></span>
            <p>收藏</p>
          </div>
          <div class="share">
            <span class="el-icon-share"></span>
            <p>分享</p>
          </div>
          <div class="dianzan">
            <span class="el-icon-present"></span>
            <p>点赞（19）</p>
          </div>
        </div>
        <!-- 这里引入评论组件 -->
        <Comments />
      </div>
      <div class="right">
        <h4>相关攻略</h4>
        <div class="strategy-item">
          <a href="javascript:;">
            <img src="@/static/images/aoteman1.jpg" alt />
            <div class="item-right">
              <div class="content">1121323</div>
              <div class="bottom">
                <span class="time">2019-11-19 8:00</span>
                <span>阅读 4</span>
              </div>
            </div>
          </a>
        </div>

        <div class="strategy-item">
          <a href="javascript:;">
            <img src="@/static/images/aoteman1.jpg" alt />
            <div class="item-right">
              <div class="content">1121323</div>
              <div class="bottom">
                <span class="time">2019-11-19 8:00</span>
                <span>阅读 4</span>
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
export default {
  components: {
    Header,
    Footer,
    Comments
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
        margin: 0 20px 0 10px;
      }
    }
  }
  .introduce {
    line-height: 1.5;
  }
  .picture {
    margin: 10px 0;
    img {
      width: 700px;
    }
    span {
      color: #999;
    }
  }
  .play {
    margin-bottom: 30px;
    .play-introduce {
      line-height: 1.5;
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
</style>