const mongoose = require('mongoose');
const error = require('koa-json-error');
const {connectionBaseStr} = require('../config');

module.exports = () => {
  return async () => {
    // 连接数据库
    mongoose.connect(connectionBaseStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () => {
      console.log('数据库连接成功');
    })
    .catch(err => {
      console.log(err);
    });

    mongoose.connection.on(error, console.error);
  };
};
