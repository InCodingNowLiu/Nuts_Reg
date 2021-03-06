const yixin = require('./yixin');
const Common = require('./common');
const mongo = require('./mongo');
// const User = require('./user');
// const User = require('./py');
const User = require('./dg');
mongo.config();
// const response = await yixin.login('111', '1111');


let getNumber = async function () {
    let res = await yixin.getMobileNumber('00833695562c636f5486a42834ae226c313e8d486f01', '25232');
    res = Common.clipResponse(JSON.stringify(res));
    const phoneNumb = res[1];
    return phoneNumb;
}

let getMessage = async (phone) => {
    let res = await yixin.getYanzhengMa('00833695562c636f5486a42834ae226c313e8d486f01', '25232', phone);
    res = Common.clipResponse(JSON.stringify(res));
    return res;
}

let releaseThePhoneNumer = async (phone) => {
    let res = await yixin.freeThePhoneNum('00833695562c636f5486a42834ae226c313e8d486f01', '25232', phone);
    res = Common.clipResponse(JSON.stringify(res));
    return res;
}

let blackListNumber = async (phone) => {
    let res = await yixin.blackList('00833695562c636f5486a42834ae226c313e8d486f01', '25232', phone);
    res = Common.clipResponse(JSON.stringify(res));
    return res;
}

let timeInterArr = [];
const schedFunc = (async () => {
    await setInterval(async () => {
        for (let index = 0; index < timeInterArr.length; index++) {
            const element = timeInterArr[index];
            clearInterval(element);
        }
        timeInterArr = [];
        for (let index = 0; index < 10; index++) {
            const response = await yixin.login('ljq132546', 'qq123123');
            let loginArr = Common.clipResponse(JSON.stringify(response));
            const token = loginArr[1];
    
            let res;
            //1. 获取电话号码
            const phoneNumber = await getNumber();
            res = await yixin.WebSendSmsCode(phoneNumber);
            console.log('send sms repsonse:', res);
            //2. 获取短信
            let timeInter = await setInterval(async () => {
                const messgaeContent = await getMessage(phoneNumber);
                if (messgaeContent[0] === 'success') {
                    let code = Common.clipSecureCode(messgaeContent[1]);
                    res = await yixin.WebRegister(phoneNumber, code);
                    res = JSON.parse(res);
                    if (res.code === 1) {
                        console.log('register success');
                        //插入数据库
                        let user = {
                            phoneNumber: phoneNumber,
                            password: 'qq123123'
                        }
                        let userSchema = new User(user);
                        let temp = await userSchema.save();
                        console.log('insert mongod:', temp);
                        temp = await blackListNumber(phoneNumber);
                        console.log('黑名单: ', temp);
                        // 3. 释放短线号码
                        // const release = await releaseThePhoneNumer(phoneNumber);
                        // console.log('phone number release:', release);
                    } else if (code === 3001) {
                        let temp = await blackListNumber(phoneNumber);
                        console.log('黑名单3001: ', temp);
                    }
                    clearInterval(timeInter);
                }
            }, 8000)
            timeInterArr.push(timeInter);
        }
    }, 100000)
    
    // for (let index = 0; index < 10; index++) {
    //     const response = await yixin.login('ljq132546', 'qq123123');
    //     let loginArr = Common.clipResponse(JSON.stringify(response));
    //     const token = loginArr[1];

    //     let res;
    //     //1. 获取电话号码
    //     const phoneNumber = await getNumber();
    //     console.log(phoneNumber);
    //     res = await yixin.WebSendSmsCode(phoneNumber);
    //     console.log('send sms repsonse:', res);
    //     if (res.success) {
    //         console.log(success);
    //     }
    //     //2. 获取短信
    //     let timeIn = await setInterval(async () => {
    //         const messgaeContent = await getMessage(phoneNumber);
    //         if (messgaeContent[0] === 'success') {
    //             let code = Common.clipSecureCode(messgaeContent[1]);
    //             res = await yixin.WebRegister(phoneNumber, code);
    //             console.log('register info: ', res, typeof res);
    //             res = JSON.parse(res);
    //             if (res.code === 1) {
    //                 console.log('register success');
    //                 //插入数据库
    //                 let user = {
    //                     phoneNumber: phoneNumber,
    //                     password: 'qq123123'
    //                 }
    //                 let userSchema = new User(user);
    //                 let temp = await userSchema.save();
    //                 console.log('insert mongod:', temp);
    //                 // 3. 释放短线号码
    //                 const release = await releaseThePhoneNumer(phoneNumber);
    //                 console.log('phone number release:', release);
    //             }
    //             clearInterval(timeIn);
    //         }
    //         console.log(messgaeContent);
    //     }, 10000)
    // }
})()



