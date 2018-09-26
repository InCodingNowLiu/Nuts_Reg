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