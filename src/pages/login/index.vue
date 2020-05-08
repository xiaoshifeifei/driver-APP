<template>
	<view class="grace-margin login-wrap" style="padding: 35upx">
		<view class="title">
			你好，欢迎登录！
		</view>
		<form @submit="loginNow" class="grace-form">
			<view class="grace-items topclass">
				<view class="grace-label" style="width: 80upx">
					<view class="icon-img-wrap">
						<image src="/static/image/login/name.png" mode="widthFix"></image>
					</view>
				</view>
				<input type="number" name="uname" class="input" v-model="form.username" style="text-align: left; margin-left: 0"
				 placeholder="请输入手机号/登录名" />
			</view>
			<view class="grace-items">
				<view class="grace-label" style="width: 80upx">
					<view class="icon-img-wrap">
						<image src="/static/image/login/lock.jpg" mode="widthFix"></image>
					</view>
				</view>
				<input v-if="isShowPwd" type="text" @focus="handleFocus" name="pw" class="input" v-model="form.passwordNew" style="text-align: left; margin-left: 0"
				 placeholder="请输入密码" />
				<input v-else type="password" name="pw" @focus="handleFocus" class="input" v-model="form.passwordNew" style="text-align: left; margin-left: 0"
				 placeholder="请输入密码" />
				<switch name="switch" :checked="isShowPwd" @change="handleChange" />
			</view>
			<button form-type="submit" type="primary" style="background:#3688FF; margin-top:30px;">登录</button>
		</form>
		<view class="grace-space-between" style="margin-top: 60upx">
			<view class="action">
				<navigator url="../register/index" hover-class="none">新用户注册</navigator>
			</view>
			<view class="action">
				<navigator url="../findpwd/index" hover-class="none">找回密码</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var graceChecker = require('graceUI/graceChecker.js');
	import URL from '@/api/serverApi';
	import {
		get,
		post
	} from '@/utils/request';
	import md5 from "utils/md5";

	export default {
		data() {
			return {
				avator: '/static/image/login/header.png',
				form: {
					// username: "18960418229" 17359132801 18559057925,
					username: "13023985365",
					passwordNew: "123456"
				},
				isShowPwd: false
			}
		},
		onShow() {
			let _this = this;
			this.handleFocus();
		},
		methods: {
			getData() {
				let _this = this;
				let platform = "";

				//获取设备唯一编码
				// #ifdef APP-PLUS
				plus.device.getInfo({
					success: function(e) {
						console.log('getDeviceInfo success: ' + JSON.stringify(e));
						_this.uuid = e.uuid;
						uni.setStorageSync('uuid', e.uuid);
					},
					fail: function(e) {
						console.log('getDeviceInfo failed: ' + JSON.stringify(e));
					}
				});
				// #endif

				uni.getSystemInfo({
					success: function(res) {
						platform = res.platform;
					}
				});
				return platform;
			},
			loginNow(e) {
				let _this = this;
				let platform = _this.getData();
				let deviceCode = uni.getStorageSync("uuid");
				if (deviceCode == "") {
					deviceCode = "123456789";
				}

				// 表单验证
				var rule = [{
					name: "uname",
					checkType: 'notnull',
					errorMsg: '请输入手机号/登录名'
				}, {
					name: 'pw',
					checkType: 'notnull',
					errorMsg: '请输入密码'
				}];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				// 验证通过
				if (checkRes) {
					uni.showLoading({
						title: '登录中',
						mask: true
					});
					let formClone = {
						userLogin: this.form.username,
						password: md5(this.form.passwordNew),
						deviceCode: deviceCode,
						platform: platform
					}
					console.log('formClone',formClone,"URL",URL.login);
					
					post(URL.login, formClone)
						.then(res => {
							uni.setStorageSync('userInfoToken', res.data.loginName);
							uni.setStorageSync('sessionId', res.sessionId);
							_this.getLoginInfo();
						})
				} else {
					uni.hideLoading();
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
				}
			},
			getLoginInfo: function() {
				get(URL.user.getuserinfo, {})
					.then(res => {
						uni.showToast({
							title: '登录成功',
							icon: 'none',
							success: () => {
								uni.setStorageSync('userInfo', res.data);

								setTimeout(() => {
									uni.switchTab({
										url: '/pages/index/index'
									});
								}, 500);
							},
							fail: () => {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								});
								uni.hideLoading();
							}
						});
					});
			},
			handleFocus() {
				// if (this.form.username !== '') {
				// 	get(URL.getAvator, { loginName: this.form.username })
				// 	.then(res => {
				// 		if (res.data != null) this.avator = res.data.photo
				// 		else this.avator = '/static/image/login/header.png'
				// 	})
				// }
			},
			handleChange(e) {
				this.isShowPwd = e.detail.value;
			}
		}
	}
</script>

<style lang="less">
	.login-wrap {
		.title {
			margin: 120upx 0 120upx 20upx;
			font-size: 60upx;
			color: #4D4D4D;
		}

		.action {
			width: 50%;
			text-align: center;
			color: #007aff;
		}

		.grace-items {
			background-color: #fff;
			border: #E4E4E4 1px solid;
			border-top: none;
		}

		.topclass {
			border-top: #E4E4E4 1px solid;
		}

		.icon-img-wrap {
			margin: 0 auto;
			margin-top: 16upx;
			width: 40upx;
			height: 40upx;

			image {
				width: 100%;
			}
		}
	}
</style>
