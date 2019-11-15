<template>
  <div>
    <Header />
    <div class="container">
      <el-row type="flex" justify="space-between">
        <!-- 订单表单 -->
        <div class="main">
            <OrderForm/>
        </div>

        <!-- 侧边栏 -->
        <div class="aside"></div>
      </el-row>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import OrderForm from "@/components/air/orderForm.vue"
export default {
  components: {
    Header,
    Footer,
    OrderForm
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>