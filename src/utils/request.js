export function get(url, data) {
	return request(url, 'GET', data)
}

export function post(url, data) {
	return request(url, 'POST', data)
}

export function put(url, data) {
	return request(url, 'PUT', data)
}

export function deletea(url, data) {
	return request(url, 'DELETE', data)
}

function request(url, method, data) {
	let sessionId = uni.getStorageSync('sessionId');
	return new Promise((resolve, reject) => {
		let header = {};

		if (sessionId) {
			header = {
				Authorization: sessionId, //token请求头信息
				"content-type": "application/x-www-form-urlencoded"
			}
		} else {
			header = {
				"content-type": "application/x-www-form-urlencoded"
			}
		}
		
		var that = this;
		uni.request({
			header,
			data,
			method,
			url: url,
			success: function(res) {
				if (res.data.code === 200) {
					resolve(res.data);
				} else if (res.data.code === 99999998) {
					//清除token
					uni.removeStorageSync("userInfoToken");
					uni.removeStorageSync('sessionId');
					uni.showModal({
						showCancel: false,
						title: "登录信息失效",
						content: "请重新登录",
						success: function(res) {
							if (res.confirm) {
								uni.removeStorageSync("userInfoToken");
								uni.removeStorageSync('userInfo');
								uni.removeStorageSync('sessionId');
								uni.reLaunch({
									url: `/pages/login/index`
								});
								uni.hideLoading()
							} else if (res.cancel) {

							}
						}
					});
					resolve(res.data)
					return

				} else {
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					})
					reject(res);
				}
			},
			complete: function(res) {},
			fail: function(res) {
				let data = {
					code: 555,
					msg: "网络繁忙中..."
				}
				uni.showToast({
					title: data.msg,
					icon: "none"
				})
				// reject(res.errMsg);
			}
		})
	})
}
