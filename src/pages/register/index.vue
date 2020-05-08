<template>
	<view class="grace-margin register-wrap" style="padding: 35upx">
		<view style="margin-top:20px; margin-bottom:20px;" class="grace-center">
			<image src="/static/image/login/header.png" style="width:200upx; height:200upx; border-radius:8px;"></image>
		</view>
		<form @submit="loginNow" class="grace-form">
			<view class="grace-items topclass">
				<view class="grace-label" style="width: 80upx">
					<view class="icon-img-wrap">
						<image src="/static/image/login/mobile.jpg" mode="widthFix"></image>
					</view>
				</view>
				<input type="number" name="loginName" class="input" maxlength="11" v-model="form.loginName" style="text-align: left; margin-left: 0"
				 placeholder="请输入注册手机号码" />
			</view>
			<view class="grace-items">
				<view class="grace-label" style="width: 80upx">
					<view class="icon-img-wrap">
						<image src="/static/image/login/message.jpg" mode="widthFix"></image>
					</view>
				</view>
				<input type="number" class="input" name="validCode" v-model="form.validCode" style="text-align: left; margin-left: 0"
				 placeholder="请输入短信验证码" />
				<view style="width:28%; margin-right:2%; padding-top: 7px; flex-shrink:0;">
					<button type="primary" class="login-sendmsg-btn" @tap="getVCode">{{ vcodeBtnName }}</button>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label" style="width: 80upx">
					<view class="icon-img-wrap">
						<image src="/static/image/login/lock.jpg" mode="widthFix"></image>
					</view>
				</view>
				<input type="password" name="pwd" class="input" v-model="form.password" style="text-align: left; margin-left: 0"
				 placeholder="请设置6-20位的登录密码" />
			</view>
			<view class="grace-items">
				<view class="grace-label" style="width: 80upx">
					<view class="icon-img-wrap">
						<image src="/static/image/login/lock.jpg" mode="widthFix"></image>
					</view>
				</view>
				<input type="password" name="rePassword" v-model="form.rePassword" class="input" style="text-align: left; margin-left: 0"
				 placeholder="请再次确认登录密码" />
			</view>
			<view class="grace-items">
				<view class="grace-label" style="width: 80upx">
					<view class="icon-img-wrap">
						<image src="/static/image/login/name.png" mode="widthFix"></image>
					</view>
				</view>
				<input type="text" name="userName" v-model="form.userName" class="input" style="text-align: left; margin-left: 0"
				 placeholder="请输入您的真实姓名" />
			</view>
			<view class="grace-items">
				<view class="grace-label" style="width: 80upx">
					<view class="icon-img-wrap">
						<image src="/static/image/login/idCard.png" mode="widthFix"></image>
					</view>
				</view>
				<input type="text" name="idNo" v-model="form.idNo" class="input" style="text-align: left; margin-left: 0"
				 placeholder="请输入您的身份证号码" />
			</view>
			<view style="background: none;">
				<view class="grace-label-x" style="margin-left: 8upx">
					<checkbox-group name="protocol">
						<label>
							<checkbox value="1">
								同意
								<navigator url="./protocol" hover-class="none" style="color: #0079FE; float: right">《用户服务协议》</navigator>
							</checkbox>
						</label>
					</checkbox-group>
				</view>
			</view>
			<button form-type="submit" type="primary" style="margin-top:30px;">注册</button>
		</form>
		<navigator url="../login/index">
			<view style="margin-top:20upx; text-align:center; line-height:50upx; color: #0079F1;">已有账户，立即登录</view>
		</navigator>
	</view>
</template>

<script>
	var graceChecker = require('../../graceUI/graceChecker.js');
	import URL from '@/api/serverApi';
	import {
		get,
		post
	} from '@/utils/request';
	import md5 from "utils/md5";

	export default {
		data() {
			return {
				form: {
					loginName: "",
					validCode: "",
					password: "",
					rePassword: "",
					userName: "",
					idNo: ""
				},
				vcodeBtnName: "发送验证码",
				countNum: 60,
				countDownTimer: null
			}
		},
		methods: {
			loginNow(e) {
				// 表单验证
				var rule = [{
						name: 'loginName',
						checkType: 'phoneno',
						errorMsg: '请填写正确的手机号'
					},
					{
						name: 'validCode',
						checkType: 'string',
						checkRule: '4,6',
						errorMsg: '请正确填写短信验证码'
					},
					{
						name: 'pwd',
						checkType: 'string',
						checkRule: '6,20',
						errorMsg: '请正确填写6到20位的登陆密码'
					},
					{
						name: 'rePassword',
						checkType: 'same',
						checkRule: this.form.password,
						errorMsg: '两次密码不一致'
					},
					{
						name: 'userName',
						checkType: 'notnull',
						errorMsg: '请输入您的真实姓名'
					},
					{
						name: 'idNo',
						checkType: 'reg',
						checkRule: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
						errorMsg: '请输入正确的身份证号'
					},
					{
						name: 'protocol',
						checkType: 'notnull',
						checkRule: '',
						errorMsg: '请勾选用户协议'
					}
				];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				
				// 验证通过
				if (checkRes) {
					uni.showLoading({
						title: '正在注册',
						mask: true
					})
					let formClone = {
						loginName: this.form.loginName,
						validCode: this.form.validCode,
						password: md5(this.form.password),
						rePassword: md5(this.form.rePassword),
						userName: this.form.userName,
						idNo: this.form.idNo
					}
					post(URL.register.register, formClone)
						.then(res => {
							uni.showToast({
								title: '注册成功',
								icon: 'none',
								success: () => {
									setTimeout(() => {
										uni.navigateTo({
											url: '../login/index'
										});
									}, 500);
								}
							});
						})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
				}
			},
			getVCode() {
				if (this.vcodeBtnName != '发送验证码' && this.vcodeBtnName != '重新发送') {
					return;
				}
				var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
				if (!myreg.test(this.form.loginName)) {
					uni.showToast({
						title: '请正确填写手机号码',
						icon: 'none'
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
				console.log("路径",URL.register.getsendsmscode,'手机号',this.form.loginName);
				
				post(URL.register.getsendsmscode, {
					phone: this.form.loginName
				}).catch(error => {
					uni.hideToast();
				});
			},
			countDown() {
				if (this.countNum < 1) {
					clearInterval(this.countDownTimer);
					this.vcodeBtnName = '重新发送';
					return;
				}
				this.countNum--;
				this.vcodeBtnName = this.countNum + '秒重发';
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
		}
	}
</script>

<style lang="less">
	.register-wrap {
		.radioClass {
			float: left;
			margin: 0 20% 5upx 20%;
		}

		.login-sendmsg-btn {
			border: 1px solid #3688ff !important;
			background: none !important;
			color: #3688ff !important;
			width: 100%;
			height: 32px;
			line-height: 32px;
			font-size: 12px !important;
		}

		.grace-login-three {
			display: flex;
			justify-content: center;
			flex-wrap: nowrap;
		}

		.grace-login-three view {
			width: 50px;
			height: 50px;
			line-height: 50px;
			font-size: 46px;
			color: #3688ff;
			text-align: center;
			margin: 8px 15px;
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
