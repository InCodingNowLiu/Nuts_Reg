const yixin = require('./yixin');
const Common = require('./common')
// const response = await yixin.login('111', '1111');

const schedFunc = (async () => {
    // const response = await yixin.login('ljq132546', 'qq123123');
    // let loginArr = Common.clipResponse(JSON.stringify(response));
    // const token = loginArr[1];
    //1. 获取电话号码
    let getNum = await yixin.getMobileNumber('00833695f027a330aefd5113de41b8c345e8869a', '25232');
    let number = Common.clipResponse(JSON.stringify(getNum));
    const phoneNumb = number[1];
    console.log(phoneNumb);
    //获取短信
    let res = await yixin.getYanzhengMa('00833695f027a330aefd5113de41b8c345e8869a', '25232', );
})()
