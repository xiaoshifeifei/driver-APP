<template>
	<view class="task-content-wrap">
		<view v-for="(item, index) in tasklist" :key="index" class="items">
			<view class="item">
				<view @tap="detail(item.sendvehicleId,item.type,item.transportMod,item.payType,item.consignorAddressDetail,item.consigneeAddressDetail)">
					<view class="first">
						<view class="title">
							<image src="../../static/image/task/company.png"></image>
						</view>
						<view class="name">
							<text>{{item.companyName}}</text>
						</view>
						<view class="state">
							<text>{{item.state}}</text>
						</view>
					</view>
					<view class="second">
						<view class="title">
							<image src="../../static/image/task/car.png"></image>
						</view>
						<view class="msg">
							<view class="content">
								<text>派车单号：</text>
								<text>{{item.sendVehicleNo}}</text>
							</view>
							<view class="content">
								<text>创建时间：</text>
								<text>{{item.createTime}}</text>
							</view>
							<view class="content goods">
								<view>
									货物信息：
								</view>
								<view>
									<view class="goodsname">
										<text>{{item.goodsName}}</text>
										<!-- <text>【农产品】</text> -->
									</view>
									<view>
										<text class="num">数量</text>
										<text class="num">{{item.goodsNum}}</text>
										<!-- <text class="num">包</text> -->
										<text class="num">|</text>
										<text class="num">重量</text>
										<text>{{item.goodsWeight}}</text>
										<text class="num">吨</text>
										<text class="num">|</text>
										<text class="num">体积</text>
										<text>{{item.goodsVo}}</text>
										<text>m³</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="third">
						<view class="title">
							<image src="../../static/image/task/send.png"></image>
						</view>
						<view class="msg">
							<view class="content">
								<text>发货人：</text>
								<text>{{item.shipperPerson}}</text>
								<text style="margin-left:20upx">{{item.shipperTel}}</text>
							</view>
							<view class="content">
								<text>发货城市：</text>
								<text>{{item.shipperAddress}}</text>
							</view>
							<view class="content">
								<text>提货方式：</text>
								<text class="type">{{item.takeDeliveryWay}}</text>
								<text class="type">|</text>
								<text class="type">{{item.takeDeliveryTime}}</text>
							</view>
						</view>
					</view>
					<view class="third">
						<view class="title">
							<image src="../../static/image/task/get.png"></image>
						</view>
						<view class="msg">
							<view class="content">
								<text>收货人：</text>
								<text>{{item.receiverPerson}}</text>
								<text style="margin-left:20upx">{{item.receiverTel}}</text>
							</view>
							<view class="content">
								<text>收货城市：</text>
								<text>{{item.receiverAddress}}</text>
							</view>
							<view class="content">
								<text>配送方式：</text>
								<text class="type">{{item.deliverytype}}</text>
								<!-- <text class="type">|</text>
								<text class="type">2019-11-05 12:00:00</text> -->
							</view>
						</view>
					</view>
				</view>
				<view class="btn" v-if="item.status == 'NEW' && item.type == 0">
					<button class="cancle" size="mini" type="warn" @tap="cancle(item.sendvehicleId)">拒绝</button>
					<button class="get" size="mini" type="primary" @tap="get(item.sendvehicleId)">接受</button>
				</view>
				<view class="btn" v-if="item.status !== 'FINISH' && item.status !== 'NEW'">
					<view v-if="item.action">
						<button class="cancle" size="mini" type="primary" @tap="setState(item)">{{item.action.lable}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import URL from "@/api/serverApi";
	import {
		get,
		post
	} from "@/utils/request.js";
	import {
		showToast,
		showLoading,
		hideLoading
	} from "@/utils/show.js";

	export default {
		props: {
			tasklist: Array
		},
		methods: {
			detail(item,type,transportMod,payType,consignorAddressDetail,consigneeAddressDetail) {
				uni.navigateTo({
					url: `/pages/task/taskdetail?id=${item}&type=${type}&item=${transportMod}&payType=${payType}&consignorAddressDetail=${consignorAddressDetail}&consigneeAddressDetail=${consigneeAddressDetail}`
				});
			},
			cancle(item) {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: "确定拒绝该订单",
					success: function(res) {
						if (res.confirm) {
							_this.$emit("cancleTask", item);
						}
					}
				});
			},
			get(item) {
				console.log('接受订单ID',item);
				
				var _this = this;
				uni.showModal({
					title: '提示',
					content: "确定接受该订单",
					success: function(res) {
						if (res.confirm) {
							_this.$emit("getTask", item);
						}
					}
				});
			},
			setState(item) {
				var _this = this;
				_this.$emit("setState", item);
				// uni.showModal({
				// 	title: '提示',
				// 	content: "确定修改状态",
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			_this.$emit("setState", item);
				// 		}
				// 	}
				// });
			}
		}
	}
</script>

<style lang="scss">
	@import "@/style/index.scss";

	.task-content-wrap {
		overflow-x: hidden;
		background: #FFFFFF;

		.item {
			border: #EEEEEE solid 1px;
			width: 94%;
			margin: 0 0 20upx 3%;

			.first {
				display: flex;
				margin: 10upx 0;
				height: 60upx;

				.title {
					text-align: center;
					width: 15%;
					padding-top: 6upx;

					image {
						@include size(40upx, 40upx);
					}
				}

				.name {
					width: 70%;
					height: 60upx;

					text {
						line-height: 60upx;
						font-size: 32upx;
					}
				}

				.state {
					width: 15%;
					text-align: center;

					text {
						color: #0084ff;
						line-height: 60upx;
					}
				}
			}

			.second {
				display: flex;
				margin: 20upx 0;

				.title {
					text-align: center;
					width: 15%;
					padding-top: 6upx;

					image {
						@include size(56upx, 43upx);
					}
				}

				.msg {
					width: 85%;
					color: #888888;

					.content {
						margin-bottom: 8upx;
					}

					.goods {
						display: flex;

						.goodsname {
							padding-bottom: 10upx;
						}

						.num {
							padding-right: 10upx;
						}
					}
				}
			}

			.third {
				display: flex;
				margin: 20upx 0;

				.title {
					text-align: center;
					width: 15%;
					padding-top: 6upx;

					image {
						@include size(56upx, 43upx);
					}
				}

				.msg {
					width: 85%;
					color: #888888;

					.content {
						margin-bottom: 8upx;
					}

					.type {
						padding-right: 10upx;
					}
				}
			}
		}

		.btn {
			margin-top: 15upx;

			.cancle {
				margin-left: 60%;
				margin-right: 10upx;
			}
		}
	}
</style>
