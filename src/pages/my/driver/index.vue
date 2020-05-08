<template>
	<view class="dirver-info-wrap">
		<view class="grace-form">
			<form ref="form">
				<view class="form-wrap">
					<view>
						<view class="title">
							<text>基本信息</text>
						</view>
						<view class="grace-items">
							<view class="grace-label">
								<text>姓名</text>
							</view>
							<input type="text" disabled class="input" name="username" v-model="form.username" placeholder="请输入姓名"
							 placeholder-style="color:#B8B8B8;" />
						</view>
						<view class="grace-items">
							<view class="grace-label">
								<text>联系方式</text>
							</view>
							<input type="text" disabled class="input" name="phone" v-model="form.phone" placeholder="请输入电话号码"
							 placeholder-style="color:#B8B8B8;" />
						</view>
						<view class="grace-items">
							<view class="grace-label">
								<text>身份证号码</text>
							</view>
							<input type="text" disabled class="input" name="idNo" v-model="form.idNo" placeholder="请输入身份证号码"
							 placeholder-style="color:#B8B8B8;">
						</view>
						<view class="grace-items row">
							<view class="col">
								<upload-card name="idFrontImgUrl" des="点击上传人像面" type="idcard" :showImgUrl="form.idFrontImgUrl" @uploadSuccess="handleUploadSuccess($event, 'idFrontImgUrl')" />
							</view>
							<view class="col">
								<upload-card name="idBackImgUrl" des="点击上传国徽面" type="idcard" :showImgUrl="form.idBackImgUrl" @uploadSuccess="handleUploadSuccess($event, 'idBackImgUrl')" />
							</view>
						</view>
					</view>
					<view>
						<view class="title">
							<text>驾驶证信息</text>
						</view>
						<view class="grace-items">
							<view class="grace-label">
								<text class="write">*</text>
								<text>驾驶证类型</text>
							</view>
							<picker mode="selector" name="driverLicenseType" :range="driverLicenseTypeListWrap.driverLicenseTypeList"
							 range-key="lable" @change="handleChange($event, 'driverLicenseType')" :value="driverLicenseTypeListWrap.index">
								<view class="uni-input" v-if="form.driverLicenseType">{{ driverLicenseTypeListWrap.driverLicenseTypeList[driverLicenseTypeListWrap.index].lable }}</view>
								<text class="custom-placeholder" v-else>请选择驾驶证类型</text>
							</picker>
						</view>
						<view class="grace-items">
							<view class="grace-label">
								<text class="write">*</text>
								<text>驾驶证号</text>
							</view>
							<input type="text" class="input" name="driverLicense" v-model="form.driverLicense" placeholder="请输入驾驶证号"
							 placeholder-style="color:#B8B8B8;" />
						</view>
						<view class="grace-items">
							<view class="grace-label">
								<text class="write">*</text>
								<text>初次领证时间</text>
							</view>
							<picker mode="date" name="driverLicenseIssueDate" @change="handleChangePicker($event, 'form', 'driverLicenseIssueDate', false)">
								<view class="uni-input" v-if="form.driverLicenseIssueDate">{{ form.driverLicenseIssueDate }}</view>
								<text class="custom-placeholder" v-else>请选择初次领证时间</text>
							</picker>
						</view>
						<view class="row">
							<view class="col">
								<upload-card name="licenseFrontImgUrl" des="点击上传正页" type="drivercard" :showImgUrl="form.licenseFrontImgUrl"
								 @uploadSuccess="handleUploadSuccess($event, 'licenseFrontImgUrl')" />
							</view>
							<view class="col">
								<upload-card name="licenseBackImgUrl" des="点击上传副页" type="drivercard" :showImgUrl="form.licenseBackImgUrl"
								 @uploadSuccess="handleUploadSuccess($event, 'licenseBackImgUrl')" />
							</view>
						</view>
					</view>
					<view>
						<view class="title">
							<text>从业资格证信息</text>
						</view>
						<view class="grace-items">
							<view class="grace-label">
								<text class="write">*</text>
								<text>从业资格证</text>
							</view>
							<input type="text" class="input" name="employmentCertNo" v-model="form.employmentCertNo" placeholder="请输入从业资格证号"
							 placeholder-style="color:#B8B8B8;" />
						</view>
						<view class="row">
							<view class="col" style="width: 100%">
								<upload-card des="点击上传从业资格证" type="job" :showImgUrl="form.employmentCertImgUrl" @uploadSuccess="handleUploadSuccess($event, 'employmentCertImgUrl')" />
							</view>
						</view>
					</view>
					<view>
						<view class="title">
							<text>其它从业资格证（非必填）</text>
						</view>
						<view class="grace-items">
							<view class="grace-label">
								<text>其它从业资格证号</text>
							</view>
							<input type="text" class="input" v-model="form.otherEmploymentCertNo" placeholder="请输入其它从业资格证号码"
							 placeholder-style="color:#B8B8B8;" />
						</view>
						<view class="row">
							<view class="col" style="width: 100%">
								<upload-card des="点击上传其它从业资格证" type="otherjob" :showImgUrl="form.otherEmploymentCertImgUrl" @uploadSuccess="handleUploadSuccess($event, 'otherEmploymentCertImgUrl')" />
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-button-wrap">
					<button type="primary" @click="formSubmit" v-text="isDriverCurrent ? '保存' : '添加'"></button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import URL from "@/api/serverApi";
	import {
		get,
		post
	} from "@/utils/request";
	import {
		showToast,
		showLoading,
		hideLoading
	} from "@/utils/show.js";
	import graceChecker from "graceUI/graceChecker";
	import UploadCard from "@/components/uploadCard/uploadCard";

	export default {
		components: {
			UploadCard
		},
		data() {
			return {
				isDriverCurrent: false,
				form: {
					driverId: "",
					username: "",
					phone: "",
					idNo: "",

					idFrontImgUrl: "",
					idBackImgUrl: "",

					driverLicenseType: "",
					driverLicense: "",
					driverLicenseIssueDate: "",
					licenseFrontImgUrl: "",
					licenseBackImgUrl: "",

					employmentCertNo: "",
					employmentCertImgUrl: "",

					otherEmploymentCertNo: "",
					otherEmploymentCertImgUrl: "",

					inOut: "OUT" // 给后端的一个标示
				},

				driverLicenseTypeListWrap: {
					index: 0,
					driverLicenseTypeList: [{
						lable: "A1",
						value: "A1"
					}, {
						lable: "A2",
						value: "A2"
					}, {
						lable: "A3",
						value: "A3"
					}]
				}
			};
		},
		onLoad() {
			this.getLoginInfo();
		},
		onShow() {
			if (uni.getStorageSync('userInfo')) {
				this.loginInfo = uni.getStorageSync('userInfo');
				this.isDriverCurrent = this.loginInfo.finishInfo;

				if (this.isDriverCurrent) {
					this.updataInfo();
				} else {
					this.form.username = this.loginInfo.userName;
					this.form.phone = this.loginInfo.userTel;
					this.form.idNo = this.loginInfo.idNo;
				}
			} else {
				this.getLoginInfo();
			}
		},
		methods: {
			getLoginInfo() {
				showLoading("正在加载");
				get(URL.user.getuserinfo, {})
					.then(res => {
						uni.setStorageSync('userInfo', res.data);
						this.loginInfo = uni.getStorageSync('userInfo');
						this.isDriverCurrent = this.loginInfo.finishInfo;

						this.form.username = this.loginInfo.userName;
						this.form.phone = this.loginInfo.userTel;
						this.form.idNo = this.loginInfo.idNo;

						if (this.isDriverCurrent) {
							this.updataInfo();
						}
						uni.hideLoading()
					})
			},
			handleUploadSuccess(e, name) {
				this.form[name] = e;
			},
			handleChange(e, name) {
				let newName = name + 'List';
				let listWrap = newName + 'Wrap';
				this.form[name] = this[listWrap][newName][e.detail.value].value;
				this[listWrap].index = e.detail.value;
			},
			// 修改picker的时候触发
			handleChangePicker(e, formName, name, isChange) {
				if (isChange) {
					let newName = name + "List";
					this[formName][name] = this[newName][e.detail.value].label;
				} else {
					this[formName][name] = e.detail.value;
				}
			},
			formSubmit() {
				let rule = [
					//{
					// 	name: "driverIdcard",
					// 	checkType: 'reg',
					// 	checkRule: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
					// 	errorMsg: "请输入正确的身份证号码"
					// }, 
					{
						name: "idFrontImgUrl",
						checkType: "notnull",
						errorMsg: "请上传身份证人像面"
					}, {
						name: "idBackImgUrl",
						checkType: "notnull",
						errorMsg: "请上传身份证国徽面"
					}, {
						name: "driverLicenseType",
						checkType: "notnull",
						errorMsg: "请选择驾驶证类型"
					}, {
						name: "driverLicense",
						checkType: "notnull",
						errorMsg: "请输入驾驶证号"
					}, {
						name: "driverLicenseIssueDate",
						checkType: "notnull",
						errorMsg: "请选择初次领证时间"
					}, {
						name: "licenseFrontImgUrl",
						checkType: "notnull",
						errorMsg: "请上传驾驶证正页"
					}, {
						name: "licenseBackImgUrl",
						checkType: "notnull",
						errorMsg: "请上传驾驶证副页"
					}, {
						name: "employmentCertNo",
						checkType: "notnull",
						errorMsg: "请输入从业资格证号"
					}, {
						name: "employmentCertImgUrl",
						checkType: "notnull",
						errorMsg: "请上传从业资格证"
					}
				];
				let formData = this.form;
				let checkRes = graceChecker.check(formData, rule);
				// 验证通过
				if (checkRes) {
					let obj = this.form;
					let url = "";

					showLoading("保存中");

					if (this.isDriverCurrent) {
						url = URL.driver.editdriver;
						obj.driverId = this.form.driverId;
					} else {
						url = URL.driver.adddriver;
						obj.status = 0;
					}

					post(url, obj)
						.then(res => {
							if (this.isDriverCurrent) {
								showToast("保存成功");
							} else {
								showToast("添加成功");
							}

							//跳转到列表页
							setTimeout(() => {
								uni.navigateBack();
							}, 1500);
							uni.hideLoading();
						})
				} else {
					showToast(graceChecker.error);
				}
			},
			updataInfo() {
				showLoading("正在获取信息");

				get(URL.driver.getinfo)
					.then(res => {
						uni.hideLoading();

						if (res.data != null) {
							this.form.driverId = res.data.driverId;

							this.form.idBackImgUrl = res.data.idBackImgUrl;
							this.form.idFrontImgUrl = res.data.idFrontImgUrl;

							this.form.driverLicenseType = res.data.driverLicenseType;
							this.driverLicenseTypeListWrap.driverLicenseTypeList.forEach((item, index) => {
								if (item.value == this.form.driverLicenseType) {
									this.driverLicenseTypeListWrap.index = index;
								}
							});

							this.form.driverLicense = res.data.driverLicense;
							this.form.driverLicenseIssueDate = res.data.driverLicenseIssueDate.split(" ")[0];
							this.form.licenseFrontImgUrl = res.data.licenseFrontImgUrl;
							this.form.licenseBackImgUrl = res.data.licenseBackImgUrl;

							this.form.employmentCertNo = res.data.employmentCertNo;
							this.form.employmentCertImgUrl = res.data.employmentCertImgUrl;

							if (res.data.otherEmploymentCertNo === "null" || res.data.otherEmploymentCertNo === null) {
								this.form.otherEmploymentCertNo = "";
							} else {
								this.form.otherEmploymentCertNo = res.data.otherEmploymentCertNo;
							}

							if (res.data.otherEmploymentCertImgUrl === "null" || res.data.otherEmploymentCertImgUrl === null) {
								this.form.otherEmploymentCertImgUrl = "";
							} else {
								this.form.otherEmploymentCertImgUrl = res.data.otherEmploymentCertImgUrl;
							}

							this.form.status = res.data.status;
						}
					})
			}
		}
	}
</script>

<style lang="less">
	page {
		background: #f5f5f5;
	}

	.dirver-info-wrap {
		.title {
			width: 100%;
			height: 60upx;
			line-height: 60upx;
			border: #e2e3e4 1upx solid;
			border-left: none;
			border-right: none;
			background-color: #f5f5f5;
			padding-left: 20upx;
		}

		.grace-form {
			background: #fff;
			margin-bottom: 200upx;
		}

		.form-wrap {
			margin: 0 auto;

			.grace-items {
				.grace-label {
					width: 260upx;
					font-size: 32upx;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					margin-left: 20upx;
				}

				.uni-input {
					margin-right: 25upx;
				}

				.write {
					color: #ff0000;
				}

				.custom-placeholder {
					color: #bababa;
				}
			}
		}

		.row {
			display: flex;
			justify-content: space-around;

			.col {
				width: 50%;
			}
		}

		.table {
			.tr {
				width: 100%;
				display: flex;
				justify-content: space-around;
				border-bottom: 1upx solid #ececec;

				.td {
					height: 70upx;
					line-height: 70upx;
				}

				.change {
					color: #0079fe;
				}

				.delete {
					color: #dd0000;
				}
			}
		}
	}
</style>
