const yixin = require('./yixin');
console.log(yixin)
// const response = await yixin.login('111', '1111');
new Promise(function(resolve, reject) {
    resolve('start');
}).then(function(data) {
    return yixin.login('ljq132546', 'qq123123');
}).then((response) => {
    
})