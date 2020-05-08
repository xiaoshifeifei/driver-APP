<template>
  <view v-if="show">
    <view class="uni-mask" v-show="show" :style="{ top: offsetTop + 'px' }"  @click="hide"></view>

    <view
      :style="{ padding: padding, width: width, height: height, backgroundColor: bgColor }"
      :class="['uni-popup', 'uni-popup-' + type, show ? 'move' : 'hide']"
    >
      {{ msg }}
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      //top - 顶部， middle - 居中, bottom - 底部
      default: "middle"
    },
    padding: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: "#eee"
    },
    msg: {
      type: String,
      default: ""
    }
  },
  data() {
    let offsetTop = 0;
    //#ifdef H5
    offsetTop = 0;
    //#endif
    return {
      offsetTop: offsetTop
    };
  },
  methods: {
    hide: function() {
      this.$emit("hidePopup");
    }
  }
};
</script>
<style>
.move {
  display: block !important;
  transition: all 0.3s;
}

.hide {
  display: none !important;
  transform: translateY(300upx);
}

.uni-mask {
  position: fixed;
  z-index: 998;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 5s linear;
}

.uni-popup {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  padding: 20upx;
  box-shadow: 0 0 30upx rgba(0, 0, 0, 0.1);
}

.uni-popup-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 350upx;
  border-radius: 10upx;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  /* padding: 30upx; */
}

.uni-popup-top {
  top: 0;
  left: 0;
  width: 100%;
  height: 100upx;
  line-height: 100upx;
  text-align: center;
  transition: all 5s linear;
}

.uni-popup-bottom {
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 100upx;
  text-align: center;
}
</style>
