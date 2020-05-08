<template>
	<view>
		<view class="notice_item">
			<view class="notice_list grace-bg-white">
				<view class="header_ico"><image src="../../static/image/msg/n_system.png" mode="scaleToFill"></image></view>
				<view class="list_right" @tap="gopage('系统通知', 0)">
					<view class="list_l"><text>系统通知</text></view>
					<view class="list_r"><uniBadge type="error" size="small" :max="99" :text="sysBadge"></uniBadge></view>
				</view>
			</view>
			<view class="notice_list grace-bg-white">
				<view class="header_ico"><image src="../../static/image/msg/n_enquiry.png" mode="scaleToFill"></image></view>
				<view class="list_right" @tap="gopage('询价通知', 1)">
					<view class="list_l"><text>询价通知</text></view>
					<view class="list_r"><uniBadge type="error" size="small" :max="99" :text="enquiryBadge"></uniBadge></view>
				</view>
			</view>
			<view class="notice_list grace-bg-white">
				<view class="header_ico"><image src="../../static/image/msg/n_bid.png" mode="scaleToFill"></image></view>
				<view class="list_right" @tap="gopage('竞价通知', 2)">
					<view class="list_l"><text>竞价通知</text></view>
					<view class="list_r"><uniBadge type="error" size="small" :max="99" :text="bidBadge"></uniBadge></view>
				</view>
			</view>
			<view class="notice_list grace-bg-white">
				<view class="header_ico"><image src="../../static/image/msg/n_order.png" mode="scaleToFill"></image></view>
				<view class="list_right" @tap="gopage('订单通知', 3)">
					<view class="list_l"><text>订单通知</text></view>
					<view class="list_r"><uniBadge type="error" size="small" :max="99" :text="orderBadge"></uniBadge></view>
				</view>
			</view>
			<view class="notice_list grace-bg-white">
				<view class="header_ico"><image src="../../static/image/msg/n_dispatch.png" mode="scaleToFill"></image></view>
				<view class="list_right" @tap="gopage('调度通知', 4)">
					<view class="list_l"><text>调度通知</text></view>
					<view class="list_r"><uniBadge type="error" size="small" :max="99" :text="dispatchBadge"></uniBadge></view>
				</view>
			</view>
			<view class="notice_list grace-bg-white">
				<view class="header_ico"><image src="../../static/image/msg/n_fee.png" mode="scaleToFill"></image></view>
				<view class="list_right" @tap="gopage('运费通知', 5)">
					<view class="list_l"><text>运费通知</text></view>
					<view class="list_r"><uniBadge type="error" size="small" :max="99" :text="feeBadge"></uniBadge></view>
				</view>
			</view>
			<view class="notice_list grace-bg-white">
				<view class="header_ico"><image src="../../static/image/msg/n_oilcard.png" mode="scaleToFill"></image></view>
				<view class="list_right" @tap="gopage('油卡通知', 6)">
					<view class="list_l"><text>油卡通知</text></view>
					<view class="list_r"><uniBadge type="error" size="small" :max="99" :text="oilcardBadge"></uniBadge></view>
				</view>
			</view>
			<view class="notice_list grace-bg-white">
				<view class="header_ico"><image src="../../static/image/msg/n_error.png" mode="scaleToFill"></image></view>
				<view class="list_right" @tap="gopage('异常通知', 7)">
					<view class="list_l"><text>异常通知</text></view>
					<view class="list_r"><uniBadge type="error" size="small" :max="99" :text="errorBadge"></uniBadge></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import uniBadge from '@/components/uni-badge/uni-badge.vue';
import URL from '@/api/serverApi';
import { get, post } from '@/utils/request';
export default {
	data() {
		return {
			list: {},
			sysBadge: '',
			enquiryBadge: '',
			bidBadge: '',
			orderBadge: '',
			dispatchBadge: '',
			feeBadge: '',
			oilcardBadge: '',
			errorBadge: '',
			total: ''
		};
	},
	components: {
		uniBadge
	},

	onLoad() {
		//this.handleGetNotice();
	},
	onShow() {
		//this.handleGetNotice();
		uni.setStorageSync('tasktype', 0);
	},
	methods: {
		handleGetNotice() {
			this.sysBadge = '';
			this.enquiryBadge = '';
			this.bidBadge = '';
			this.orderBadge = '';
			this.dispatchBadge = '';
			this.feeBadge = '';
			this.oilcardBadge = '';
			this.errorBadge = '';
			this.total = '';
			var _this = this;
			let obj = {};
			post(URL.notice.getNotice, obj)
				.then(res => {
					_this.list = res.data;
					_this.list.forEach(item => {
						if (item.TOTLE) {
							_this.total = item.TOTLE;
						} else {
							_this.total = '';
						}

						if (item.TYPE == 0) {
							_this.sysBadge = item.NUM;
						} else if (item.TYPE == 1) {
							_this.enquiryBadge = item.NUM;
						} else if (item.TYPE == 2) {
							_this.bidBadge = item.NUM;
						} else if (item.TYPE == 3) {
							_this.orderBadge = item.NUM;
						} else if (item.TYPE == 4) {
							_this.dispatchBadge = item.NUM;
						} else if (item.TYPE == 5) {
							_this.feeBadge = item.NUM;
						} else if (item.TYPE == 6) {
							_this.oilcardBadge = item.NUM;
						} else if (item.TYPE == 7) {
							_this.errorBadge = item.NUM;
						}
					});
					if (_this.total) {
						uni.setTabBarBadge({
							index: 2,
							text: _this.total.toString()
						});
					} else {
						uni.removeTabBarBadge({
							index: 2
						});
					}
				})
		},
		gopage(tmp, type) {
			uni.navigateTo({
				url: `/pages/notice/noticeDetails/n_details?tmp=${tmp}&type=${type}`
			});
		}
	}
};
</script>
<style scoped lang="scss">
.notice_item {
	position: relative;
	.notice_list {
		padding: 0 5%;
		// border-bottom: 2upx solid #f5f5f5;
		display: flex;
		text-align: center;

		// @include text--middle(100upx) display: flex;
		.header_ico {
			margin: 5% 0;
			width: 50upx;
			height: 50upx;
			vertical-align: middle;
			// flex: initial;

			image {
				width: 100%;
				height: 100%;
				border-radius: 10%;
			}
		}

		.list_right {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 3%;
			border-bottom: 2upx solid #f5f5f5;
			.list_l {
				text-align: left;
				font-size: 17px;
				font-family: PingFang-SC-Medium;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
			}

			.list_r {
				text-align: right;
			}
		}
	}
}
</style>
