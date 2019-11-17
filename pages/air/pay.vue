<template>
  <div>
    <Header />
    <div class="container">
      <div class="main">
        <div class="pay-title">
          支付总金额
          <span class="pay-price">￥ {{data.price | tofixed}}</span>
        </div>
        <div class="pay-main">
          <h4>微信支付</h4>
          <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
            <div class="qrcode">
              <!-- 二维码 -->
              <canvas id="qrcode-stage"></canvas>
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>
            <div class="pay-example">
              <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
            </div>
          </el-row>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import QRCode from "qrcode";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      data: {},
      //   定时器
      timer: null
    };
  },
  methods: { 
    async checkPay(data) {
        // 这里利用了async await 等待promise返回的res，再进行判断，不然会出现，res一直存着的情况，一直进行轮询
      const res = await this.$axios({
        url: "/airorders/checkpay",
        method: "post",
        data: {
          id: data.id, //订单id
          nonce_str: data.price, // 支付接口返回的订单金额
          out_trade_no: data.orderNo //订单编号
        },
        headers: {
          // Bearer属于jwt的token标准
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      });
      const { statusTxt } = res.data;
      if (statusTxt == "支付完成") {
        // 支付成功进行提示
        this.$confirm("订单支付成功", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "success"
        });
        // 支付成功，需要把定时器清楚掉。
        clearInterval(this.timer);
        // 重新把定时器赋值为空
        this.timer = null;
        return;
      }
    }
  },
  mounted() {
    const { id } = this.$route.query;
    this.$axios({
      url: "/airorders/" + id,
      method: "get",
      //   params: {
      //     id
      //   },
      headers: {
        // Bearer属于jwt的token标准
        Authorization: "Bearer " + this.$store.state.user.userInfo.token
      }
    }).then(res => {
      //   console.log(res.data);
      this.data = res.data;
      // 生成二维码
      const canvas = document.querySelector("#qrcode-stage");
      // 第一个参数为 canvas dom元素
      // 第二个是生成二维码的链接
      QRCode.toCanvas(canvas, this.data.payInfo.code_url, {
        width: 200
      });
      //   设置一个定时器进行轮询，看看订单是否支付成功
      this.timer = setInterval(() => {
        this.checkPay(this.data);
      }, 3000);
    });
  },
  filters: {
    tofixed(value) {
      return Number(value || 0).toFixed(2);
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>