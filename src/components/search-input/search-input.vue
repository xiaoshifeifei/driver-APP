<template>
	<view class="search-input">
		<view class="grace-search">
			<view class="grace-search-in">
				<view class="grace-search-icon" @tap="searchNow"></view>
				<input type="text" @input="handleInput" @confirm="searchNow" :value="searchValue" class="name-input" placeholder="搜索" />
			</view>
			<view class="search-select">
				<picker mode="selector" range-key="label" :range="selectListWrapClone.selectList" @change="handleSelectChange($event)">
					<text style="color: #808080">{{ selectListWrapClone.selectList[selectListWrapClone.index].label }}</text>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	import clonedeep from "@/utils/clonedeep";

	export default {
		props: {
			searchKey: {
				type: String,
				default: ""
			},
			searchValue: {
				type: String,
				default: ""
			},
			selectListWrap: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				isClear: false,
				selectListWrapClone: clonedeep(this.selectListWrap)
			};
		},
		model: {
			prop: "searchValue",
			event: "searchChange"
		},
		watch: {
			searchKey: {
				handler: function(val) {
					this.$emit('update:searchKey', val)
				},
				deep: true // 深度监听
			},
			searchValue: {
				handler: function(val) {
					this.$emit('update:searchValue', val)
				},
				deep: true // 深度监听
			},
			searchValue: {
				handler: function(val, oldVal) {
					if (val.length >= 1) {
						this.isClear = true;
					} else {
						this.isClear = false;
					}
				}
			},
			selectListWrap: {
				handler: function(val) {
					this.selectListWrapClone = clonedeep(val);
				},
				deep: true // 深度监听
			}
		},
		methods: {
			searchNow(e) {
				this.$emit("on-search", this.searchValue.trim());
			},
			handleInput(e) {
				this.$emit('update:searchValue', e.target.value)
			},
			handleSelectChange(e, name) {
				this.selectListWrapClone.index = e.detail.value
				this.$emit('on-selectChange')
				this.$emit('update:searchKey', this.selectListWrapClone.selectList[e.detail.value].value)
				this.$emit('searchChange', this.searchValue)
			}
		}
	};
</script>

<style lang="scss">
	.search-input {
		// padding: 0 40upx;
		padding: 20upx 40upx;

		.grace-search {
			margin: 0 auto;
			width: 100%;
			display: flex;
			justify-content: space-between;
			background: #fff;
			align-items: center;
			border: #ececec solid 1px;
			height: 80upx;
			border-radius: 10upx;

			.grace-search-in {
				width: 65%;
				align-items: center;
			}

			.search-select {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-right: 20upx;
			}
		}
	}
</style>
