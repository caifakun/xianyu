<template>
  <div>
    <Header />
    <section class="contianer">
      <el-row type="flex" justify="space-between">
        <!-- 顶部过滤列表 -->
        <div class="flights-content">
          <!-- 过滤条件 -->
          <FlightsFilters :data="dataList" @setFlightsList="setFlightsList"/>
          <!-- 航班头部布局 -->
          <FlightsListHead />

          <!-- 航班信息 -->
          <FlightsItem v-for="(item,index) in flightsData" :key="index" :data="item" />
          <!-- 分页 -->
          <el-row type="flex" justify="center" style="margin-top:10px;">
            <!-- size-change：切换条数时候触发 -->
            <!-- current-change：选择页数时候触发 -->
            <!-- current-page: 当前页数 -->
            <!-- page-size：当前条数 -->
            <!-- total：总条数 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="flightsList.total"
            ></el-pagination>
          </el-row>
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
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue"
export default {
  components: {
    Header,
    Footer,
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  data() {
    return {
      //飞机票列表
      flightsList: {
        flights:[], //设置一个空的数组,防止监听flightsList中的数组未请求回来时报错
        info:{}, //设置一个默认值，防止数据传递去子组件未请求回来之前报错
        options:{} //设置一个默认值，防止数据传递去子组件未请求回来之前报错
      }, 
       //缓存数据 用于过滤一次后进行再选择时，出现数据丢失的现象
      dataList: {
        flights:[], //设置一个空的数组,防止监听flightsList中的数组未请求回来时报错
        info:{}, //设置一个默认值，防止数据传递去子组件未请求回来之前报错
        options:{} //设置一个默认值，防止数据传递去子组件未请求回来之前报错
      }, 
      pageIndex:1, //页码数
      pageSize:5 //每页的数据数
    };
  },
  // 封装获取设置飞机分页的数据
  computed:{
    // 监听flightsData的变化
    flightsData(){
      const start = (this.pageIndex -1)*this.pageSize;    
      const end = start + this.pageSize;
      const arr = this.flightsList.flights.slice(start,end);
      return arr 
    } 
  },
  methods: {
    // 封装获取机票列表页的函数
    getFlightsList(){
      this.$axios({
        url: "/airs",
        method: "get",
        params: this.$route.query
      }).then(res => {
        console.log(res.data);
        const {data} = res;
        //获取飞机票列表
        this.flightsList = data; 
        // 赋值给拷贝的新数据, 这份数据一旦赋值之后不能被修改
        this.dataList = {...data}; 
      });
    },
    // 这里是处理 切换获取条数时
    handleSizeChange(value){
      this.pageSize = value;
      this.pageIndex = 1;
    },
    // 这里是处理 切换页码数
    handleCurrentChange(value){
      this.pageIndex = value;
    },
    
    // 过滤航空公司
    setFlightsList(arr){
      this.flightsList.flights = arr;
      // 修改数据的长度
      this.flightsList.total = arr.length;
      // 修改页面值，一旦进行过滤，显示第一页的数据先
      this.pageIndex = 1;
      // console.log(this.flightsList.flights);    
    }
  },
  mounted() {
    // 实例挂载完毕，根据搜索信息筛选出机票列表页
    this.getFlightsList(); 
  }
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