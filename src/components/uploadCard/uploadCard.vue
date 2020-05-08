<template>
	<view>
		<view class="grace-idcard-main">
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg">
					<view v-if="isUploadImg">
						<view class="view-img">
							<image ref="image" :src="imgUrl" mode="scaleToFill" lazy-load="false" />
						</view>
					</view>
					<view v-else>
						<view v-if="showImgUrlClone !== defaultImgUrl">
							<view class="view-img">
								<image :src="showImgUrlClone" mode="scaleToFill" lazy-load="false" />
							</view>
						</view>
						<view v-else>
							<view class="img">
								<image :src="showImgUrlClone" mode="scaleToFill" lazy-load="false" />
							</view>
							<view class="text">{{ des }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _self;
	import URL from "@/api/serverApi";
	export default {
		props: {
			des: {
				type: String,
				default: '点击上传图片'
			},
			showImgUrl: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: ''
			}
		},
		computed: {
			showImgUrlClone() {
				let _this = this;
				_this.isUploadImg = false;

				let showImgUrlClone = '';
				if (this.showImgUrl) {
					// showImgUrlClone = URL.imgBaseUrl + this.showImgUrl
					showImgUrlClone = this.showImgUrl;
				} else showImgUrlClone = this.defaultImgUrl;

				return showImgUrlClone;
			}
		},
		data() {
			return {
				isUploadImg: false,
				imgUrl: "",
				defaultImgUrl: 'https://graceui.oss-cn-beijing.aliyuncs.com/idCard/camera.png'
			}
		},
		methods: {
			selectImg: function() {
				var _self = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.imgUrl = res.tempFilePaths[0];
						_self.uploadCards()
					}
				});
			},
			uploadCards: function() {
				var _self = this
				// 因底层限制一次上传一个
				uni.showLoading({
					title: "上传中",
					mask: true
				});

				var uploadTask1 = uni.uploadFile({
					url: URL.uploadImg,
					filePath: _self.imgUrl,
					formData: {
						title: _self.type
					},
					name: "file",
					success: uploadFileRes => {
						if (!JSON.parse(uploadFileRes.data).url) {
							uni.showToast({
								title: JSON.parse(uploadFileRes.data).msg,
								icon: "none"
							});
							return
						} else {
							// 上传成功后返回服务器端保存的路径
							this.$emit('uploadSuccess', JSON.parse(uploadFileRes.data).url)
							_self.isUploadImg = true
							uni.hideLoading();
						}
					},
					fail: function(error) {
						uni.hideLoading();
						uni.showToast({
							title: "上传错误，请重新上传",
							icon: "none"
						});
					}
				});
			},
			clearFiles() {
				this.isUploadImg = false
			}
		}
	};
</script>
<style>
	view {
		font-size: 28upx;
	}

	.grace-idcard-main {
		margin: 20upx 30upx;
	}

	.grace-idcard-desc {
		line-height: 2em;
		background: #ffffff;
		padding: 20upx;
		border-radius: 10upx;
	}

	.grace-idcard-text {
		line-height: 2em;
		margin-top: 30upx;
	}

	.grace-idcard-items {
		display: flex;
		margin: 30upx 0;
		border-radius: 10upx;
		align-items: flex-start;
		justify-content: space-between;
	}

	.grace-idcard-uper-btn {
		width: 100%;
		padding-bottom: 10upx;
		border-radius: 10upx;
		text-align: center;
		border: 1px dashed #dddddd;
	}

	.grace-idcard-uper-btn .img {
		width: 100upx;
		height: 100upx;
		margin: 0 auto;
		margin-top: 30upx;
	}

	.grace-idcard-uper-btn .img image {
		width: 100upx;
		height: 100upx;
	}

	.grace-idcard-uper-btn .view-img {
		width: 100%;
	}

	.grace-idcard-uper-btn .view-img image {
		width: 100%;
		height: 200upx;
	}

	.grace-idcard-uper-btn .text {
		width: 100%;
		margin-top: 10upx;
		text-align: center;
		line-height: 2em;
	}
</style>
