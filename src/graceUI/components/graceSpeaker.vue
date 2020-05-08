<template name="graceSpeaker">
  <view class="grace-swiper-msg">
    <view class="grace-swiper-msg-icon">
      <image :src="icon" style="width: 42upx; height: 42upx"></image>
    </view>
    <swiper :vertical="vertical" autoplay="true" circular="true" :interval="interval">
      <swiper-item v-for="(item, index) in msgs" :key="index">
        <navigator :url="item.url" hover-class="none">{{item.article_title}}</navigator>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
export default {
  name: "graceSpeaker",
  props: {
    msgs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    icon: {
      type: String,
      default: ""
    },
    interval: {
      type: Number,
      default: 3000
    },
    vertical: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: ""
    }
  }
};
</script>
<style>
.grace-swiper-msg {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.grace-swiper-msg-icon {
  width: 42upx;
  margin: 28upx 32upx;
  flex-shrink: 0;
  overflow: hidden;
}
.grace-swiper-msg-icon image {
  width: 42upx;
}
.grace-swiper-msg swiper {
  width: 100%;
  height: 30px;
}
.grace-swiper-msg swiper-item {
  line-height: 30px;
}
.grace-swiper-msg navigator {
  line-height: 30px;
}
</style>