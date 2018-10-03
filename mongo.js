/**
 * A custom library to establish a database connection
 */
'use strict';
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var db = function() {
    return {

        /**
         * Open a connection to the database
         * @param conf
         */
        config: function() {
            var uri = '';
            uri = 'mongodb://' + '127.0.0.1' + '/' + 'TG';
            mongoose.connect(uri);
            var db = mongoose.connection;
            db.on('error', function callback() {
                console.log('something error');
            });
            db.once('open', function callback() {
                console.log('open success');
            });
        }
    };
};

module.exports = db();
