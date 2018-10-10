
var mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

var userSchema = new mongoose.Schema({
    phoneNumber: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
    //update
    updatedAt: { type: Date, default: Date.now },

}, {
    usePushEach: true,
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'PY'
});

userSchema.plugin(mongoosePaginate);
var User = mongoose.model('User', userSchema);

module.exports = User;



