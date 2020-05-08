<template>
  <view class="task-list-wrap">
    <view class="positionCss">
      <search-input
        :searchKey.sync="searchParams.searchKey"
        :searchValue.sync="searchParams.searchValue"
        :selectListWrap="selectListWrap"
        @on-search="searchNow"
        @on-selectChange="clearSearch"
      />
      <view class="tab-wrap">
        <view class="tab">
          <view
            class="tab-item"
            v-for="(item, index) in tabList"
            :key="index"
            :class="{ 'active-item': tabCurrentIndex === index }"
            @tap="tabChange(item, index)"
          >
            <view class="title">{{ item.name }}</view>
          </view>
        </view>
      </view>
    </view>

    <view style="margin-top: 220upx;"></view>

    <view class="content">
      <view v-if="list.length === 0">
        <view class="not-find-data">暂无数据</view>
      </view>
      <view v-else>
        <taskContent
          :tasklist="list"
          @cancleTask="handleCancle"
          @getTask="handletask"
          @setState="handleState"
        ></taskContent>
        <graceLoading :loadingType="loadingType"></graceLoading>
      </view>
    </view>

    <uni-popup ref="showtip" :type="type" :mask-click="false">
      <view class="uni-tip">
        <text class="uni-tip-title">修改状态</text>
        <view class="row">
          <view class="col" style="width: 100%">
            <upload-card
              des="点击上传凭证"
              type="job"
              :showImgUrl="form.attachmentUrl"
              @uploadSuccess="handleUploadSuccess($event, 'attachmentUrl')"
            />
          </view>
        </view>
        <view class="uni-tip-group-button">
          <text class="uni-tip-button" @click="cancel()">取消</text>
          <text class="uni-tip-button" @click="cansure()">确定</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import URL from "@/api/serverApi";
import { get, post } from "@/utils/request";
import { showToast, showLoading, hideLoading } from "@/utils/show.js";
import searchInput from "@/components/search-input/search-input.vue";
import taskContent from "./taskcontent.vue";
import graceLoading from "graceUI/components/graceLoading.vue";
import {
  sendstate,
  takedeliveryway,
  deliverytype,
  actionlist
} from "@/utils/type.js";
import uniPopup from "@/components/uni-popup/uni-popup-new.vue";
import UploadCard from "@/components/uploadCard/uploadCard";

