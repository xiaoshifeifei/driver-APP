<template>
	<view class="change-user-info-wrap">
		<view style="border-bottom:20px solid #F5F5F5;"></view>
		<view>
			<view class="grace-form">
				<form @submit="formSubmit">
					<view class="grace-items" @tap="handleMore(true)">
						<view class="grace-label items" style="line-height:110upx;">头像</view>
						<view class="head_icon">
							<image :src="imgUrl" @change="inputUrl" v-model="imgUrl" name="img" mode="scaleToFill"></image>
							<text class="arrow_down">&#xe683;</text>
						</view>
					</view>

					<view class="grace-items">
						<view class="grace-label items" style="line-height:100upx;">用户账号</view>
						<input type="text" disabled="true" v-model="loginName" class="input" />
					</view>
					<view class="grace-items">
						<view class="grace-label items" style="line-height:95upx;">姓名</view>
						<input type="text" @input="inputName" name="uName" v-model="username" placeholder="请输入姓名" class="input" />
					</view>
					<view class="grace-items">
						<view class="grace-label items">性别</view>
						<view class="grace-form-r">
							<picker @change="bindGenderChange" :value="index" :range="gender" range-key="lable" name="sex">
								<text>{{ gender[index].lable }}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label items" style="line-height:95upx;">身份证号</view>
						<input type="number" name="cardNo" v-model="idcard" class="input" />
					</view>
					<view style="padding:22upx 20upx;"><button formType="submit" type="primary" style="width:100%;">确认</button></view>
				</form>
			</view>
		</view>

		<uniPopup @touchmove.stop.prevent="moveHandle" :padding="'0'" :show="moreShow" type="bottom" @hidePopup="handleMore(false)">
			<view class="popup-item border" @tap="Video_pictures">拍照</view>
			<view class="popup-item border" style="border-top: 2upx solid #F5F5F5; " @tap="choose_photo">相册</view>
			<view class="popup-item border-none" @click="handleMore(false)">取消</view>
		</uniPopup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import URL from '@/api/serverApi';
	import {
		get,
		post
	} from '@/utils/request';
	var graceChecker = require('../../../graceUI/graceChecker.js');

	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				imgUrl: '../../../static/image/my/inithead.png',
				loginName: "",
				username: "",
				sexual: '',
				idcard: "",

				id: '',
				oldImgUrl: '',
				gender: [{
						value: '',
						lable: '请选择'
					},
					{
						value: 'MALE',
						lable: '男'
					},
					{
						value: 'FEMALE',
						lable: '女'
					}
				],
				index: 0,
				moreShow: false,
				loginInfo: {}
			}
		},
		methods: {
			formSubmit(e) {
				if (this.sexual == 0) {
					uni.showToast({
						title: '请选择性别',
						icon: 'none'
					});
					return;
				}
				//定义表单规则
				let _self = this;
				var rule = [{
						name: 'uName',
						checkType: 'notnull',
						checkRule: '',
						errorMsg: '请输入姓名'
					},
					{
						name: 'sex',
						checkType: 'notnull',
						checkRule: '',
						errorMsg: '请输入选择性别'
					},
					{
						name: 'cardNo',
						checkType: 'reg',
						checkRule: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
						errorMsg: '请输入正确的身份证号'
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showLoading({
						title: '正在修改',
						mask: true
					})
					let url = "";
					if (_self.imgUrl.indexOf("static") != -1) {
						url = "";
					} else {
						url = _self.imgUrl;
					}
					
					let sexa = 0;
					if(_self.sexual == "MALE"){
						sexa = 0;
					}else if(_self.sexual == "FEMALE"){
						sexa = 1;
					}else{
						sexa = 2;
					}
					post(URL.user.edituserinfo, {
							userId: _self.id,
							idNo: _self.idcard,
							userName: _self.username,
							sex: sexa,
							photo: url
						})
						.then(res => {
							if (res.code === 200) {
								uni.showToast({
									title: '操作成功',
									icon: 'success',
									success: () => {
										setTimeout(() => {
											uni.removeStorageSync('userInfo');
											uni.switchTab({
												url: `/pages/my/index`
											});
											uni.hideLoading();
										}, 500);
									}
								});
							}
						})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
				}
			},
			handleMore(flag) {
				this.moreShow = flag;
			},
			inputUrl(e) {
				this.imgUrl = e.detail.value;
			},
			inputName(e) {
				this.username = e.detail.value;
			},
			bindGenderChange(e) {
				this.index = e.detail.value;

				this.gender.forEach(item => {
					if (this.gender[this.index].value === item.value) {
						this.sexual = item.value;
					}
				});
			},

			getLoginInfo() {
				uni.showLoading({
					title: '正在加载',
					mask: true
				})
				get(URL.user.getuserinfo, {})
					.then(res => {
						console.log("个人信息",res.data);
						
						uni.setStorageSync('userInfo', res.data);
						this.loginInfo = uni.getStorageSync('userInfo');
						this.id = this.loginInfo.userId;
						this.imgUrl = this.loginInfo.photo ? this.loginInfo.photo : this.imgUrl;
						this.oldImgUrl = this.imgUrl;
						this.loginName = this.loginInfo.loginName;
						this.username = this.loginInfo.userName;
						this.sexual = this.loginInfo.sex;
						this.idcard = this.loginInfo.idNo;
						if (this.loginInfo.sex == 0) {
							this.index = 1;
							this.sexual = 'MALE'
						} else if (this.loginInfo.sex == 1) {
							this.index = 2;
							this.sexual = 'FEMALE'
						}
						uni.hideLoading()
					})
			},
			// 相册 或者视频
			choose_photo() {
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						uni.showLoading({
							title: '图片上传中'
						});
						_this.imgUrl = res.tempFilePaths[0];
						uni.uploadFile({
							url: URL.uploadImg,
							filePath: _this.imgUrl,
							name: 'file',
							formData: {
								title: 'headerImg'
							},
							success: uploadFileRes => {
								if (!JSON.parse(uploadFileRes.data).url) {
									_this.imgUrl = _this.oldImgUrl
									_this.moreShow = false;
									uni.showToast({
										title: JSON.parse(uploadFileRes.data).msg,
										icon: "none"
									});
									uni.hideLoading();
									return
								} else {
									// 上传成功后返回服务器端保存的路径
									_this.$emit('uploadSuccess');
									_this.imgUrl = JSON.parse(uploadFileRes.data).url;
									_this.moreShow = false;
									uni.showToast({
										title: '上传头像成功',
										icon: 'none'
									});
									uni.hideLoading();
								}
							},
							fail: function(error) {
								_this.imgUrl = ''
								uni.hideLoading();
								uni.showToast({
									title: '上传错误，请重新上传',
									icon: 'none'
								});
							}
						});
					},
					fail: err => {}
				});
			},
			// 拍照
			Video_pictures() {
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					formData: {
						title: 'headerImg'
					},
					success: res => {
						uni.showLoading({
							title: '图片上传中'
						});
						_this.imgUrl = res.tempFilePaths[0];
						uni.uploadFile({
							url: URL.uploadImg,
							filePath: _this.imgUrl,
							name: 'file',
							success: uploadFileRes => {
								if (uploadFileRes.statusCode !== 200) {
									uni.showToast({
										title: '上传头像失败',
										icon: 'none'
									});
									uni.hideLoading();
									return;
								} else {
									// 上传成功后返回服务器端保存的路径
									_this.$emit('uploadSuccess');
									_this.imgUrl = JSON.parse(uploadFileRes.data).url;
									_this.moreShow = false;
									uni.hideLoading();
									uni.showToast({
										title: '上传头像成功',
										icon: 'none'
									});
								}
							},
							fail: function(error) {
								_this.imgUrl = ''
								uni.hideLoading();
								uni.showToast({
									title: '上传错误，请重新上传',
									icon: 'none'
								});
							}
						});
					},
					fail: err => {}
				});
			},
		},
		onHide() {
			this.handleMore(false);
		},
		onLoad() {
			this.getLoginInfo();
		},
		onShow() {
			if (uni.getStorageSync('userInfo')) {
				this.loginInfo = uni.getStorageSync('userInfo');
				this.id = this.loginInfo.userId;
				this.imgUrl = this.loginInfo.photo ? this.loginInfo.photo : this.imgUrl;
				this.loginName = this.loginInfo.loginName;
				this.username = this.loginInfo.userName;
				this.sexual = this.loginInfo.sex;
				this.idcard = this.loginInfo.idNo;
				if (this.loginInfo.sex == 0) {
					this.index = 1;
				} else if (this.loginInfo.sex == 1) {
					this.index = 2;
				}
			} else {
				this.getLoginInfo();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/index.scss';

	.change-user-info-wrap {
		.items {
			margin: 0 20upx;
			// line-height: 100upx;
			height: 100upx;
		}

		.grace-items {
			background-color: #fff;

			.head_icon {
				line-height: 100upx;
				height: 100upx;
				margin: 0 10upx;

				image {
					width: 100upx;
					height: 100upx;
				}

				.arrow_down {
					font-family: iconfont;
					margin-left: 10upx;
					display: inline-block;
					float: right;
				}
			}
		}

		.popup-item {
			height: 100upx;
			line-height: 100upx;
			background: #fff;

			&:nth-last-of-type(1) {
				margin-top: 10upx;
			}
		}
	}
</style>