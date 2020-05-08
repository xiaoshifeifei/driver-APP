// const LOCALURL = "http://192.168.1.8:13102/driver/"
// const LOCALURL = "http://platform.fjzcht.com/driver/";
const LOCALURL = "http://47.111.127.184:13102/driver/"

const URL = {
    //统计
    count: LOCALURL + "app/srvwaybillsend/count",
    //注册
    register: {
        getsendsmscode: LOCALURL + "sys/sms/getsendsmscode", //获取验证码
        register: LOCALURL + "sys/login/regdriver" //注册  ---
    },
    //登录
    login: LOCALURL + "sys/login/app",
    //我的
    user: {
        getuserinfo: LOCALURL + "sys/login/getlogininfos", //获取用户信息
        loginout: LOCALURL + "sys/login/logout", //退出登录
        edituserinfo: LOCALURL + "sys/login/modify", //修改个人信息  --
        editpwd: LOCALURL + "sys/login/drivermodifypassword", //修改密码
        addfeedback: LOCALURL + "feedback/sysfeedback/save" //添加反馈
    },
    //忘记密码
    findpwd: {
        checkcode: LOCALURL + "sys/login/codecheck", //验证手机验证码
        setpwd: LOCALURL + "sys/login/modifypassword" //设置密码
    },
    //司机
    driver: {
        getinfo: LOCALURL + "basic/orgdriver/info", //获取司机信息
        adddriver: LOCALURL + "basic/orgdriver/save", //添加司机
        editdriver: LOCALURL + "basic/orgdriver/modify", //修改司机
    },
    group: {
        companylist: LOCALURL + "driver/company/notjoincompanys", //获取企业列表
        joincompany: LOCALURL + "driver/company/applycompany", //申请加入团队
        cancalejoin: LOCALURL + "driver/company/cancelcompany", //撤销加入团队
        mycampanys: LOCALURL + "driver/company/mycompanys" //我加入的团队
    },
    task: {
        tasklist: LOCALURL + "app/srvwaybillsend/getlist", //任务列表

        gettask: LOCALURL + "app/srvwaybillsend/info", //获取任务 --
        edittask: LOCALURL + "app/srvwaybillsend/modifystatus", //修改任务  拒绝任务
        // deltask: LOCALURL + "app/srvwaybillsend/remove", //拒绝任务 --
    },
    //上传图片
    uploadImg: LOCALURL + "sys/file/uploads",
    //消息
    notice: {

    }
}

module.exports = URL