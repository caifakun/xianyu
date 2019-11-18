<template>
  <div>
    <Header />
    <div class="container">
      <div class="aside">
        <ul class="tabs">
          <li class="tabs-item">
            热门城市
            <span class="el-icon-arrow-right"></span>
            <div class="item-content">
              <ul>
                <li>
                  <i>1</i>
                  <span class="city">北京</span>
                  <span class="city-description">213213123</span>
                </li>
              </ul>
            </div>
          </li>
          <li class="tabs-item">
            推荐城市
            <span class="el-icon-arrow-right"></span>
          </li>
          <li class="tabs-item">
            奔向海岛
            <span class="el-icon-arrow-right"></span>
          </li>
          <li class="tabs-item">
            主题推荐
            <span class="el-icon-arrow-right"></span>
          </li>
        </ul>asdad
      </div>

      <div class="main"></div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import TabsItem from "@/components/post/tabs-item.vue";
export default {
  components: {
    Header,
    Footer,
    TabsItem
  },
  data() {
    return {};
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
    // height: 160px;
    // background: pink;
    .tabs {
      border: 1px solid #ddd;
      position: relative;
      .tabs-item {
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border-bottom: 1px solid #ddd;
        &:hover{
          color: #ffa500;
        }
        &:last-child {
          border-bottom: 0;
        }
        .el-icon-arrow-right {
          float: right;
          line-height: 40px;
          font-size: 20px;
        }
      }
    }
    .item-content {
      width: 350px;
      height: 180px;
      border: 1px solid #ddd;
      position: absolute;
      top: -1px;
      right: -350px;
      li {
        color: #ffa500;
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
</style>