let restify = require('restify-clients');
const request = require('request-promise');



//登陆
exports.login = async function (username, password) {
    let url = `http://api.fxhyd.cn/UserInterface.aspx?action=login&username=${username}&password=${password}`;
    let result = await request.get(url);
    return result;
}

//根据token获取易码的详细信息
exports.getYiMAUserInfo = async function (token) {
    let url = `http://api.fxhyd.cn/UserInterface.aspx?action=getaccountinfo&token=${token}`;
    let result = await request.get(url);
    return result;
} 

//获取电话号码接口
exports.getMobileNumber = async function (token, projectId) {
    //
    let url = `http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token=${token}&itemid=${projectId}`
    let result = await request.get(url);
    console.log(result);
    return result;
}

//获取短信接口
exports.getYanzhengMa = async function (token, projectId, phoneNum) {
    let url = `http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token=${token}&itemid=${projectId}&mobile=${phoneNum}&release=1`
    let result = await request.get(url);
    return result;
}

//释放手机号码
exports.freeThePhoneNum = async function (token, projectId, phoneNum) {
    let url = `http://api.fxhyd.cn/UserInterface.aspx?action=release&token=${token}&itemid=${projectId}&mobile=${phoneNum}`
    let result = await request.get(url);
    return result;
}

//拉黑号码
exports.blackList = async function (token, projectId, phoneNum) {
    let url = `http://api.fxhyd.cn/UserInterface.aspx?action=addignore&token=${token}&itemid=${projectId}&mobile=${phoneNum}`
    let result = await request.get(url);
    return result;
}