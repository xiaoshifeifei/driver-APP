/**
 * Created by jiachenpan on 16/11/18.
 */

// export function isvalidUsername(str) {
//   const valid_map = ['admin', 'editor','cjdcjd']
//   return valid_map.indexOf(str.trim()) >= 0
//   // return valid_map.indexOf(str) >= 0
// }

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}
// 手机号验证码
export function phone(str) {
    const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    return reg.test(str)
}
// 密码
export function validatAlphaPas(str) {
    const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/
    return reg.test(str)
}
// 中文字母数字下划线,首位非数字
export function validatAlphaName(str) {
    const reg = /^[a-zA-Z_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]*$/
    return reg.test(str)
}
// 中文 空格 英文 .
export function validatAlphaIdName(str) {
    const reg = /[\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20}/
    return reg.test(str)
}
// 身份证
export function validatAlphaIdNum(str) {
    const reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    return reg.test(str)
}
//邮箱
export function email(str) {
    const reg = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/
    return reg.test(str)
}