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
    // excludeno = 170.171.180
    let url = `http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token=${token}&itemid=${projectId}&excludeno=170.171`
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

// exports.sendSmsCode = async function(phone) {
//     let url = `http://101.132.75.100/dlm/api/customer/sendSMS?phone=${phone}&type=1&imgcode=`
//     let result = await request.get(url);
//     return result;
// }


//网页端发送验证码
exports.WebSendSmsCode = async function (phone) {
    let res = request.post('http://101.132.75.100/dlm//api/customer/sendSMS', { form: { phone: phone, type: '1' }});
    return res;
}

exports.WebRegister = async function (phone, validate) {
    //http://nutsblock.io/register/share/invite_reg.html?recsdn=XNZIY7&name=17621398980&icon=null
    //http://nutsblock.io/register/share/invite_reg.html?recsdn=140ZLV&name=13816346759&icon=null
    //jiqing
    // let res = request.post('http://101.132.75.100/dlm/api/customer/register', { form: { phone: phone, validate: validate, password: 'qq123123', invite: 'VPDZ6M'}});
    //brunce
    // let res = request.post('http://101.132.75.100/dlm/api/customer/register', { form: { phone: phone, validate: validate, password: 'qq123123', invite: 'XNZIY7'}});
    //darrick
    let res = request.post('http://101.132.75.100/dlm/api/customer/register', { form: { phone: phone, validate: validate, password: 'qq123123', invite: '140ZLV'}});
    return res;
}