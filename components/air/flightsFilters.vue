<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in  data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option
            v-for="(item,index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <!-- 这里 只是单纯为了监听filter的变化,不需要变化-->
    <span v-show="false">{{filter}}</span>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      //由返回的数据可知道，飞机分为大中小。型号可以分为 L M S
      airSizeList: [
        { label: "大", type: "L" },
        { label: "中", type: "M" },
        { label: "小", type: "S" }
      ]
    };
  },
  computed: {
    // 监听过滤选项的变化
    filter() {
      // 进行多选过滤，符合就返回
      const arr = this.data.flights.filter(v => {
        //  先假设所有数据都符合
        let valid = true;
        // const [start,end] 从数组中解构出来， 拿到里面的值
        const [start, end] = this.flightTimes.split(",");
        // 把出发时间进行切割
        const depTime = v.dep_time.split(":")[0];
        // 找出不符合条件的 进行过滤
        if (
          this.airport && this.airport != v.org_airport_name ||
          this.company && this.company != v.airline_name ||
          this.airSize && this.airSize != v.plane_size ||
          this.flightTimes && (start >= depTime && depTime > end)
        ) {
          valid = false;
        }
        return valid;
      });
      // 然后通过自定义事件把返回来的数据 传到父组件去渲染
      this.$emit("setFlightsList", arr);
    }
  },
  methods: {
    // // 选择机场时候触发
    // handleAirport(value) {
    //   // 判断选择的 机场的名字 是否相等
    //   // 如果是就把符合的返回
    //   const arr = this.data.flights.filter(v => {
    //     return v.org_airport_name == value;
    //   });
    //   // 然后通过自定义事件把返回来的数据 传到父组件去渲染
    //   this.$emit("setFlightsList", arr);
    // },

    // // 选择出发时间时候触发
    // handleFlightTimes(value) {
    //   // 判断选择的 飞行的时间 是否相等
    //   // 如果是就把符合的返回

    //   // value.split(',') 把字符串切割成数组
    //   // const [start,end] 从数组中解构出来， 拿到里面的值
    //   const [start,end] = value.split(',')
    //   const arr = this.data.flights.filter(v => {
    //     // 把出发时间进行切割
    //     const depTime = v.dep_time.split(':')[0];
    //     return start<= depTime && depTime < end
    //   });
    //   // 然后通过自定义事件把返回来的数据 传到父组件去渲染
    //   this.$emit("setFlightsList", arr);
    // },

    // // 选择航空公司时候触发
    // handleCompany(value) {
    //   // 判断选择的 航空公司的名字 是否相等
    //   // 如果是就把符合的返回
    //   const arr = this.data.flights.filter(v => {
    //     return v.airline_name == value;
    //   });
    //   // 然后通过自定义事件把返回来的数据 传到父组件去渲染
    //   this.$emit("setFlightsList", arr);
    // },

    // // 选择机型时候触发
    // handleAirSize(value) {
    //   // 判断选择的 机型的大小 是否相等
    //   // 如果是就把符合的返回
    //   const arr = this.data.flights.filter(v => {
    //     return v.plane_size == value;
    //   });
    //   // 然后通过自定义事件把返回来的数据 传到父组件去渲染
    //   this.$emit("setFlightsList", arr);
    // },
    // 撤销条件时候触发
    handleFiltersCancel() {
      (this.airport = ""), // 机场
        (this.flightTimes = ""), // 出发时间
        (this.company = ""), // 航空公司
        (this.airSize = ""); // 机型大小
      this.$emit("setFlightsList", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>