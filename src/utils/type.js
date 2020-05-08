let goodstype = [{
    value: "",
    lable: "请选择"
}, {
    value: "90",
    lable: "电子产品"
}, {
    value: "92",
    lable: "商品汽车"
}, {
    value: "93",
    lable: "冷藏货物"
}, {
    value: "94",
    lable: "大宗货物"
}, {
    value: "95",
    lable: "快速消费"
}, {
    value: "96",
    lable: "农产品"
}, {
    value: "999",
    lable: "其他"
}]

let units = [{
    value: "",
    lable: "请选择"
}, {
    value: "THING",
    lable: "件"
}, {
    value: "PACKAGE",
    lable: "包"
}, {
    value: "BOX",
    lable: "箱"
}, {
    value: "STIPULES",
    lable: "托"
}]

let transporttype = [{
    value: "",
    lable: "请选择"
}, {
    value: "HIGHWAY",
    lable: "公路运输"
}, {
    value: "SHIPPING",
    lable: "海上运输"
}, {
    value: "AIR",
    lable: "航空运输"
}, {
    value: "RAILWAY",
    lable: "铁路运输"
}]

let businesstypelist = [{
    value: "",
    lable: "请选择"
}, {
    value: 'ARTERY_GENERAL_CARGO',
    lable: '干线普货运输'
}, {
    value: 'CONTAINER_TRANSPORTATION',
    lable: '集装箱运输'
}, {

    value: 'CITY',
    lable: '城市配送'
}, {
    value: 'VILLAGE',
    lable: '农村配送'
}, {
    value: 'OTHER',
    lable: '其他'
}]

let transportmode = [{
    value: "",
    lable: "请选择"
}, {
    value: "WHOLE",
    lable: "整车"
}, {
    value: "LTL",
    lable: "零担"
}]

let takedeliveryway = [{
    value: "",
    lable: "请选择"
}, {
    value: "1",
    lable: "到站装货"
}, {
    value: "2",
    lable: "指定地点装货"
}]

let deliverytype = [{
    value: "",
    lable: "请选择"
}, {
    value: "1",
    lable: "上门自取"
}, {
    value: "2",
    lable: "送货上门"
}]

let paytype = [{
    value: "",
    lable: "请选择"
}, {
    value: "0",
    lable: "现金转账"
}, {
    value: "1",
    lable: "承兑汇票"
}]

let settletype = [{
    value: "",
    lable: "请选择"
}, {
    value: "FREIGHTCOLLECT",
    lable: "到付"
}, {
    value: "MONTHLYKNOTS",
    lable: "月结"
}, {
    value: "CASHPAYMENT",
    lable: "现结"
}]

let sendstate = [{
    value: "NEW",
    lable: "待接受"
}, {
    value: "DISPATCHED",
    lable: "进行中"
}, {
    value: "PICKUP_PLACE_OF_DELIVERY",
    lable: "进行中"
}, {
    value: "ARRIVE_PLACE_OF_DELIVERY",
    lable: "进行中"
}, {
    value: "LOADING_FINISHED",
    lable: "进行中"
}, {
    value: "TRANSPORTATIONED",
    lable: "进行中"
}, {
    value: "ARRIVE_PLACE_OF_DESTINATION",
    lable: "进行中"
}, {
    value: "UNLOADING_FINISHED",
    lable: "进行中"
}, {
    value: "SIGN_FOR",
    lable: "进行中"
}, {
    value: "COMPLETED",
    lable: "进行中"
}, {
    value: 'FINISH',
    lable: '已完成'
}]

let actionlist = [{
    lable: '已派车',
    value: 'DISPATCHED'
}, {
    lable: '前往提货地',
    value: 'PICKUP_PLACE_OF_DELIVERY'
}, {
    lable: '抵达提货点',
    value: 'ARRIVE_PLACE_OF_DELIVERY'
}, {
    lable: '装车完成',
    value: 'LOADING_FINISHED'
}, {
    lable: '已发车',
    value: 'TRANSPORTATIONED'
}, {
    lable: '已发车',
    value: 'TRANSPORTATIONED'
}, {
    lable: '抵达目的地',
    value: 'ARRIVE_PLACE_OF_DESTINATION'
}, {
    lable: '卸货完成',
    value: 'UNLOADING_FINISHED'
}, {
    lable: '签收',
    value: 'SIGN_FOR'
}, {
    lable: '完成派车单',
    value: 'COMPLETED'
}, {
    lable: '结束服务',
    value: 'FINISH'
}]

export {
    goodstype,
    units,
    transporttype,
    businesstypelist,
    transportmode,
    takedeliveryway,
    deliverytype,
    paytype,
    settletype,
    sendstate,
    actionlist
};