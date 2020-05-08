<template>
	<view class="feedback-wrap">
		<view class="form_css">
			<form>
				<view class="picker_css">
					<picker mode="selector" range-key="label" :range="fbTypeListWrap.fbTypeList" @change="handleSelectChange($event, 'form', 'fbType')">
						<view>
							<view style="color: #808080" v-if="form.fbType">{{ fbTypeListWrap.fbTypeList[fbTypeListWrap.index].label }}</view>
							<view class="custom-placeholder" v-else>请选择反馈类型</view>
						</view>
						<view>
							<text class="icon" style="float: right;margin-top: -50upx;">&#xe683;</text>
						</view>
					</picker>
				</view>
				<view class="picker_area">
					<textarea placeholder="请输入反馈信息" class="p_area" @input="conInput" v-model="form.fbInfo" maxlength="300" name="fbInfo"></textarea>
					<view class="text_right">
						<text>已输入{{conVal}}/300</text>
					</view>
				</view>
				<view class="picker_css">
					<input type="text" v-model="form.fbEmail" style="text-align: left;" placeholder="邮箱(选填)" />
				</view>
				<view style="padding: 22upx 0;">
					<button @click="formSubmit" type="primary" style="width:100%;">提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import URL from "@/api/serverApi";
	import {
		post
	} from "@/utils/request";
	var graceChecker = require("@/graceUI/graceChecker.js");
	export default {
		data() {
			return {
				form: {
					fbType: "",
					fbInfo: "",
					fbEmail: "",
					fbUserId:""
				},
				fbTypeListWrap: {
					index: 0,
					fbTypeList: [{
							label: "商品相关",
							value: 1
						},
						{
							label: "物流状况",
							value: 2
						},
						{
							label: "客户服务",
							value: 3
						},
						{
							label: "优惠活动",
							value: 4
						},
						{
							label: "产品体验",
							value: 5
						},
						{
							label: "产品功能",
							value: 6
						},
						{
							label: "其他问题",
							value: 7
						}
					]
				},
				conVal: 0
			};
		},
		methods: {
			conInput: function(e) {
				this.conVal = e.detail.value.length;
				if (this.conVal == 300) {
					uni.showToast({
						icon: "none",
						title: "最多只能输入300个字"
					});
				}
			},
			handleSelectChange(e, formName, name) {
				let newName = name + "List";
				let listWrap = newName + "Wrap";
				this[listWrap].index = e.detail.value;
				this[formName][name] = this[listWrap][newName][e.detail.value].value;
			},
			formSubmit: function(e) {
				//定义表单规则
				let _self = this;
				var rule = [{
						name: "fbType",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择反馈类型"
					},
					{
						name: "fbInfo",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入反馈信息"
					}
				];
				//进行表单检查
				var formData = this.form;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					//写请求
					post(URL.user.addfeedback, this.form).then(res => {
						uni.showToast({
							title: "提交成功",
							icon: "none"
						});
						this.clearForm();
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			clearForm() {
				for (const [key, value] of Object.entries(this.form)) {
					this.form[key] = "";
				}
				this.conVal = 0;
			}
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo');
			this.form.fbUserId = userInfo.userId;
		}
	};
</script>

<style lang="scss" scoped>
	// @import "@/style/index.scss";
	.feedback-wrap {
		.form_css {
			margin: 40upx;
			// background-color: #fff;

			.picker_css {
				background-color: #fff;
				margin: 28upx 0;
				padding: 22upx 22upx;
				border: 1px solid rgba(228, 228, 228, 1);
				font-family: "微软雅黑";
				font-weight: 400;
				font-style: normal;
				color: #666666;
				text-align: left;
				line-height: 28px;
				word-wrap: break-word;
			}

			.picker_area {
				background-color: #fff;
				margin: 28upx 0;
				padding: 22upx 22upx;
				border: 1px solid rgba(228, 228, 228, 1);
				font-family: "微软雅黑";
				font-weight: 400;
				font-style: normal;
				color: #666666;
				text-align: left;
				word-wrap: break-word;

				.p_area {
					text-align: left;
					font-size: 28upx;
					width: 100%;
				}

				.text_right {
					font-family: 微软雅黑;
					font-weight: 400;
					font-style: normal;
					font-size: 12px;
					color: rgb(204, 204, 204);
					text-align: right;
				}
			}
		}
	}
</style>
