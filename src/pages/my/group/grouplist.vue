<template>
	<view class="apply-group-wrap">
		<view class="content">
			<view v-if="list.length">
				<view class="outer" v-for="(item, index) in list" :key="index">
					<view class="card">
						<view class="first">
							<image src="/static/image/my/man.png"></image>
							<view class="company">{{ item.name }}</view>
						</view>
						<view class="center">
							<view class="all">
								<view class="first">
									<text>{{ item.legalperson }}</text>
								</view>
							</view>
							<view class="all">
								<view class="first">
									<text>{{ item.addressName }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="btn1">
						<button size="mini" type="primary" v-if="item.joinStatus == 0 || item.joinStatus == 3" @tap="handleApply(item)">申请</button>
						<button size="mini" type="primary" v-if="item.joinStatus == 1" @tap="handleCancleApply(item)">撤销</button>
						<button size="mini" v-if="item.joinStatus == 2" disabled style="color:green">通过</button>
					</view>
				</view>
				<graceLoading :loadingType="loadingType"></graceLoading>
			</view>
			<view class="not-find-data" v-else>暂无数据</view>
		</view>
	</view>
</template>
<script>
	import URL from '@/api/serverApi';
	import {
		get,
		post
	} from '@/utils/request';
	import {
		showToast,
		showLoading,
		hideLoading
	} from "@/utils/show.js";
	import graceLoading from "graceUI/components/graceLoading.vue";

	export default {
		components: {
			graceLoading
		},
		data() {
			return {
				userType: "1",
				loadingType: 0,
				stepIndex: 1,
				stepList: [{
					label: "未提交审核",
					value: 0
				}, {
					label: "审核中",
					value: 1
				}, {
					label: "审核通过",
					value: 2
				}],
				searchParams: {
					pageSize: 10,
					pageNo: 1,

					isClient: 0,
					isJoin: true,
					userId: ""
				},
				list: [],

				userId: ""
			}
		},
		onPullDownRefresh() {
			this.searchParams.pageSize = 20
			this.getData();
		},
		onReachBottom() {
			this.loadingType = 1;
			this.searchParams.pageSize += 20
			this.getData();
			uni.hideLoading()
		},
		onLoad() {
			this.getData();
		},
		onShow() {
			if (uni.getStorageSync('userInfo')) {
				this.loginInfo = uni.getStorageSync('userInfo');
				this.isDriverCurrent = this.loginInfo.finishInfo;
			} else {
				this.getLoginInfo();
			}
		},
		methods: {
			getLoginInfo() {
				get(URL.user.getuserinfo, {})
					.then(res => {
						uni.setStorageSync('userInfo', res.data);
						this.loginInfo = uni.getStorageSync('userInfo');
						this.isDriverCurrent = this.loginInfo.finishInfo;
					})
			},
			getData() {
				get(URL.user.getuserinfo, {})
					.then(res => {
						this.userType = res.data.userType;
						this.userId = res.data.userId;
						this.updatalist(res.data.userId);
					})
			},
			updatalist(userId) {
				this.searchParams.userId = userId;
				showLoading("正在加载");
				post(URL.group.companylist, this.searchParams)
					.then(res => {
						this.list = res.data;
						hideLoading();
						this.loadingType = 2;
						uni.stopPullDownRefresh();
					})
			},
			handleApply(item) {
				if (!this.isDriverCurrent) {
					showToast("你尚未进行司机认证，无法申请加入企业");

					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/my/driver/index"
						})
					}, 2000)
					return;
				}

				let id = item.companyId;
				let _self = this;
				if (this.userType == '2') {
					showToast("你是内部员工，无法申请其他企业");
					return
				}
				showLoading("正在申请");
				post(URL.group.joincompany, {
						companyId: id,
						joinStatus: 1,
						userId: this.userId
					})
					.then(res => {
						hideLoading();
						showToast("申请加入成功，审核中...");
						_self.getData();
					})
			},
			handleCancleApply(item) {
				let userId = this.userId;
				let _self = this;
				uni.showModal({
					title: '提示',
					content: '确定撤销该申请吗',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '正在撤销申请',
								mask: true
							})
							console.log(111)
							post(URL.group.cancalejoin, {
									userId: userId,
									companyId: item.companyId
								})
								.then(res => {
									uni.hideLoading()
									_self.getData();
								})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "@/style/index.scss";

	.apply-group-wrap {
		.grace-step {
			width: 95%;
			display: flex;
			flex-wrap: nowrap;
			margin: 0 auto;
		}

		.grace-step .item {
			display: inline-block;
			margin: 10upx 0upx;
			flex-shrink: 0;
		}

		.grace-step .item .icon {
			width: 50upx;
			font-size: 22upx;
			height: 50upx;
			text-align: center;
			line-height: 50upx;
			margin: 10upx auto;
			border-radius: 100%;
			background: #fff;
			border: 1upx solid #ececec;
			color: #999999;
		}

		.grace-step .item .text {
			text-align: center;
			margin-top: 6upx;
			line-height: 50upx;
			font-size: 24upx;
			color: #a5a7b2;
		}

		.grace-step .active {
			border-bottom-color: #0079fe !important;
			color: #0079fe !important;
		}

		.grace-step .active .icon {
			background: #0079fe !important;
			font-size: 28upx;
			color: #ffffff !important;
		}

		.grace-step .active .text {
			color: #0079fe !important;
		}

		.grace-step .line {
			width: 100%;
			height: 45upx;
			border-bottom: 1px solid #a5a7b2;
		}

		.grace-form {
			background: #fff;

			.form-content {
				width: 95%;
				margin: 0 auto;
			}
		}

		.btn2 {
			margin-left: 50upx;
			margin-top: 10upx;
		}

		.content {
			.outer {
				margin: 0 auto;
				background-color: #fff;
				width: 96%;
				height: 200upx;
				border: #ececec 1upx solid;
				border-radius: 20upx;
				margin-top: 20upx;
				margin-bottom: 20upx;

				.card {
					width: 90%;
					height: 170upx;
					margin: 0 auto;
					margin-top: 10upx;

					.first {
						display: flex;

						image {
							@include size(55upx, 55upx);
							margin-top: 10upx;
						}

						.company {
							font-weight: bold;
							font-size: 35upx;
							margin-top: 10upx;
							margin-left: 20upx;
						}
					}

					.center {
						.all {
							color: #222;
							display: flex;
							margin-top: 10upx;
							padding-left: 70upx;
						}

						.second {
							margin-left: 20upx;
						}
					}
				}

				.btn1 {
					margin-top: -150upx;
					margin-right: 30upx;
					float: right;
				}
			}
		}
	}
</style>
