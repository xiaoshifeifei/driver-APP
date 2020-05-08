<template>
	<view class="my-car-wrap">
		<search-input :searchKey.sync="searchParams.searchKey" :searchValue.sync="searchParams.searchValue" :selectListWrap="selectListWrap"
		 @on-search="searchNow" @on-selectChange="clearSearch" />
		<view v-if="list.length" style="padding: 0 40upx">
			<view class="card" v-for="(item, index) in list" :key="index">
				<view class="row">
					<view class="col" style="width: 10%;">
						<view class="img-wrap">
							<image src="/static/image/business/price/ltlprice-image.png" mode="widthFix" />
						</view>
					</view>
					<view class="col" style="width: 85%">
						<view class="row" style="justify-content: start">
							<view class="col" style="width: 50%;">
								<text class="list-item" style="font-size: 32upx; color: #000333">{{ item.vehicleNo }}</text>
							</view>
							<view class="col" style="width: 25%">
								<view class="card-button">主驾车辆</view>
							</view>
						</view>
						<view class="row">
							<text class="list-item">长*宽*高：{{ item.vehicleLength + "厘米*" + item.vehicleWidth + "厘米*" + item.vehicleHeight + "厘米" }}</text>
						</view>
						<view class="row">
							<text class="list-item" v-if="item.type === 'H01'">车辆类型：普通货车</text>
							<text class="list-item" v-else-if="item.type === 'Q00'">车辆类型：牵引车</text>
							<text class="list-item" v-else-if="item.type === 'G01'">车辆类型：普通挂车</text>
							<text class="list-item" v-else-if="item.type === 'G03'">车辆类型：罐式挂车</text>
							<text class="list-item" v-else-if="item.type === 'G05'">车辆类型：集装箱挂车</text>
							<text class="list-item" v-else-if="item.type === 'H09'">车辆类型：仓栅式货车</text>
							<text class="list-item" v-else-if="item.type === 'H03'">车辆类型：封闭货车</text>
							<text class="list-item" v-else-if="item.type === 'H05'">车辆类型：平板货车</text>
							<text class="list-item" v-else-if="item.type === 'H06'">车辆类型：集装箱车</text>
							<text class="list-item" v-else-if="item.type === 'H07'">车辆类型：自卸货车</text>
							<text class="list-item" v-else-if="item.type === 'H08'">车辆类型：特殊结构货车</text>
							<text class="list-item" v-else-if="item.type === 'Z00'">车辆类型：专项作业车</text>
							<text class="list-item" v-else-if="item.type === 'G02'">车辆类型：厢式挂车</text>
							<text class="list-item" v-else-if="item.type === 'G07'">车辆类型：仓栅式挂车</text>
							<text class="list-item" v-else-if="item.type === 'G04'">车辆类型：平板挂车</text>
							<text class="list-item" v-else-if="item.type === 'G06'">车辆类型：自卸挂车</text>
							<text class="list-item" v-else-if="item.type === 'G09'">车辆类型：专项作业挂车</text>
							<text class="list-item" v-else-if="item.type === 'X91'">车辆类型：车辆运输车</text>
							<text class="list-item" v-else-if="item.type === 'X92'">车辆类型：车辆运输车(单排)</text>
						</view>
						<view class="row">
							<text class="list-item">核定重量：{{ item.ratedTonnage + "KG" }}</text>
						</view>
					</view>
				</view>
			</view>
			<graceLoading :loadingType="loadingType"></graceLoading>
		</view>
		<view class="not-find-data" v-else>暂无车辆</view>
	</view>
</template>

<script>
	import URL from "@/api/serverApi";
	import {
		get,
		post
	} from "@/utils/request";
	import searchInput from "@/components/search-input/search-input.vue";
	import graceLoading from "graceUI/components/graceLoading.vue";

	export default {
		components: {
			graceLoading,
			searchInput
		},
		data() {
			return {
				loadingType: 0,
				searchParams: {
					searchKey: "vehicleNo",
					searchValue: "",
					mainDriverId: "",
					pageNo: 1,
					pageSize: 20,
				},
				selectListWrap: {
					index: 0,
					selectList: [{
						label: "车牌号",
						value: "vehicleNo"
					}]
				},
				list: []
			};
		},
		onLoad() {
			this.updataList()
		},
		onPullDownRefresh() {
			this.searchParams.pageSize = 20
			this.updataList()
		},
		onReachBottom() {
			this.loadingType = 1;
			this.searchParams.pageSize += 20
			this.updataList();
			uni.hideLoading();
		},
		onLoad() {
			let userId = uni.getStorageSync('userInfo').userId
			this.searchParams.mainDriverId = userId
			this.updataList();
		},
		methods: {
			updataList() {
				uni.showLoading({
					title: '正在加载',
					mask: true,
				})
				post(URL.carrier.getall, this.searchParams).then(res => {
					this.list = res.data.list;
				})
				this.loadingType = 2;
				uni.hideLoading();
				uni.stopPullDownRefresh();
			},
			searchNow(e) {
				this.searchParams[this.searchParams.searchKey] = e
				this.updataList()
			},
			// 清除搜索框内容
			clearSearch() {
				this.searchParams[this.searchParams.searchKey] = ""
				this.searchParams.searchValue = ""
			}
		}
	};
</script>

<style lang="less">
	.my-car-wrap {
		.card {
			border-radius: 20upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0upx 0upx 36upx 0upx rgba(227, 227, 227, 0.83);
			padding: 20upx 40upx;
			margin: 20upx auto;

			.row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10upx;

				.col {
					width: 50%;
					font-size: 33upx;
					color: #000333;
					font-weight: 400;
					font-style: normal;
					margin-bottom: 10upx;

					.img-wrap {
						width: 50upx;

						image {
							width: 100%;
							margin-top: 10upx;
						}
					}
				}
			}

			&-number {
				margin-left: 60upx;
				color: #0079fe;
				font-size: 36upx;
			}

			&-button {
				color: #0079fe;
				padding: 6upx 0;
				border: 1upx solid #0079fe;
				border-radius: 50upx;
				text-align: center;
				font-size: 20upx;
			}

			.list-item {
				font-size: 27upx;
				color: #a1a1a1;
			}
		}
	}
</style>
