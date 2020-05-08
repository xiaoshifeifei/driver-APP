<template>
  <view class="task-detail-wrap">
    <view class="box">
      <view class="msg">
        <view class="orderId">
          <text>派车单号：</text>
          <text>{{form.sendvehicleNo}}</text>
        </view>
        <view class="time">
          <text>创建时间：</text>
          <text>{{form.createTime}}</text>
        </view>
      </view>
      <view class="box-con">
        <view class="box-text">{{form.state}}</view>
      </view>
    </view>
    <view class="content">
      <!-- <view class="first">
				<view class="address">
					<view class="send">
						{{form.shipperAddress}}
					</view>
					<view class="point">
						<image src="../../static/image/task/line.png"></image>
					</view>
					<view class="get">
						{{form.receiverAddress}}
					</view>
				</view>
      </view>-->
      <view class="carmsg">
        <view class="name">
          <view class="title">所属公司</view>
          <view class="msg1">{{form.companyName}}</view>
        </view>
        <view class="name">
          <view class="title">配载车辆</view>
          <view class="msg1">{{form.vehicleNumber}}</view>
        </view>
        <view class="name">
          <view class="title">运输模式</view>
          <view class="msg1">{{form.transportMode}}</view>
        </view>
      </view>
      <view class="second">
        <view class="goods" v-for="(i, index) in goodsItem" :key="index">
          <view class="title">货物信息</view>
          <view class="goodsName">
            <view class="goodsitem">
              <text>{{i.goodsName}}</text>
              <text>【{{i.goodsType}}】</text>
            </view>
            <view class="itemss">
              <text class="itemname">数量</text>
              <text class="itemname">{{i.sendNumber}}</text>
              <text class="itemname">|</text>
              <text class="itemname">重量</text>
              <text>{{i.sendWeight}}</text>
              <text class="itemname">吨</text>
              <text class="itemname">|</text>
              <text class="itemname">体积</text>
              <text>{{i.sendVolume}}</text>
              <text>m³</text>
            </view>
          </view>
        </view>
        <!-- <view class="type">
					<view class="typename">
						<view class="title">提&nbsp;&nbsp;&nbsp;&nbsp;货</view>
						<view class="itemss">
							<text class="itemname">{{form.takeDeliveryWay}}</text>
						</view>
					</view>
					<view class="typename">
						<view class="title">配&nbsp;&nbsp;&nbsp;&nbsp;送</view>
						<view class="itemss">
							<text class="itemname">{{form.deliveryType}}</text>
						</view>
					</view>
        </view>-->

        <view class="sendmsg">
          <view class="circle">
            <view class="img">
              <text>发</text>
            </view>
          </view>
          <view class="content11">
            <!-- <view class="first11">
              <view class="name11">
                <text>{{form.shipperPerson}}</text>
              </view>
              <view class="tel">
                <text>{{form.shipperTel}}</text>
              </view>
            </view>
            <view class="second11">
              <text>{{form.shipperUnit}}</text>
            </view>-->
            <view class="third11">
              <text>{{form.consigneeAddressDetail}}</text>
            </view>
          </view>
        </view>

        <view class="sendmsg getmsg">
          <view class="circle">
            <view class="img img1">
              <text>收</text>
            </view>
          </view>
          <view class="content11">
            <!-- <view class="first11">
              <view class="name11">
                <text>{{form.receiverPerson}}</text>
              </view>
              <view class="tel">
                <text>{{form.receiverTel}}</text>
              </view>
            </view>
            <view class="second11">
              <text>{{form.receiverUnit}}</text>
            </view>-->
            <view class="third11">
              <text>{{form.consignorAddressDetail}}</text>
            </view>
          </view>
        </view>

        <view class="note" v-if="form.notes!=null">
          <view class="notetitle">【备注】</view>
          <view class="notecontent">{{form.notes}}</view>
        </view>
      </view>

      <view class="pay">
        <!-- <view class="name">
					<view class="title">运&nbsp;&nbsp;&nbsp;&nbsp;费</view>
					<view class="msg1">{{form.price}}</view>
        </view>-->
        <view class="name">
          <view class="title">付款方式</view>
          <view class="msg1">{{form.payType}}</view>
        </view>
        <!-- 				<view class="name">
					<view class="title">预付金额</view>
					<view class="msg1">500</view>
        </view>-->
      </view>
    </view>
  </view>
</template>

<script>
import URL from "@/api/serverApi";
import { get, post } from "@/utils/request.js";
import { showToast, showLoading, hideLoading } from "@/utils/show.js";
import {
  sendstate,
  transportmode,
  goodstype,
  units,
  takedeliveryway,
  deliverytype,
  paytype
} from "@/utils/type.js";

