<template>
  <div class="content">
    <div class="moreImg">
      <h4 class="title-txt">
        <a href="#">赛班贵？一定是你的打开方式不对！6000块玩转赛班</a>
      </h4>
      <p class="posts">
        <a
          href="#"
        >大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最</a>
      </p>
      <a href="#" class="more-img">
        <img src="@/static/images/saiban.jpeg" alt />
        <img src="@/static/images/6@2x.png" alt />
        <img src="@/static/images/eating.jpeg" alt />
      </a>
      <div class="userInfo">
        <div class="left">
          <span>
            <i class="el-icon-location-outline"></i> 北京市
          </span>
          <a href="#" class="user">
            by
            <img src="@/static/images/avatar.jpg" alt />
            <span class="username">地球发动机</span>
          </a>
          <span>
            <i class="el-icon-view"></i> 10077
          </span>
        </div>
        <div class="right">66赞</div>
      </div>
    </div>
    <div class="oneImg">
      <a href="#">
        <img src="@/static/images/sky.jpeg" alt />
      </a>
      <div class="right">
        <h4 class="title-txt">
          <a href="#">远东行：用好奇心打量这座城 —— 最值得收藏的海参崴出行攻略</a>
        </h4>
        <p class="posts">
          <a
            href="#"
          >想象一下一个距离 北京 只有2.5小时飞行距离的城市：身处 亚洲 却能感受到十足的欧陆风情——欧式建筑和街道，金发碧眼的路人，正宗的西餐外加只有国内一半售价的帝王蟹可以敞开吃——更难能可贵的是，这里对国人（实质）免签，有直飞航班，低廉的物价，且尚未有太多的游客涉足还保留着原汁原味的传统风情！</a>
        </p>
        <div class="userInfo">
          <div class="left">
            <span>
              <i class="el-icon-location-outline"></i> 北京市
            </span>
            <a href="#" class="user">
              by
              <img src="@/static/images/avatar.jpg" alt />
              <span class="username">地球发动机</span>
            </a>
            <span>
              <i class="el-icon-view"></i> 10077
            </span>
          </div>
          <div class="zan">66赞</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.content {
  .moreImg {
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
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