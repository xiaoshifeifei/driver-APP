<template>
	<view class="user-team-manage-wrap">
		<view class="my_index">
			<template v-for="(item, index) in list">
				<view class="my_index_list grace-bg-white" :key="index" @tap="gopage(item.address)" v-if="item.isShow">
					<!-- 原始图标 -->
					<view class="index_listicon pad-l-mt10">
						<image :src="item.imgUrl" mode="scaleToFill" class="img_ico"></image>
					</view>
					<view class="index_listcon pad-l-mt20">{{ item.title }}</view>
					<view class="index_listRicon pad-r-mt10">
						<text class="icon">&#xe683;</text>
					</view>
				</view>
			</template>
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
				list: [{
					imgUrl: "/static/image/my/team.png",
					address: "/pages/my/group/grouplist",
					title: '申请团队',
					isShow: true
				}, {
					imgUrl: "/static/image/my/team.png",
					address: "/pages/my/group/companylist",
					title: '企业信息',
					isShow: false
				}]
			};
		},
		onShow() {
			post(URL.group.mycampanys, {})
				.then(res => {
					if (res.data.length != 0) {
						this.list.forEach(item => {
							if (item.title == '企业信息') {
								item.isShow = true
							}
						});
					} else {
						this.list.forEach(item => {
							if (item.title == '企业信息') {
								item.isShow = false
							}
						});
					}
				})
		},
		methods: {
			gopage(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/style/index.scss";

	.user-team-manage-wrap {
		.headmargin {
			height: var(--status-bar-height)
		}

		.my_header {
			@include size(100%, 300upx);

			.my_header_seticon {
				@include font-right(36upx, 20upx);
				padding-top: 20upx;
			}

			.my_header_index {
				display: flex;

				.my_tipiconbox {
					@include size(98upx, 98upx);
					border-radius: 98upx;
					@include text--middle(98upx) text-align: center;
					flex: 0, 0, 98upx;
				}

				.my_pbox {
					text-align: left;
					flex: 1;

					.my_pboxT {
						display: block;
					}

					.my_pboxB {
						display: block;
					}
				}

			}

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

	}
</style>