export default {
  data() {
    return {
      form: {
        sendvehicleNo: "",
        state: "",
        createTime: "",

        shipperAddress: "",
        receiverAddress: "",

        companyName: "",
        vehicleNumber: "",
        transportMode: "",

        takeDeliveryWay: "",
        deliveryType: "",

        shipperPerson: "",
        shipperTel: "",
        shipperUnit: "",
        shipperAddressDetail: "",

        receiverPerson: "",
        receiverTel: "",
        receiverUnit: "",
        receiverAddressDetail: "",

        notes: "",

        price: "",
        payType: ""
      },
      goodsItem: [],

      sendstate: sendstate,
      transportmode: transportmode,
      goodstype: goodstype,
      units: units,
      takedeliveryway: takedeliveryway,
      deliverytype: deliverytype,
      paytype: paytype,

      type: 0
    };
  },
  methods: {
    logistics(orderNo, sendvehicleId) {
      uni.navigateTo({
        url: `/pages/order/logistics?orderNo=${orderNo}&sendvehicleId=${sendvehicleId}`
      });
    },
    getorder(id) {
      console.log("参数", id, "路径", URL.task.gettask);
      let url = URL.task.gettask;
      let obj = {
        sendvehicleId: id
      };
      post(url, obj).then(res => {
        console.log("成功请求", res);

        let goodsEntities = JSON.parse(res.data.goodsEntities);
        this.goodsItem = goodsEntities;

        this.form.sendvehicleNo = res.data.sendvehicleNo; //+
        this.form.state = this.setData(
          this.sendstate.filter(v => v.value === res.data.STATUS)
        );
        if (this.type == 3) {
          this.form.state = "已取消";
        } else if (this.type == 0) {
          this.form.state = "待接收";
        } else if (this.type == 1) {
          this.form.state = "进行中";
        } else {
          this.form.state = "已完成";
        }

        this.form.createTime = res.data.acceptTime; //+

        this.form.companyName = res.data.companyName; //+
        this.form.vehicleNumber = res.data.vehicleNumber;

        let shipperAddress = res.data.consignorAddressName.substring(
          0,
          res.data.consignorAddressName.lastIndexOf(",")
        );
        this.form.shipperAddress = shipperAddress.replace(
          /[\u5E02\u8F96\u533A\u7701,]*/g,
          ""
        );

        let receiverAddress = res.data.consigneeAddressName.substring(
          0,
          res.data.consigneeAddressName.lastIndexOf(",")
        );
        this.form.receiverAddress = receiverAddress.replace(
          /[\u5E02\u8F96\u533A\u7701,]*/g,
          ""
        );

        this.form.transportMode = this.setData(
          this.transportmode.filter(v => v.value === res.data.TRANSPORT_MODE)
        );

        // this.goodsItem = res.data.goodsEntities.map(item => {
        //   return {
        //     goodsName: item.goodsName,
        //     type: this.setData(
        //       this.goodstype.filter(v => v.value === item.goodsType)
        //     ),
        //     number:
        //       item.number +
        //       this.setData(this.units.filter(v => v.value === item.unit)),
        //     weight: item.weight,
        //     volume: item.volume
        //   };
        // });

        this.form.takeDeliveryWay = this.setData(
          this.takedeliveryway.filter(
            v => v.value === res.data.TAKE_DELIVERY_WAY
          )
        );
        this.form.deliveryType = this.setData(
          this.deliverytype.filter(v => v.value === res.data.DELIVERY_TYPE)
        );

        this.form.shipperPerson = res.data.CONSIGNORS;
        this.form.shipperTel = res.data.CONSIGNOR_CONTACT;
        this.form.shipperUnit = res.data.CONSIGNOR;
        this.form.shipperAddressDetail =
          res.data.CONSIGNOR_ADDRESS_NAME.replace(/,/g, "") +
          res.data.CONSIGNOR_ADDRESS_DETAIL;

        this.form.receiverPerson = res.data.CONSIGNEES;
        this.form.receiverTel = res.data.CONSIGNEE_CONTACT;
        this.form.receiverUnit = res.data.CONSIGNEE;
        this.form.receiverAddressDetail =
          res.data.CONSIGNEE_ADDRESS_NAME.replace(/,/g, "") +
          res.data.CONSIGNEE_ADDRESS_DETAIL;

        this.form.notes = res.data.remarks;

        this.form.price = res.data.price;
        // this.form.payType = this.setData(
        //   this.paytype.filter(v => v.value === res.data.PAY_TYPE)
        // );
      });
    },
    setData(arr) {
      if (arr.length == 0) {
        return "";
      } else {
        return arr[0].lable;
      }
    }
  },
  onLoad(option) {
    console.log("optionoption", option.consignorAddressDetail);

    this.type = Number(option.type);
    uni.setStorageSync("tasktype", this.type);
    this.form.transportMode = option.item;

    this.form.payType = option.payType;
    this.form.consigneeAddressDetail = option.consigneeAddressDetail;
    this.form.consignorAddressDetail = option.consignorAddressDetail;
    let id = option.id;
    this.getorder(id);
  }
};
</script>

