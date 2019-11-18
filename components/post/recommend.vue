<template>
  <div class="content">
    <div class="moreImg" v-if="data.images.length >= 3">
      <h4 class="title-txt">
        <a href="#">{{data.title}}</a>
      </h4>
      <p class="posts">
        <a href="#">{{data.summary | change}}</a>
      </p>
      <a href="#" class="more-img">
        <!-- <img src="/static/images/saiban.jpeg" alt />
        <img src="@/static/images/6@2x.png" alt />
        <img src="@/static/images/eating.jpeg" alt /> -->
        <img :src="data.images[0]" alt />
        <img :src="data.images[1]" alt />
        <img :src="data.images[2]" alt />
      </a>
      <div class="userInfo">
        <div class="left">
          <span>
            <i class="el-icon-location-outline"></i> {{data.cityName}}
          </span>
          <a href="#" class="user">
            by
            <!-- <img src="@/static/images/avatar.jpg" alt /> -->
            <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
            <span class="username">{{data.account.nickname}}</span>
          </a>
          <span>
            <i class="el-icon-view"></i> {{data.watch}}
          </span>
        </div>
        <div class="right">{{data.like || 0}} 赞</div>
      </div>
    </div>
    <div class="oneImg" v-if="data.images.length >= 0 && data.images.length <3">
      <a href="#">
        <img :src="data.images[0]" alt />
      </a>
      <div class="right">
        <h4 class="title-txt">
          <a href="#">{{data.title}}</a>
        </h4>
        <p class="posts">
          <a href="#">{{data.summary | change}}</a>
        </p>
        <div class="userInfo">
          <div class="left">
            <span>
              <i class="el-icon-location-outline"></i> {{data.cityName}}
            </span>
            <a href="#" class="user">
              by
              <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
              <span class="username">{{data.nickname}}</span>
            </a>
            <span>
              <i class="el-icon-view"></i> {{data.watch}}
            </span>
          </div>
          <div class="zan">{{data.like || 0}} 赞</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  filters:{
      change(value){
          return value.replace(/&nbsp;/g,'');
      }
  }
};
</script>

<style lang="less" scoped>
.content {
  .moreImg {
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 10px;
    .title-txt {
      font-size: 18px;
      font-weight: normal;
      margin-bottom: 15px;
      &:hover {
        color: #ffa500;
      }
    }
    .posts {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      height: 63px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
    }
    .more-img {
      display: block;
      height: 150px;
      margin: 15px 0;
      img {
        width: 220px;
        height: 150px;
        object-fit: cover;
      }
    }
    .userInfo {
      display: flex;
      .left {
        display: flex;
        align-items: center;
        flex: 1;
        color: #999;
        font-size: 12px;
        .user {
          display: flex;
          align-items: center;
          margin: 0 10px;

          .username {
            color: #ffa500;
          }
          img {
            width: 16px;
            height: 16px;
            margin: 5px;
          }
        }
      }
      .right {
        color: #ffa500;
      }
    }
  }
  .oneImg {
    padding: 20px 0;
    overflow: hidden;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 10px;
    img {
      float: left;
      width: 220px;
      height: 150px;
      object-fit: cover;
      margin-right: 10px;
    }
    .right {
      float: left;
      width: 470px;
      .title-txt {
        font-size: 18px;
        font-weight: normal;
        margin-bottom: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          color: #ffa500;
        }
      }
      .posts {
        font-size: 14px;
        line-height: 1.5;
        color: #666;
        height: 66px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
      }
      .userInfo {
        display: flex;
        margin-top: 15px;
        .left {
          display: flex;
          align-items: center;
          flex: 1;
          color: #999;
          font-size: 12px;
          .user {
            display: flex;
            align-items: center;
            margin: 0 10px;
            .username {
              color: #ffa500;
            }
            img {
              width: 16px;
              height: 16px;
              margin: 5px;
            }
          }
        }
        .zan {
          color: #ffa500;
        }
      }
    }
  }
}
</style>