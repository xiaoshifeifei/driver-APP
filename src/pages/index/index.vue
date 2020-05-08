<template>
  <view class="index-wrap">
    <!-- 订单信息 -->
    <view
      class="title"
      style="background: url(../../static/image/index/map.png) no-repeat;background-size: 100% 100%;"
    >
      <view class="circle">
        <view class="circle1">
          <view class="name">本月接单</view>
          <view class="num">{{nowMonth}}</view>
          <view class="time">{{time}}</view>
        </view>
      </view>
      <view class="date">
        <view class="old">
          <view>上月接单</view>
          <view class="numb">{{prevMonth}}</view>
        </view>
        <view class="all">
          <view>总单量</view>
          <view class="numb">{{allCount}}</view>
        </view>
      </view>
    </view>
    <!-- 公告轮播 -->
    <view class="grace-bg-white" style="margin: 28upx 0;">
      <graceSpeaker :icon="speakerIconImg" :msgs="speakerMsgs"></graceSpeaker>
    </view>
    <!-- 菜单 -->
    <view class="menu">
      <view class="order">
        <view class="item item1" @tap="goToMenu(0)">
          <view class="orderN">待接单</view>
        </view>
      </view>
      <view class="task">
        <view class="new" @tap="goToMenu(1)">
          <view class="taskN">当前任务</view>
        </view>
        <view class="fin" @tap="goToMenu(2)">
          <view class="taskN">完成任务</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import graceSpeaker from "graceUI/components/graceSpeaker.vue";

import URL from "@/api/serverApi";
import { get, post } from "@/utils/request";

export default {
  components: {
    graceSpeaker
  },
  data() {
    return {
      /**
       * @swiperItems 头部数据
       * @speakerIconImg 公告小喇叭
       * @speakerMsgs 公告内容
       */
      speakerIconImg: "/static/image/index/speaker.png",
      speakerMsgs: [],
      allCount: 0,
      nowMonth: 0,
      prevMonth: 0,
      time: ""
    };
  },
  methods: {
    goToMenu(item) {
      uni.setStorageSync("tasktype", item);

      // if (!item) {
      // 	uni.showToast({
      // 		title: '暂未开通此服务',
      // 		icon: 'none'
      // 	});
      // 	return;
      // }
      uni.switchTab({
        url: `/pages/task/tasklist`
      });
    },
    getCount() {
      post(URL.count, {}).then(res => {
        if (res.data != "" && res.data != undefined) {
          this.allCount = res.data.allCount;
          this.nowMonth = res.data.nowMonth;
          this.prevMonth = res.data.prevMonth;

          let data = res.data.nowDate;
          this.time = data.substring(0, data.lastIndexOf("-"));
        }
      });
    }
  },
  onShow() {
    uni.setStorageSync("tasktype", 0);
    this.getCount();
  }
};
</script>

<style lang="scss">
@import "@/style/index.scss";

page {
  background: #f5f5f5;
}

.index-wrap {
  .title {
    width: 100%;
    height: 500upx;
    // background: #0084FF;
    padding-top: 60upx;
  }

  .circle {
    margin: 0 auto;
    width: 270upx;
    height: 270upx;
    border: #ffffff 4upx solid;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    background: #0084ff;
    text-align: center;

    .circle1 {
      margin: 10upx auto;
      width: 240upx;
      height: 240upx;
      border: #ffffff 4upx dashed;
      background: #0084ff;
      border-radius: 50%;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      text-align: center;
    }

    .name {
      margin-top: 40upx;
      font-size: 28upx;
      color: #ffffff;
    }

    .num {
      font-size: 60upx;
      font-weight: 800;
      color: #ffffff;
    }

    .time {
      color: #ffffff;
    }
  }

  .date {
    display: flex;
    margin-top: 60upx;
    color: #ffffff;
    font-size: 28upx;

    .old {
      width: 50%;
      text-align: center;
    }

    .all {
      width: 50%;
      text-align: center;
    }

    .numb {
      font-size: 36upx;
      font-weight: 600;
    }
  }

  .menu {
    background: #fff;
    display: flex;
    height: 300upx;

    .order {
      width: 49%;
      background: url(../../static/image/index/order.png) no-repeat;
      background-size: 100% 100%;
      margin: 0 1%;
      text-align: center;

      .orderN {
        color: #ffffff;
        font-size: 36upx;
        font-weight: 500;
        align-items: center;
        align-self: center;
        padding-top: 160upx;
      }
    }

    .task {
      margin: 0 1%;
      width: 49%;
      text-align: center;

      .new {
        background: url(../../static/image/index/task1.png) no-repeat;
        background-size: 100% 100%;
        height: 49%;
        margin-bottom: 2%;
      }

      .fin {
        background: url(../../static/image/index/task2.png) no-repeat;
        background-size: 100% 100%;
        height: 49%;
      }

      .taskN {
        color: #ffffff;
        font-size: 36upx;
        align-items: center;
        align-self: center;
        padding: 50upx 0 0 100upx;
      }
    }
  }
}
</style>
