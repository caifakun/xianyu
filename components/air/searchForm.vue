<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
          @blur="handleDepartBlur(form.departCity)"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
          @blur="handleDestBlur(form.destCity)"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import Moment from "moment";
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 到达城市
        destCode: "", // 到达城市代码
        departDate: "" // 日期字符串
      },
      departCities: [], //用于存储搜索返回的出发城市
      destCities: [], //用于存储搜索返回的到达城市
      pickerOptions:{  
        disabledDate(time) {  // 禁用日期
          return time.getTime() < Date.now() - 3600*1000*24;
        }
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(index) {
      if (index === 1) {
        this.$alert("目前暂不支持往返", "提示", {
          type: "warning"
        });
      }
    },

    // 封装一个搜索返回城市列表的函数
    getCities(value, cb, city) {
      // 出发城市输入框的输入事件，根据输入的关键字请求接口返回相关城市。
      // value: 是输入框的值
      // cb：是回调函数，调用函数时候必须要传入一个数组
      // cb参数的数组的元素必须是一个对象，对面里面必须包含value值

      // 判断如果为值为空的时候，不发送请求数据
      if (!value.trim()) {
        return cb([]);
      }
      // 获取拥有机票的城市
      this.$axios({
        url: "/airs/city",
        method: "get",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res.data);
        const { data } = res.data;
        // 利用数组.map方法进行去重，会返回一个新数组
        const newData = data.map(element => {
          // 取出里面每项的name重新赋值给value
          element.value = element.name.replace("市", "");
          return element;
        });
        this.city = newData;
        cb(this.city);
        // console.log(this.city);
      });
    },
    // 出发城市输入框获得焦点时触发
    queryDepartSearch(value, cb) {
      this.getCities(value, cb, this.departCities);
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      // cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
      this.getCities(value, cb, this.destCities);
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },
    // 处理 出发城市 失去焦点时无法选中下拉框的值
    handleDepartBlur(departCity) {
      this.$axios({
        url: "/airs/city",
        method: "get",
        params: {
          name: departCity
        }
      }).then(res => {
        // console.log(res.data);
        const { data } = res.data;
        const newData = data.map(element => {
          // 取出里面每项的name重新赋值给value
          element.value = element.name.replace("市", "");
          return element;
        });
        this.departCities = newData;
        this.form.departCity = this.departCities[0].value;
        this.form.departCode = this.departCities[0].sort;
      });
    },
    handleDestBlur(destCity) {
      this.$axios({
        url: "/airs/city",
        method: "get",
        params: {
          name: destCity
        }
      }).then(res => {
        // console.log(res.data);
        const { data } = res.data;
        const newData = data.map(element => {
          // 取出里面每项的name重新赋值给value
          element.value = element.name.replace("市", "");
          return element;
        });
        this.destCities = newData;
        this.form.destCity = this.destCities[0].value;
        this.form.destCode = this.destCities[0].sort;
      });
    },
    // 确认选择日期时触发
    handleDate(value) {
      // moment是一个方法，可以传递时间Date对象。如果不传递参数就会获取当前的时间
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit() {
      console.log(this.form);
      // 跳转机票列表页之前先验证表单
      const rules = [
        { value: this.form.departCity, message: "请输入出发城市" },
        { value: this.form.destCity, message: "请输入到达城市" },
        { value: this.form.departDate, message: "请选择出发日期" }
      ];
      // 定义一个节流阀 用于控制表单的提示
      let valid = true;
      // 遍历验证规则数组里面的每个需要验证的信息
      rules.forEach(e => {
        // 只要有一个条件不满足，就终止循环
        if (!valid) return;
        // 如果有一个值为空
        if (!e.value) {
          // 提示错误
          this.$alert(e.message, "提示");
          valid = false;
        }
        // 只要有一个条件不满足，禁止跳转
        if (!valid) return;
        // 满足条件后进行跳转机票列表
        this.$router.push({
          path: "/air/flights",
          query: this.form
        });
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
