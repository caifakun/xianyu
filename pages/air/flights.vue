<template>
  <div>
    <Header />
    <section class="contianer">
      <el-row type="flex" justify="space-between">
        <!-- 顶部过滤列表 -->
        <div class="flights-content">
          <!-- 过滤条件 -->
          <div></div>

          <!-- 航班头部布局 -->
          <FlightsListHead />

          <!-- 航班信息 -->
          <FlightsItem v-for="(item,index) in flightsList.flights" :key="index" :data="item"/>
        </div>

        <!-- 侧边栏 -->
        <div class="aside">
          <!-- 侧边栏组件 -->
        </div>
      </el-row>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import FlightsListHead from '@/components/air/flightsListHead.vue';
import FlightsItem from '@/components/air/flightsItem.vue';
export default {
  components: {
    Header,
    Footer,
    FlightsListHead,
    FlightsItem
  },
  data() {
    return {
      flightsList:{}
    }
  },
  mounted() {
    // 实例挂载完毕，根据搜索信息筛选出机票列表页
    this.$axios({
    url:'/airs',
    method:'get',
    params:this.$route.query
    }).then(res=>{
    console.log(res.data);   
    this.flightsList = res.data  
    })
  },
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>