export default {
  components: {
    searchInput,
    taskContent,
    graceLoading,
    uniPopup,
    UploadCard
  },
  data() {
    return {
      searchParams: {
        searchKey: "sendVehicleNo",
        searchValue: "",
        pageNo: 1,
        pageSize: 20
      },
      selectListWrap: {
        index: 0,
        selectList: [
          {
            label: "派车单号",
            value: "sendVehicleNo"
          }
        ]
      },
      tabCurrentIndex: 0,
      tabList: [
        {
          name: "待接受",
          type: "NEW"
        },
        {
          name: "进行中",
          type: ""
        },
        {
          name: "已完成",
          type: "FINISH"
        },
        {
          name: "已取消",
          type: "REFUSE"
        }
      ],

      list: [],
      loadingType: 0,

      sendstate: sendstate,
      takedeliveryway: takedeliveryway,
      deliverytype: deliverytype,
      actionList: actionlist,

      type: "",
      form: {
        sendvehicleId: "",
        status: "",
        attachmentUrl: ""
      }
    };
  },
  methods: {
    searchNow(e) {
      this.searchParams[this.searchParams.searchKey] = e;
      this.getlist();
    },
    tabChange(e, index) {
      this.clearSearch();
      this.tabCurrentIndex = index;
      this.list = [];
      if (index == 0) {
        this.searchParams.status = "NEW";
      } else if (index == 2) {
        this.searchParams.status = "FINISH";
      } else if (index == 3) {
        this.searchParams.status = "cancle";
      } else {
        this.searchParams.status = "";
      }
      this.searchRes = false;
      this.searchParams.status = e.type;
      this.searchParams.pageSize = 20;
      this.getlist();
      this.$refs["showtip"].close();
    },
    clearSearch() {
      this.searchParams[this.searchParams.searchKey] = "";
      this.searchParams.searchValue = "";
    },
    getlist() {
      // console.log("this.searchParams", this.searchParams);

      post(URL.task.tasklist, this.searchParams).then(res => {
        console.log("res任务获取成功", res);
        this.list = res.data.map(item => {
          let state = this.setData(
            this.sendstate.filter(v => v.value === item.sendStatus)
          );
          if (this.tabCurrentIndex == 3) {
            state = "已取消";
          }

          let goodsName = item.goodsTotalName;
          if (goodsName != null) {
            let length = goodsName.length;
            if (length > 9) {
              goodsName = goodsName.substring(0, 8) + "...";
            }
          } else {
            goodsName = "暂无货物名称";
          }

          const shipperAddress = item.consignorAddressName;
          // let shipperAddress = item.consignorAddressName.substring(
          //   0,
          //   item.consignorAddressName.lastIndexOf(",")
          // );
          // shipperAddress = shipperAddress.replace(
          //   /[\u5E02\u8F96\u533A\u7701,]*/g,
          //   ""
          // );

          // let takeDeliveryWay = this.setData(
          //   this.takedeliveryway.filter(v => v.value === item.takeDeliberyWay)
          // );
          if (item.takeDeliberyWay == 1) {
            item.takeDeliberyWay = "到账装货";
          } else {
            item.takeDeliberyWay = "指定地点装货";
          }

          let receiverAddress = item.consigneeAddressName;
          // 	let receiverAddress = item.CONSIGNEE_ADDRESS_NAME.substring(0, item.CONSIGNEE_ADDRESS_NAME.lastIndexOf(","));
          // 	receiverAddress = receiverAddress.replace(/[\u5E02\u8F96\u533A\u7701,]*/g, '');

          // let deliverytype = this.setData(
          //   this.deliverytype.filter(v => v.value === item.deliveryType)
          // );

          if (item.takeDeliveryTime == null) {
            item.takeDeliveryTime = "";
          } else {
            item.takeDeliveryTime = item.takeDeliveryTime.split(" ")[0];
          }

          if (item.deliveryType == 1) {
            item.deliveryType = "上门自取";
          } else {
            item.deliveryType = "送货上门";
          }

          if (item.payType == 0) {
            item.payType = "现金转账";
          } else if (item.payType == 1) {
            item.payType = "承兑汇票";
          }

          // 	let obj = {};
          // 	this.actionList.forEach((itemChild, index) => {
          // 		if (itemChild.value === item.SEND_STATUS) {
          // 			if (this.actionList.length - 1 > index) {
          // 				obj.value = this.actionList[index + 1].value;
          // 				obj.lable = this.actionList[index + 1].lable;
          // 			}
          // 		}
          // 	});

          if (item.transportMode == "WHOLE") {
            item.transportMode = "整车";
          } else {
            item.transportMode = "零担";
          }

          return {
            type: this.tabCurrentIndex,

            sendvehicleId: item.sendVehicleId,
            orderId: item.orderId,
            status: item.sendStatus,
            createTime: item.actionTime,

            companyName: item.companyName,
            state: state,
            sendVehicleNo: item.sendVehicleNo,

            goodsName: goodsName,
            goodsNum: item.senNumber, //数量
            goodsWeight: item.sendWeight, //重量
            goodsVo: item.sendVolume, //体积

            shipperPerson: item.consignors,
            shipperTel: item.consignorContact,
            shipperAddress: shipperAddress,
            takeDeliveryWay: item.takeDeliberyWay,
            takeDeliveryTime: item.takeDeliveryTime,

            receiverPerson: item.consignees,
            receiverTel: item.consigneeContact,
            receiverAddress: receiverAddress,
            deliverytype: item.deliveryType,

            // 		action: obj
            consigneeAddressDetail: item.consigneeAddressDetail,
            consignorAddressDetail: item.consignorAddressDetail,
            payType: item.payType,
            transportMod: item.transportMode
          };
        });
        console.log("this.list111111111111111111", this.list[0]);
        this.loadingType = 2;
        hideLoading();
        uni.stopPullDownRefresh();
      });
    },
    setData(arr) {
      if (arr.length == 0) {
        return "";
      } else {
        return arr[0].lable;
      }
    },
    handletask(e) {
      console.log("接受路径", URL.task.edittask, "接受参数", {
        sendvehicleId: e,
        status: "DISPATCHED"
      });

      post(URL.task.edittask, {
        sendvehicleId: e,
        status: "DISPATCHED"
      }).then(res => {
        showToast("接受成功");
        this.getlist();
      });
    },
    handleState(e) {
      uni.setStorageSync("tasktype", this.tabCurrentIndex);
      this.form.sendvehicleId = e.sendvehicleId;
      this.form.status = e.action.value;
      this.form.attachmentUrl = "";
      this.type = "center";
      this.$nextTick(() => {
        this.$refs["showtip"].open();
      });
    },
    handleCancle(e) {
      post(URL.task.edittask, {
        sendvehicleId: e,
        status: "REFUSE"
      }).then(res => {
        showToast("拒绝成功");
        this.getlist();
      });
    },
    cansure() {
      post(URL.task.edittask, this.form).then(res => {
        showToast("修改成功");
        this.form.attachmentUrl = "";
        this.$refs["showtip"].close();
        this.getlist();
      });
    },
    cancel() {
      this.form.attachmentUrl = "1";
      this.$refs["showtip"].close();
    },
    handleUploadSuccess(e, name) {
      this.form[name] = e;
    }
  },
  onShow() {
    let type = uni.getStorageSync("tasktype");
    this.tabCurrentIndex = type;
    if (type == 0) {
      this.searchParams.status = "NEW";
    } else if (type == 2) {
      this.searchParams.status = "FINISH";
    } else if (type == 3) {
      this.searchParams.status = "cancle";
    } else {
      this.searchParams.status = "";
    }
    this.getlist();
  },
  // onLoad() {
  // 	uni.setStorageSync('tasktype', 0);
  // },
  onPullDownRefresh() {
    if (this.tabCurrentIndex === 0) {
      this.searchParams.pageSize = 20;
    }

    this.getlist();
  },
  onReachBottom() {
    this.loadingType = 1;
    if (this.tabCurrentIndex === 0) {
      this.searchParams.pageSize += 20;
    }
    this.getlist();
    hideLoading();
  }
};
</script>

<style lang="scss">
@import "@/style/index.scss";

.task-list-wrap {
  .positionCss {
    position: fixed;
    top: 0%;
    /* #ifdef H5 */
    top: 6%;
    /* #endif */
    // left:5%;
    z-index: 999;
    background: #ffffff;
    width: 100%;
  }

  .tab-wrap {
    margin: 20upx 0 0 5%;
    width: 90%;

    .tab {
      height: 65upx;
      display: flex;

      .tab-item {
        width: 50%;
        margin: 0 auto;
        border: 1upx solid #0079fe;
        color: #0079fe;
        text-align: center;

        .title {
          margin-top: 10upx;
        }
      }
    }
  }

  .active-item {
    background-color: #0079fe;
    color: #fff !important;
  }
}

/* 提示窗口 */
.uni-tip {
  /* #ifndef APP-NVUE */
  display: flex;
  flex-direction: column;
  /* #endif */
  padding: 15px;
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
}

.uni-tip-title {
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.uni-tip-content {
  /* padding: 15px;
	 */
  font-size: 14px;
  color: #666;
}

.uni-tip-group-button {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  margin-top: 20px;
}

.uni-tip-button {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #3b4144;
}
</style>
