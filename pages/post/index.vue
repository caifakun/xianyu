<template>
  <div>
    <Header />
    <div class="container">
      <div class="aside">
        <!-- tab栏切换 -->
        <ul class="tabs" @mouseleave="leave()">
          <li
            class="tabs-item"
            v-for="(item,index) in cities"
            :key="index"
            :class="{right: current == index}"
            @mouseover="over(index)"
          >
            {{item.type}}
            <span class="el-icon-arrow-right color"></span>
            <div class="item-content" :class="{show:current == index}" v-if="isShow">
              <ul>
                <li v-for="(element,index) in item.children" :key="index">
                  <i>{{index+1}}</i>
                  <span class="city">{{element.city}}</span>
                  <span class="city-description">{{element.desc}}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <!-- 推荐城市 -->
        <div class="suggestion">
          <h4>推荐城市</h4>
          <img src="@/static/images/pic_sea.jpeg" alt class="suggestion-img" />
        </div>
      </div>
      <div class="main">
        <!-- 搜索框 -->
        <div class="search-city">
          <div class="search">
            <input type="text" class="searchInput" placeholder="请输入想去的地方，比如：'广州'" />
            <span class="el-icon-search"></span>
          </div>
          <div class="keyword">
            推荐：
            <span>广州</span>
            <span>上海</span>
            <span>北京</span>
          </div>
        </div>
        <!-- 推荐攻略 -->
        <div class="recommend">
          <div class="title">
            <h4>推荐攻略</h4>
            <div class="writing">
              <span class="el-icon-edit"></span>写游记
            </div>
          </div>
          <div class="content">
            <div class="moreImg">
              <h4 class="title-txt">
                <a href="#">赛班贵？一定是你的打开方式不对！6000块玩转赛班</a>
              </h4>
              <p class="posts">
                <a
                  href="#"
                >大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最</a>
              </p>
              <a href="#" class="more-img">
                <img src="@/static/images/saiban.jpeg" alt />
                <img src="@/static/images/6@2x.png" alt />
                <img src="@/static/images/eating.jpeg" alt />
              </a>
              <div class="userInfo">
                <div class="left">
                  <span>
                    <i class="el-icon-location-outline"></i> 北京市
                  </span>
                  <a href="#" class="user">
                    by
                    <img src="@/static/images/avatar.jpg" alt />
                    <span class="username">地球发动机</span>
                  </a>
                  <span>
                    <i class="el-icon-view"></i> 10077
                  </span>
                </div>
                <div class="right">66赞</div>
              </div>
            </div>
            <div class="oneImg">
              <a href="#"><img src="@/static/images/sky.jpeg" alt /></a>
              <div class="right">
                <h4 class="title-txt"><a href="#">远东行：用好奇心打量这座城 —— 最值得收藏的海参崴出行攻略</a> </h4>
                <p class="posts">
                  <a
                    href="#"
                  >想象一下一个距离 北京 只有2.5小时飞行距离的城市：身处 亚洲 却能感受到十足的欧陆风情——欧式建筑和街道，金发碧眼的路人，正宗的西餐外加只有国内一半售价的帝王蟹可以敞开吃——更难能可贵的是，这里对国人（实质）免签，有直飞航班，低廉的物价，且尚未有太多的游客涉足还保留着原汁原味的传统风情！</a>
                </p>
                <div class="userInfo">
                  <div class="left">
                    <span>
                      <i class="el-icon-location-outline"></i> 北京市
                    </span>
                    <a href="#" class="user">
                      by
                      <img src="@/static/images/avatar.jpg" alt />
                      <span class="username">地球发动机</span>
                    </a>
                    <span>
                      <i class="el-icon-view"></i> 10077
                    </span>
                  </div>
                  <div class="zan">66赞</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      cities: [], //用于渲染tabs栏数据
      current: null, // 用于切换tabs数据
      isShow: false //用于
    };
  },
  methods: {
    // 鼠标移入事件
    over(index) {
      this.current = index;
      this.isShow = true;
    },
    // 鼠标移出事件
    leave() {
      this.isShow = false;
      this.current = null;
    }
  },
  mounted() {
    // 实例挂载完毕后，进行请求城市菜单数据
    this.$axios({
      url: "/posts/cities",
      method: "get"
    }).then(res => {
      console.log(res.data);
      const { data } = res.data;
      this.cities = data;
    });
  }
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
  // tab栏
  .aside {
    float: left;
    width: 260px;
    .tabs {
      position: relative;
      .tabs-item {
        border: 1px solid #ddd;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border-bottom: 0;
        &:hover,
        &:hover .color {
          color: #ffa500;
        }
        &:last-child {
          border-bottom: 1px solid #ddd;
        }
        .el-icon-arrow-right {
          float: right;
          line-height: 40px;
          font-size: 20px;
          color: #ddd;
        }
      }
    }
    .item-content {
      display: none;
      width: 350px;
      background: #fff;
      border: 1px solid #ddd;
      position: absolute;
      top: 0px;
      right: -350px;
      z-index: 2;
      li {
        color: #ffa500;
        height: 40px;
        line-height: 40px;
        padding-bottom: 15px;
        i {
          padding-left: 20px;
          font-style: italic;
          font-size: 20px;
        }
        .city {
          margin: 0 20px;
        }
        .city-description {
          color: #999;
        }
      }
    }
  }
}
.show {
  display: block !important;
  border-left: 0 !important;
  li {
    &:last-child {
      border-left: 1px solid #ddd !important;
    }
  }
}
.right {
  border-right: 0 !important;
}
// tab栏下面
.suggestion {
  float: left;
  margin-top: 30px;
  width: 260px;
  h4 {
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .suggestion-img {
    width: 260px;
  }
}

.main {
  width: 700px;
  float: left;
  margin-left: 40px;
  .search-city {
    margin-bottom: 20px;
    .search {
      position: relative;
      .searchInput {
        width: 700px;
        height: 40px;
        outline: none;
        padding: 0 20px;
        border: 3px solid #ffa500;
      }
      .el-icon-search {
        position: absolute;
        top: 8px;
        right: 15px;
        color: #ffa500;
        font-size: 24px;
        font-weight: bolder;
      }
    }
    .keyword {
      margin-top: 10px;
      font-size: 12px;
      color: #666;
    }
  }
  // 推荐攻略
  .recommend {
    .title {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #f2f2f2;
      &::after {
        display: block;
        content: "";
        width: 72px;
        border: 1px solid #ffa500;
        position: absolute;
        left: 0;
        bottom: 0;
      }
      h4 {
        flex: 1;
        font-size: 18px;
        font-weight: normal;
        color: #ffa500;
      }
      .writing {
        height: 40px;
        padding: 12px 20px;
        background: #409eff;
        font-size: 14px;
        color: #fff;
        border-radius: 4px;
        .el-icon-edit {
          padding-right: 10px;
        }
      }
    }
  }
  .content {
    .moreImg {
      padding: 20px 0;
      border-bottom: 1px solid #eeeeee;
      .title-txt {
        font-size: 18px;
        font-weight: normal;
        margin-bottom: 15px;
        &:hover{
          color: #ffa500;
        }
      }
      .posts {
        font-size: 14px;
        color: #666;
        line-height: 1.5;
      }
      .more-img {
        display: block;
        height: 150px;
        margin: 15px 0;
        img {
          width: 220px;
          height: 150px;
          object-fit: cover;
        }
      }
      .userInfo {
        display: flex;
        .left {
          display: flex;
          align-items: center;
          flex: 1;
          color: #999;
          font-size: 12px;
          .user {
            display: flex;
            align-items: center;
            margin: 0 10px;

            .username {
              color: #ffa500;
            }
            img {
              width: 16px;
              height: 16px;
              margin: 5px;
            }
          }
        }
        .right {
          color: #ffa500;
        }
      }
    }
    .oneImg {
      padding: 20px 0;
      overflow: hidden;
      border-bottom: 1px solid #eeeeee;
      img {
        float: left;
        width: 220px;
        height: 150px;
        object-fit: cover;
        margin-right: 10px;
      }
      .right {
        float: left;
        width: 470px;
        .title-txt {
          font-size: 18px;
          font-weight: normal;
          margin-bottom: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover{
          color: #ffa500;
          }
        }
        .posts {
          font-size: 14px;
          line-height: 1.5;
          color: #666;
          height: 66px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
        }
        .userInfo {
          display: flex;
          margin-top: 15px;
          .left {
            display: flex;
            align-items: center;
            flex: 1;
            color: #999;
            font-size: 12px;
            .user {
              display: flex;
              align-items: center;
              margin: 0 10px;
              .username {
                color: #ffa500;
              }
              img {
                width: 16px;
                height: 16px;
                margin: 5px;
              }
            }
          }
          .zan {
            color: #ffa500;
          }
        }
      }
    }
  }
}
</style>