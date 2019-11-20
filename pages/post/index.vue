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
                <a href="javascrit:;">
                  <li v-for="(element,index) in item.children" :key="index" @click="search(element.city)">
                    <i>{{index+1}}</i>
                    <a href="javascrit:;" class="citystyle">
                      <span>{{element.city}}</span>
                    </a>
                    <a href="javascrit:;" class="desc">
                      <span>{{element.desc}}</span>
                    </a>
                  </li>
                </a>
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
            <input
              type="text"
              class="searchInput"
              placeholder="请输入想去的地方，比如：'广州'"
              v-model="inputForm"
            />
            <span class="el-icon-search" @click="search(inputForm)"></span>
          </div>
          <div class="keyword">
            推荐：
            <span
              class="city"
              @click="changeInput(item)"
              v-for="(item,index) in ['广州','上海','北京']"
              :key="index"
            >{{item}}</span>
          </div>
        </div>
        <!-- 推荐攻略 -->
        <div class="recommend">
          <div class="title">
            <h4>推荐攻略</h4>
            <div class="writing" @click="$router.push('/post/create')">
              <span class="el-icon-edit"></span>写游记
            </div>
          </div>
          <!-- 引入推荐攻略组件 -->
          <Recommend v-for="(item,index) in postList" :key="index" :data="item" />
        </div>
        <!-- 引入分页模块 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 5, 8, 10]"
            :page-size="3"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import Recommend from "@/components/post/recommend.vue";
export default {
  components: {
    Header,
    Footer,
    Recommend
  },
  data() {
    return {
      cities: [], //用于渲染tabs栏数据
      postList: [], //用于存储文章列表信息进行渲染
      total: 0, //用设置分页总数
      current: null, // 用于切换tabs数据
      isShow: false, //用于
      inputForm: "", // 用于绑定输出搜索框
      cityId: null,

      // 用于分页
      currentPage: 1,
      page: {
        _start: 0, //数据从那条开始
        _limit: 3 //获取的条数
      }
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
    },
    // 进行搜索
    search(city) {
      this.$axios({
        url: "/posts",
        method: "get",
        params: {
          city
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.postList = data;
      });
    },
    // 使用推荐城市进行搜索
    changeInput(item) {
      this.inputForm = item;
    },
    getRecommend() {
      // 推荐攻略
      this.$axios({
        url: "/posts",
        // url: "/",
        method: "get",
        params: this.page
      }).then(res => {
        console.log(res.data);
        this.total = res.data.total;
        const { data } = res.data;
        this.postList = data;
      });
    },
    // 改变获取条数
    handleSizeChange(val) {
      this.page._limit = val;
      this.getRecommend();
      // console.log(`每页 ${val} 条`);
    },
    // 改变页码
    handleCurrentChange(val) {
      let start = 0;
      start += (val - 1) * this.page._limit; //1 3   2 6  3 9
      this.page._start = start;
      this.getRecommend();
      // console.log(`当前页: ${val}`);
    }
  },
  mounted() {
    // 实例挂载完毕后，进行请求城市菜单数据
    this.$axios({
      url: "/posts/cities",
      method: "get"
    }).then(res => {
      // console.log(res.data);
      const { data } = res.data;
      this.cities = data;
    });
    this.getRecommend();
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
        .citystyle {
          margin: 0 20px;
          &:hover {
            text-decoration: underline;
          }
        }
        .desc {
          color: #999;
          &:hover {
            text-decoration: underline;
          }
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
      .city {
        margin-right: 10px;
        cursor: pointer;
        &:hover{
          color: #ffa500;
          text-decoration: underline;
        }
      }
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
        cursor: pointer;
        .el-icon-edit {
          padding-right: 10px;
        }
      }
    }
  }
}
.block {
  // width: 700px;
  margin-bottom: 20px;
}
</style>