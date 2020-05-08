<template>
	<view>
		<view style="text-align:center;width:auto;margin: 50% auto;">
			<!-- <image src="../../../static/image/business/null.png" style="width: 400upx;height: 400upx;" mode="scaleToFill"></image> -->
			<text style="display: block;text-align: center;">消息内容:{{ list.message }}</text>
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
				list: {}
			};
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.tmp
			});
			this.list = options;
			this.handleRead(this.list.id);
		},
		methods: {
			handleRead(val) {
				var _this = this;
				let obj = {
					id: val
				};
				get(URL.notice.singleDetail, obj)
			}
		}
	};
</script>

<style></style>
