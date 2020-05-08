<script>
import autoUpdater from './utils/autoUpdater.min';
import URL from '@/api/serverApi';
import { get, post } from '@/utils/request';

export default {
	onShow: function() {
		// let _this = this;
		// uni.onSocketMessage(function(evt) {
		// 	var a = JSON.stringify(evt.data);
		// 	// #ifdef APP-PLUS
		// 	_this.handleGetNotice();
		// 	plus.push.createMessage(a, 'LocalMSG', { icon: '@/static/images/msg/n_bid.png' });
		// 	// #endif
		// });
	},
	methods: {
		//获取小红点数量
		// handleGetNotice() {
		// 	let obj = {};
		// 	post(URL.notice.getNotice, obj)
		// 		.then(res => {
		// 			let total = '';
		// 			res.data.forEach(item => {
		// 				if (item.TOTLE) {
		// 					total = item.TOTLE;
		// 				} else {
		// 					total = '';
		// 				}
		// 			});
		// 			if (total) {
		// 				uni.setTabBarBadge({
		// 					index: 2,
		// 					text: total.toString()
		// 				});
		// 			} else {
		// 				uni.removeTabBarBadge({
		// 					index: 2
		// 				});
		// 			}
		// 		})
		// }
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import './style/index.scss';
@import './graceUI/graceUI.css';

@font-face {
	font-family: 'iconfont';
	/* project id 1048161 */
	src: url('http://at.alicdn.com/t/font_1048161_bym2cliyzul.eot');
	src: url('http://at.alicdn.com/t/font_1048161_bym2cliyzul.eot?#iefix') format('embedded-opentype'), url('http://at.alicdn.com/t/font_1048161_bym2cliyzul.woff2') format('woff2'),
		url('http://at.alicdn.com/t/font_1048161_bym2cliyzul.woff') format('woff'), url('http://at.alicdn.com/t/font_1048161_bym2cliyzul.ttf') format('truetype'),
		url('http://at.alicdn.com/t/font_1048161_bym2cliyzul.svg#iconfont') format('svg');
}

.icon {
	font-family: iconfont;
}

* {
	box-sizing: border-box;
}

page {
	background: $bgcolor;
}

.fill {
	width: 100%;
	height: 150upx;		
}

.bottom-button-wrap {
	background: #fff;
	box-shadow: 0px -8upx 8upx rgba(201, 201, 201, 0.349);
	position: fixed;
	padding-bottom: 20upx;
	bottom: 0upx;
	width: 100%;
	z-index: 999;
	button {
		width: 90%;
		margin-top: 20upx;
	}
}

.not-find-data {
	width: 100%;
	font-size: 50upx;
	margin-top: 50%;
	text-align: center;
}
</style>
