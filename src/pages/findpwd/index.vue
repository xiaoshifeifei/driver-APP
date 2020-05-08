<template>
	<view class="grace-margin find-pwd-wrap">
		<view class="grace-nowrap grace-space-between" style="border: 1px solid #e4e4e4; padding: 20upx 0">
			<view class="tab" :class="{ 'active-tab': activeTab === 1 }">
				1.验证手机号码
			</view>
			<view class="tab" :class="{ 'active-tab': activeTab === 2 }">
				2.设置新密码
			</view>
		</view>
		<view style="padding: 0 35upx">
			<form @submit="nextStep" class="grace-form" v-if="activeTab === 1">
				<view class="grace-items">
					<view class="grace-label" style="width: 80upx">
						<view class="icon-img-wrap">
							<image src="/static/image/login/mobile.jpg" mode="widthFix">
							</image>
						</view>
					</view>
					<input type="number" name="pn" class="input" v-model="form.loginName" style="text-align: left; margin-left: 0"
					 placeholder="请输入注册手机号码" />
				</view>
				<view class="grace-items">
					<view class="grace-label" style="width: 80upx">
						<view class="icon-img-wrap">
							<image src="/static/image/login/lock.jpg" mode="widthFix"></image>
						</view>
					</view>
					<input type="number" class="input" name="validCode" v-model="form.validCode" style="text-align: left; margin-left: 0"
					 placeholder="请输入短信验证码" />
					<view style="width:28%; margin-right:2%; padding-top: 7px; flex-shrink:0;">
						<button type="primary" class="login-sendmsg-btn" @tap='getVCode'>{{vcodeBtnName}}</button>
					</view>
				</view>
				<button form-type='submit' type='primary' style='margin-top: 40upx'>
					下一步
				</button>
			</form>
			<form @submit="setPwd" class="grace-form" v-else-if="activeTab === 2">
				<view class="grace-items">
					<view class="grace-label" style="width: 80upx">
						<view class="icon-img-wrap">
							<image src="/static/image/login/lock.jpg" mode="widthFix">
							</image>
						</view>
					</view>
					<input type="password" name="pwd" class="input" v-model="form.password" style="text-align: left; margin-left: 0"
					 placeholder="请设置6-20位的登录密码" />
				</view>
				<view class="grace-items">
					<view class="grace-label" style="width: 80upx">
						<view class="icon-img-wrap">
							<image src="/static/image/login/lock.jpg" mode="widthFix">
							</image>
						</view>
					</view>
					<input type="password" name="pwdConfirm" v-model="form.rePassword" class="input" style="text-align: left; margin-left: 0"
					 placeholder="请再次确认登录密码" />
				</view>
				<button form-type='submit' type='primary' style='margin-top: 40upx'>
					提交
				</button>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("graceUI/graceChecker.js");
	import URL from "@/api/serverApi";
	import md5 from "utils/md5";
	import {
		get,
		post
	} from "@/utils/request";

	export default {
		data() {
			return {
				vcodeBtnName: "发送验证码",
				countNum: 60,
				countDownTimer: null,
				activeTab: 1,
				form: {
					loginName: '',
					validCode: '',
					password: '',
					rePassword: ''
				}
			}
		},
		methods: {
			nextStep(e) {
				// 表单验证
				var rule = [{
						name: "pn",
						checkType: "phoneno",
						errorMsg: "请填写正确的手机号"
					},
					{
						name: "validCode",
						checkType: "string",
						checkRule: "4,6",
						errorMsg: "请正确填写短信验证码"
					}
				];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				// 验证通过
				if (checkRes) {
					uni.showLoading({
						title: '正在验证',
						mask: true
					})
					post(URL.findpwd.checkcode, this.form)
						.then(res => {
							uni.showToast({
								title: '手机验证成功',
								icon: "none"
							});
							this.activeTab = 2;
							uni.hideLoading();
							
						})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			getVCode() {
				// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
				if (this.vcodeBtnName != '发送验证码' && this.vcodeBtnName != '重新发送') {
					return;
				}
				var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
				if (!myreg.test(this.form.loginName)) {
					uni.showToast({
						title: '请正确填写手机号码',
						icon: "none"
					});
					return false;
				}

				uni.showToast({
					title: '短信已发送，请注意查收',
					icon: 'none'
				});
				this.vcodeBtnName = '发送中...';
				this.countNum = 60;
				this.countDownTimer = setInterval(
					function() {
						this.countDown();
					}.bind(this),
					1000
				);
				this.sendCode();
			},
			sendCode() {
				post(URL.register.getsendsmscode, {
					phone: this.form.loginName
				}).catch(error => {
					uni.hideToast();
				});
			},
			countDown() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = "重新发送";
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + '秒重发';
			},
			setPwd(e) {
				// 表单验证
				var rule = [{
						name: "pwd",
						checkType: "string",
						checkRule: "6,20",
						errorMsg: "请正确填写登陆密码"
					},
					{
						name: "pwdConfirm",
						checkType: "same",
						checkRule: this.form.password,
						errorMsg: "两次密码不一致"
					},
				];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				// 验证通过
				if (checkRes) {
					uni.showLoading({
						title: '正在修改',
						mask: true
					})
					post(URL.findpwd.setpwd, {
						loginName: this.form.loginName,
						password: md5(this.form.password),
						rePassword: md5(this.form.rePassword)
					}).then(res => {
						uni.showToast({
							title: '修改密码成功',
							icon: "none"
						});
						setTimeout(() => {
							uni.navigateTo({
								url: '../login/index'
							})
						}, 500);
						uni.hideLoading();
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style lang="less">
	.find-pwd-wrap {
		.tab {
			width: 50%;
			text-align: center;
			color: #999;
		}

		.active-tab {
			color: #0079FE;
		}

		.login-sendmsg-btn {
			border: 1px solid #3688FF !important;
			background: none !important;
			color: #3688FF !important;
			width: 100%;
			height: 32px;
			line-height: 32px;
			font-size: 12px !important;
		}

		.grace-items {
			background-color: #fff
		}

		.icon-img-wrap {
			margin: 0 auto;
			margin-top: 16upx;
			width: 40upx;
			height: 40upx;

			image {
				width: 100%
			}
		}
	}
</style>
