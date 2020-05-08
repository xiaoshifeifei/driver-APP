<template>
	<view class="company-info-wrap">
		<view class="card" v-for="(item, i) in companyList" :key="item.key">
			<view class="center">
				<view class="first">
					<view class="num">企业名称：</view>
					<view class="num1">{{ item.name}}</view>
				</view>
				<view class="first">
					<view class="num">营业执照号：</view>
					<view class="num1">{{ item.businessLicense }}</view>
				</view>
				<view class="first">
					<view class="num">组织机构代码：</view>
					<view class="num1">{{ item.organizationCode }}</view>
				</view>
				<view class="first">
					<view class="num">联系人姓名：</view>
					<view class="num1">{{ item.contacts }}</view>
				</view>
				<view class="first">
					<view class="num">联系人电话：</view>
					<view class="num1">{{ item.contactsTel }}</view>
				</view>

				<view class="first">
					<view class="num">社会统一信用代码：</view>
					<view class="num1">{{ item.socialUnifiedCode }}</view>
				</view>
				<view class="first">
					<view class="num">地址名称：</view>
					<view class="num1">{{ item.addressName }}</view>
				</view>
				<view class="first">
					<view class="num">详细地址：</view>
					<view class="num1">{{ item.address }}</view>
				</view>
			</view>
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
				companyList:[]
			}
		},
		methods: {},
		onShow() {
			post(URL.group.mycampanys, {})
				.then(res => {
					if (res.data != null) {
						this.companyList = res.data;
					}
				})
		}
	}
</script>

<style lang="scss">
	@import "@/style/index.scss";

	.company-info-wrap {
		width: 90%;
		margin: 0 auto;

		.card {
			margin: 0 auto;
			background-color: #fff;
			width: 100%;
			border: #ececec 1upx solid;
			border-radius: 20upx;
			margin-top: 20upx;
			margin-bottom: 20upx;

			.center {
				width: 90%;
				overflow: hidden;
				margin: 20upx;

				.first {
					margin: 10upx 0;
					display: flex;

					image {
						@include size(55upx, 55upx);
					}

					.num {
						font-size: 30upx;
						margin-top: 10upx;
						margin-left: 20upx;
					}

					.num1 {
						font-size: 30upx;
						margin-top: 10upx;
					}
				}

				.second {
					display: flex;
					margin: 15upx 0;

					.num {
						font-size: 30upx;
						margin-top: 10upx;
						margin-left: 75upx;
					}

					.num1 {
						width: 60%;
						font-size: 30upx;
						margin-top: 10upx;
					}
				}

				.row {
					display: flex;
					justify-content: space-around;
					margin: 20upx 0;

					.col {
						width: 50%;
						text-align: center;

						button {
							width: 200upx;
							border-radius: 50upx;
						}
					}
				}
			}
		}
	}
</style>
