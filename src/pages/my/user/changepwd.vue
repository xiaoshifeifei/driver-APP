<template>
	<view class="change-pwd-wrap">
		<view style="border-bottom:20px solid #F5F5F5;"></view>

		<view class="grace-form">
			<form @submit="formSubmit">
				<view class="grace-items">
					<view class="grace-label" style="margin:0 20upx;line-height: 50px;height: 50px;">
						<text style="color: red;">*</text>旧密码</view>
					<input type="password" @input="inputPwdO" name="oldPwd" v-model='oldpassword' placeholder="请输入旧密码" style="text-align: left;"
					 class="input"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label" style="margin:0 20upx;line-height: 50px;height: 50px;">
						<text style="color: red;">*</text>
						新密码</view>
					<input type="password" @input="inputPwdN" name="newPwd" v-model="newpassword" placeholder="请输入新密码" style="text-align: left;"
					 class="input"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label" style="margin:0 20upx;line-height: 50px;height: 50px;">
						<text style="color: red;">*</text>
						确认密码</view>
					<input type="password" @input="inputPwdC" name="confirmPwd" v-model="confirmpassword" placeholder="请输入确认密码" style="text-align:left;"
					 class="input"></input>
				</view>
				<view style="padding:22upx 20upx;">
					<button formType="submit" type="primary" style="width:100%;">确认</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../../graceUI/graceChecker.js");
	import URL from '@/api/serverApi';
	import {
		get,
		post
	} from '@/utils/request';
	import md5 from "utils/md5";

	export default {
		data() {
			return {
				oldpassword: "",
				newpassword: "",
				confirmpassword: "",
				loginName: ""
			}
		},
		methods: {
			inputPwdO(e) {
				this.oldpassword = e.detail.value
			},
			inputPwdN(e) {
				this.newpassword = e.detail.value
			},
			inputPwdC(e) {
				this.confirmpassword = e.detail.value
			},
			formSubmit(e) {
				//定义表单规则
				let _self = this;
				var rule = [{
						name: "oldPwd",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入旧密码"
					},
					{
						name: "newPwd",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入新密码"
					},
					{
						name: "confirmPwd",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入确认密码"
					},
					{
						name: "confirmPwd",
						checkType: "same",
						checkRule: _self.newpassword,
						errorMsg: "两次密码不一致"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showLoading({
						mask: true
					})
					post(URL.user.editpwd, {
							oldpassword: md5(_self.oldpassword),
							password: md5(_self.newpassword),
							rePassword: md5(_self.confirmpassword)
						})
						.then(res => {
							if (res.code === 200) {
								uni.hideLoading()
								uni.showToast({
									title: "操作成功,请重新登录",
									icon: "none",
									success: () => {
										setTimeout(() => {
											uni.removeStorageSync('userInfo'); //移除用户信息
											uni.removeStorageSync('userInfoToken'); //移除token信息
											uni.removeStorageSync('sessionId');
											uni.navigateTo({
												url: `/pages/login/index`
											});
										}, 500);
									}
								});
							}
						})
				} else {
					uni.hideLoading()
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			getLoginInfo() {
				uni.showLoading({
					title: '正在加载',
					mask: true
				})
				get(URL.user.getuserinfo, {})
					.then(res => {
						uni.setStorageSync('userInfo', res.data.orgUser);
						let loginInfo = uni.getStorageSync('userInfo');
						this.loginName = loginInfo.loginName;
						uni.hideLoading();
					})
			},
		},
		onShow() {
			if (uni.getStorageSync('userInfo')) {
				let loginInfo = uni.getStorageSync('userInfo');
				this.loginName = loginInfo.loginName;
			} else {
				this.getLoginInfo();
			}
		}
	}
</script>

<style lang="scss" scoped>
	// @import "@/style/index.scss";
	.grace-items {
		background-color: #fff;
	}
</style>
