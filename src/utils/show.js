export function showToast(msg) {
	uni.showToast({
		title: msg,
		icon: "none"
	});
}

export function showLoading(msg){
	uni.showLoading({
		title: msg,
		mask: true
	});
}

export function hideLoading(){
	uni.hideLoading();
}