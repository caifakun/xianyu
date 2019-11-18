<template>
  <div>
    <Header />
    <div class="container">
      <div class="aside">
        <!-- tab栏切换 -->
          <ul class="tabs"
          @mouseleave="leave()">
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
      </div>
      <div class="main"></div>
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
    Footer,
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
  .aside {
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
      z-index: 1;
      li {
        color: #ffa500;
        height: 40px;
        line-height: 40px;
        padding-bottom:  15px;
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
</style>