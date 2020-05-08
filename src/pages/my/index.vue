<template>
	<view class="my-wrap">
		<view class="grace-header" :url="url" :open-type="openType" style="background: url(../../static/image/my/background.jpg) no-repeat;background-size: 100% 100%;">
			<view class="logo">
				<image @tap="previewIcon(loginInfo.photo)" :src="loginInfo.photo ? loginInfo.photo : imgurl" :class="[url == null?'':'styleActive']"
				 mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="title grace-blod">{{ loginInfo.userName }}</view>
				<view class="desc">{{ loginInfo.userTel }}</view>
			</view>
		</view>

		<view style="border-bottom:20px solid #F5F5F5;"></view>

		<view class="my_index" v-for="(item, index) in menuList" :key="index">
			<view class="my_index_list grace-bg-white" @tap="gopage(item)">
				<view class="index_listicon pad-l-mt10">
					<image :src="item.imgUrl" mode="scaleToFill" class="img_ico"></image>
				</view>
				<view class="index_listcon pad-l-mt20">{{ item.text }}</view>
				<view class="index_listRicon pad-r-mt10"><text class="icon">&#xe683;</text></view>
			</view>

			<view class="division" v-if="index == 3"></view>
		</view>

		<view class="exit-button" @tap="logout"><button type="primary">退出账号</button></view>
	</view>
</template>

<script>
	import URL from '@/api/serverApi';
	import {
		get,
		post
	} from '@/utils/request';

	export default {
		data() {
			return {
				loginInfo: {},
				url: '',
				openType: '',
				imgurl: '../../static/image/my/inithead.png',
				menuList: [{
						imgUrl: '/static/image/my/userinfo.png',
						text: '个人信息',
						target: './user/changeuserinfo'
					}, {
						imgUrl: '/static/image/my/driver.png',
						text: '司机认证',
						target: '../my/driver/index'
					},
					// {
					// 	imgUrl: '/static/image/my/car.png',
					// 	text: '车辆信息',
					// 	target: '../my/car/index'
					// }, 
					{
						imgUrl: '/static/image/my/team.png',
						text: '所在团队',
						target: '../my/group/index'
					}, {
						imgUrl: '/static/image/my/changepwd.png',
						text: '修改密码',
						target: './user/changepwd'
					}, {
						imgUrl: '/static/image/my/aboutus.png',
						text: '关于我们',
						target: './about/aboutus'
					}
				]
			};
		},
		methods: {
			//查看头像
			previewIcon(imgUrl) {
				if (imgUrl == null) {
					imgUrl = this.imgurl;
				}
				uni.previewImage({
					current: 0,
					urls: [imgUrl]
				});
			},
			getLoginInfo() {
				uni.showLoading({
					title: '正在加载',
					mask: true
				})
				get(URL.user.getuserinfo, {})
					.then(res => {
						uni.setStorageSync('userInfo', res.data);
						this.loginInfo = uni.getStorageSync('userInfo');
						this.url = this.loginInfo.photo;
						uni.hideLoading();
					})
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '正在退出',
								mask: true
							})
							get(URL.user.loginout, {})
								.then(res => {
									uni.showToast({
										icon: 'none',
										title: '已退出登录',
										duration: 2000,
										success: () => {
											// uni.closeSocket();
											setTimeout(() => {
												uni.removeStorageSync('userInfo');
												uni.removeStorageSync('userInfoToken');
												uni.removeStorageSync('sessionId');
												uni.reLaunch({
													url: `/pages/login/index`
												});
											}, 500);
										}
									});
									uni.hideLoading();
								})
						}
					}
				});
			},
			gopage(item) {
				uni.navigateTo({
					url: item.target
				});
			},
		},
		onShow() {
			uni.setStorageSync('tasktype', 0);
			if (uni.getStorageSync('userInfo')) {
				this.loginInfo = uni.getStorageSync('userInfo');
				this.url = this.loginInfo.photo;
				if (this.loginInfo.photo == "") {
					this.url = null;
				}
			} else {
				this.getLoginInfo();
			}
		}
	}
</script>

<style lang="scss">
	@import '@/style/index.scss';

	.styleActive {
		height: 132upx !important;
	}

	.my-wrap {
		.grace-header {
			width: 100%;
			height: 240upx;
			// background: url(../../static/image/my/background11.png);
			// background-size: 100% 100%;
			display: flex;
			flex-direction: row;
		}

		.grace-header .logo {
			padding-left: 40upx;
			align-self: center;
		}

		.grace-header .logo image {
			width: 120upx;
			height: 120upx !important;
			border-radius: 50%;
		}

		.grace-header .content {
			margin-left: 30upx;
			align-self: center;
		}

		.grace-header .content .title {
			font-size: 36upx;
			line-height: 44upx;
			font-family: PingFang-SC-Medium;

			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: #FFFFFF;
		}

		.grace-header .content .desc {
			line-height: 2em;
			margin-top: 6upx;
			font-size: 26upx;
			color: #FFFFFF;
		}

		.grace-header .icon-right {
			width: 60upx;
			height: 100%;
			line-height: 100%;
			font-family: 'grace-iconfont' !important;
			font-style: normal;
			position: absolute;
			z-index: 1;
			top: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 44upx;
		}

		.grace-header .icon-right:before {
			content: '\e601';
			color: #b2b2b2;
		}

		.headmargin {
			height: var(--status-bar-height);
		}

		.my_index {
			.my_index_list {
				padding: 0 3%;
				border-bottom: 2upx solid #f5f5f5;
				@include text--middle(100upx) display: flex;

				.index_listicon {
					flex: 0, 0, 46upx;

					.img_ico {
						width: 40upx;
						height: 40upx;
						margin-top: 32upx;
					}
				}

				.index_listcon {
					flex: 1;
				}

				.index_listRicon {
					flex: 1;
					text-align: right;
				}
			}
		}

		.exit-button {
			margin: 0 auto;
			margin-top: 50upx;
			width: 90%;
		}

		.division {
			width: 100%;
			height: 20upx;
			background: #eeeeee;
		}
	}
</style>
