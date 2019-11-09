<template>
  <div class="content">
    <!-- 导入头部组件 -->
    <Header />
    <div class="container">
      <!-- 幻灯片 -->
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <div
            class="banner-image"
            :style="`
                background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;
                background-size:contain contain;
                `"
          ></div>
        </el-carousel-item>
      </el-carousel>
      <div class="banner-content">
        <el-row type="flex" class="search-tab">
          <span
            v-for="(item,index) in tabList"
            :key="index"
            class="tab"
            @click="handleClick(index)"
            :class="{active:current === index}"
          >
            <i>{{item.name}}</i>
          </span>
          <i></i>
        </el-row>
        <el-row type="flex" class="searchInform">
          <input type="text" :placeholder="tabList[current].placeholder" class="search" />
          <i class="el-icon-search icon-search" ></i>
        </el-row>
      </div>
    </div>
    <!-- 导入脚部组件 -->
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
      // 轮播图数据
      banners: [],
      // tab栏数据
      tabList: [
        {
          name: "攻略", //tab的名字
          placeholder: "搜索城市" //搜索框提示文字
        },
        {
          name: "酒店",
          placeholder: "搜索你要搜索酒店"
        },
        {
          name: "机票",
        }
      ],
      current: 0
    };
  },
  methods: {
    // 这里是tab栏点击切换
    handleClick(index) {
      // console.log("点击了" + index);
      this.current = index;
      const item = this.tabList[index];
      if(item.name === '机票'){
        this.$router.push({
          path:'/air'
        })
      }
    }
  },
  mounted() {
    // 这里是挂载完毕后，获取轮播图数据
    this.$axios({
      url: "/scenics/banners",
      method: "get"
    }).then(res => {
      console.log(res.data);
      const { data } = res.data;
      this.banners = data;
    });
  }
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
.banner-content {
  position: absolute;
  top: 30%;
  left: 35%;
  width: 600px;
  z-index: 2;
  .search-tab {
    overflow: hidden;
    .tab {
      width: 80px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 18px;
      background: rgba(0, 0, 0, 0.5);
      // border: 1px solid red;
      color: #fff;
      position: relative;
      margin-right: 10px;
      border-radius: 2px;
      border-bottom-left-radius: 0;
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 80px;
        // background: pink;
        width: 0px;
        height: 0px;
        border-bottom: 30px solid rgba(0, 0, 0, 0.5);
        border-left: 12px solid rgba(0, 0, 0, 0.5);
        border-right: 0px solid transparent;
        border-top: 66px solid transparent;
      }
    }
  }
  .search {
    width: 522px;
    height: 47px;
    font-size: 18px;
    text-indent: 1em;
    border-radius: 4px;
    border: none;
    outline: none;
    border-top-left-radius: 0;
  }
}
.searchInform{
  position: relative;
  .icon-search{
    position: absolute;
    top: 15px;
    right: 90px;  
    font-size: 20px;
    font-weight: bold;
  }
}
.active {
  background: #eeeeee !important;
  color:#000 !important;
  &:after {
    border-bottom: 30px solid #eeeeee !important;
    border-left: 12px solid #eeeeee !important;
  }
}
</style>