<style lang="scss">
@import "@/style/index.scss";

.task-detail-wrap {
  overflow-x: hidden;

  .box {
    width: 100%;
    height: 180upx;
    background: #0084ff;
    position: relative;
    z-index: 90;
  }

  .box .box-con {
    width: 200upx;
    height: 178upx;
    overflow: hidden;
    position: absolute;
    top: -4upx;
    right: -2upx;
  }

  .box .box-text {
    color: #0084ff;
    text-align: center;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    position: relative;
    padding: 6upx 0;
    left: 50upx;
    top: 32upx;
    width: 200upx;
    background-color: #ffffff;
  }

  .box .box-text:before,
  .box-text:after {
    content: "";
    position: absolute;
    bottom: -6upx;
  }

  .box .box-text:before {
    left: 0;
  }

  .box .box-text:after {
    right: 0;
  }

  .msg {
    color: #ffffff;
    position: absolute;
    top: 30%;
    left: 6%;

    .orderId {
      font-size: 34upx;
      font-weight: 600;
    }

    .time {
      font-size: 30upx;
      padding-top: 4upx;
    }
  }

  .content {
    width: 100%;
    margin-top: 20upx;

    .first {
      display: flex;
      margin: 10upx 0;

      .address {
        width: 60%;
        display: flex;
        margin: 0 20%;

        .send {
          width: 40%;
          padding-top: 8upx;
          text-align: center;
          font-size: 30upx;
        }

        .point {
          width: 12%;

          image {
            @include size(56upx, 11upx);
          }
        }

        .get {
          width: 48%;
          padding-top: 8upx;
          text-align: center;
          font-size: 30upx;
        }
      }
    }

    .carmsg {
      margin-bottom: 20upx;

      .name {
        display: flex;
        margin: 5upx 0;

        .title {
          text-align: center;
          width: 20%;
          color: #bfbfbf;
        }

        .msg1 {
          width: 80%;
          color: #808080;
        }
      }
    }

    .second {
      margin-bottom: 20upx;

      .goods {
        width: 100%;
        display: flex;
        margin-bottom: 10px;

        .title {
          text-align: center;
          width: 20%;
          color: #bfbfbf;
        }

        .goodsName {
          color: #808080;

          .itemname {
            margin-right: 10upx;
          }
        }
      }

      .type {
        margin-bottom: 10px;
      }

      .typename {
        display: flex;

        .title {
          text-align: center;
          width: 20%;
          color: #bfbfbf;
        }

        .itemss {
          color: #808080;

          .itemname {
            margin-right: 10upx;
          }
        }
      }
    }

    .sendmsg {
      width: 94%;
      margin: 0 auto;
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      display: flex;

      .circle {
        width: 15%;

        .img {
          width: 80upx;
          height: 80upx;
          vertical-align: middle;
          background-color: #0084ff;
          border-radius: 25%;
          -moz-border-radius: 25%;
          -webkit-border-radius: 25%;
          margin-top: 30upx;
          display: flex;

          text {
            color: #ffffff;
            font-size: 40upx;
            align-self: center;
            align-items: center;
            margin: 0 auto;
          }
        }

        .img1 {
          background-color: #ff5c4b !important;
        }
      }

      .content11 {
        margin-left: 16upx;
        width: 75%;
        height: 100%;
        padding-bottom: 10upx;

        .first11 {
          margin-top: 10upx;
          display: flex;

          .name11 {
            font-size: 32upx;
          }

          .tel {
            font-size: 32upx;
            margin-left: 20upx;
          }
        }

        .second11 {
          color: #929292;
          margin-top: 6upx;
          font-size: 26upx;
        }

        .third11 {
          color: #929292;
          margin-top: 6upx;
          font-size: 26upx;
        }
      }
    }

    .getmsg {
      border-top: none;
    }

    .note {
      .notetitle {
        margin: 10upx;
        font-size: 30upx;
      }

      .notecontent {
        width: 94%;
        margin: 10upx 3%;
        color: #999999;
      }
    }

    .pay {
      margin-bottom: 20upx;

      .name {
        display: flex;
        margin: 5upx 0;

        .title {
          text-align: center;
          width: 20%;
          color: #bfbfbf;
        }

        .msg1 {
          width: 80%;
          color: #808080;
        }
      }
    }
  }

  .btn {
    margin-top: 15upx;
    margin-left: 68%;
  }

  .car {
    width: 100%;
    display: flex;
    margin: 30upx 0 0 2%;
  }

  .points {
    width: 20upx;
    height: 20upx;
    vertical-align: middle;
    background-color: #000000;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    margin-top: 30upx;
    display: flex;
  }

  .notes {
    width: 70%;
    margin-left: 2%;
    color: #888888;
  }

  .btnc {
    width: 30%;
  }
}
</style>
