<template>
	<view class="aboutus-wrap">
		<view class="bg">
			<view class="bg-info">
				<view class="logo">
					<image src="/static/image/my/tms.png" style="border-radius:20upx ;" mode="scaleToFill"></image>
					<view class="version">
						<text>{{ list.note }} {{ list.value }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="version_index" v-for="(item, index) in menuList" :key="index">
			<view class="version_index_list grace-bg-white" @tap="gopage(item)">
				<view class="index_listcon pad-l-mt20">{{item.title}}</view>
				<view class="index_listRicon pad-r-mt10"><text class="icon">{{item.text}}</text></view>
			</view>
		</view>

		<view class="copyright">
			<text>版权所有：福建众诚高科信息科技有限公司</text>
			<text style="display: block;margin-top: 5upx;">© 2019 TMS运输管理系统 | 闽ICP备19019071号-1</text>
		</view>
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
				list: [],
				menuList: [{
					title: "版本说明",
					target: './version',
					text: unescape("&#xe683;".replace(/&#x/g, '%u').replace(/;/g, ''))
				}, {
					title: "客服电话",
					target: '',
					text: "400-123-1234"
				}, {
					title: "意见反馈",
					target: './feedback',
					text: unescape("&#xe683;".replace(/&#x/g, '%u').replace(/;/g, ''))
				}, {
					title: "用户协议",
					target: './userprotocol',
					text: unescape("&#xe683;".replace(/&#x/g, '%u').replace(/;/g, ''))
				}]
			}
		},
		methods: {
			gopage(item) {
				if (!item.target) {
					return;
				}
				uni.navigateTo({
					url: item.target
				});
			},
			getVersionInfo() {
				uni.showLoading({
					title: '正在获取版本信息',
					mask: true
				})
				get(URL.user.getuserinfo, {})
					.then(res => {
						this.list = res.data.version;
						uni.hideLoading();
					})
			}
		},
		onLoad() {
			this.getVersionInfo();
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/style/index.scss';

	.aboutus-wrap {
		position: relative;

		.bg {
			height: 400upx;
			border-bottom: 1px solid #f5f5f5;

			.bg-info {
				font-family: PingFang-SC-Regular;
				height: 354upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;

				.logo {
					width: 150upx;
					height: 150upx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.version_index {
			.version_index_list {
				padding: 0 3%;
				border-bottom: 2upx solid #f5f5f5;
				@include text--middle(100upx) display: flex;

				.index_listicon {
					flex: 0, 0, 46upx;
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

		.copyright {
			font-family: 'Arial Normal', 'Arial';
			font-weight: 400;
			font-style: normal;
			font-size: 12px;
			color: #797979;
			width: 100%;
			align-items: center;
			text-align: center;
			position: fixed;
			bottom: 40upx;
		}
	}
</style>
