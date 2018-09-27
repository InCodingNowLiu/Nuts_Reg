exports.clipResponse = function (srcText) {
        
        if (srcText.indexOf('success|')) {
            console.log(srcText);
            let newStr = srcText.replace(/"/g, '');
            const arr = newStr.split('|');
            console.log(arr);
            console.log(arr[0] === 'success');
            if (!compareFunc(arr[0], 'success')) throw 'current api fail';
            console.log(arr);
            return arr;
        }
        throw 'current api fail';
}

let compareFunc = function (originStr, targetStr) {
    if (originStr === targetStr) {
        return true;
    } else {
        return false;
    }
}

exports.clipSecureCode = function (text) {
    
    let res = text.replace(/【Nuts】尊敬的用户，您的注册会员动态密码为：/g, '');
    res = res.replace(/，请勿泄漏于他人！/g, '');
    console.log(res);
    return res;
}
