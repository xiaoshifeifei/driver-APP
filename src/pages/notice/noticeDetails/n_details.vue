<template>
	<view class="n_detail-wrap">
		<view v-if="list.totalCount > 0">
			<view v-for="(item, index) in list.list" :key="index">
				<text class="notice_time">{{ item.mesTime }}</text>
				<view class="notice">
					<view class="notice-item">
						<view class="content" @tap="gotopage(item, titleTmp)">
							<view class="left">
								<text class="title">{{ titleTmp ? titleTmp : '通知' }}</text>
								<view class="introduce">
									<view class="text_left">
										<text>{{ item.message ? item.message : '' }}</text>
									</view>
									<view class="look">(点击查看)</view>
								</view>
							</view>
							<view class="right">
								<view class="dots_blue" style="text-align: left;margin-right: 3px;" v-if="item.isRead == false"></view>
								<text class="arrow_down" style=" font-family: iconfont;">&#xe683;</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<graceLoading :loadingType="loadingType"></graceLoading>
		</view>
		<view v-else><text style="display: block;text-align: center;margin: 50% 0;">暂无消息</text></view>
	</view>
</template>

<script>
	import URL from '@/api/serverApi';
	import {
		get,
		post
	} from '@/utils/request';
	import graceLoading from 'graceUI/components/graceLoading.vue';

	export default {
		components: {
			graceLoading
		},
		data() {
			return {
				loadingType: 0,
				titleTmp: '',
				msgtype: '',
				list: [],
				searchParams: {
					pageNo: 1,
					pageSize: 20,
					type: ''
				}
			};
		},
		methods: {
			gotopage(item, titleTmp) {
				uni.navigateTo({
					url: `/pages/notice/noticeDetails/n_particulars?type=${item.type}&id=${item.id}&tmp=${titleTmp}&message=${item.message}`
				});
			},
			getNotice(type) {
				uni.showLoading({
					title: '正在加载',
					mask: true
				});
				var _this = this;
				this.searchParams.type = type;
				this.loadingType = 1;
				post(URL.notice.getNoticeDetail, this.searchParams)
					.then(res => {
						_this.list = res.data;
						this.loadingType = 2;
						uni.hideLoading()
						uni.stopPullDownRefresh();
					})
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.tmp
			});
			this.msgtype = options.type;
			//this.getNotice(this.msgtype);
			this.titleTmp = options.tmp;
		},
		onShow() {
			//this.getNotice(this.msgtype);
		},
		onPullDownRefresh() {
			this.searchParams.pageSize = 20;
			this.getNotice(this.msgtype);
		},
		onReachBottom() {
			this.loadingType = 1;
			this.searchParams.pageSize += 20;
			this.getNotice(this.msgtype);
			uni.hideLoading()
		},
		onNavigationBarButtonTap() {
			var _this = this;
			uni.showModal({
				title: '提示',
				content: '是否要全部已读？',
				success: function(res) {
					let obj = {
						type: _this.msgtype
					};
					if (res.confirm) {
						post(URL.notice.allRead, obj)
							.then(res => {
								uni.showToast({
									icon: 'none',
									title: '操作成功',
									success() {
										setTimeout(() => {
											_this.getNotice(_this.msgtype);
										}, 500);
									}
								});
							})
					}
				}
			});
		}
	};
</script>

<style lang="scss" scoped>
	.n_detail-wrap {
		.notice_time {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80upx;
			font-size: 26upx;
			color: #7d7d7d;
			padding: 20upx 0 0 0;
		}

		.notice {
			.notice-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 10upx 0;

				.content {
					border: 1px solid #f5f5f5;
					border-radius: 20upx;
					box-shadow: 5upx 5upx 10upx #f5f5f5;
					width: 85%;
					padding: 5% 0 5% 5%;
					// background-color: #f5f5f5;
					display: flex;

					.left {
						margin: auto 0;
						width: 90%;

						.title {
							align-items: center;
							height: 90upx;
							font-size: 32upx;
							color: #303133;
						}

						.introduce {
							margin: auto 0;
							padding-top: 16upx;
							font-size: 28upx;
							line-height: 38upx;
							font-family: '微软雅黑 Light', '微软雅黑 Regular', 微软雅黑;
							font-weight: 250;
							font-style: normal;
							color: rgb(153, 153, 153);
							display: flex;

							.text_left {
								width: 360upx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.look {
								font-size: 28upx;
								color: #606266;
								line-height: 38upx;
								font-family: '微软雅黑 Light', '微软雅黑 Regular', 微软雅黑;
								font-weight: 250;
								font-style: normal;
								color: rgb(153, 153, 153);
							}
						}
					}

					.right {
						align-items: center;
						justify-content: space-between;
						line-height: normal;
						margin: auto 2%;
						display: flex;

						.dots_blue {
							background: rgb(244, 53, 48);
							width: 16upx;
							height: 16upx;
							border-radius: 8upx;
							display: inline-block;
							vertical-align: middle;
						}
					}
				}
			}
		}
	}
</style>
