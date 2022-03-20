const mongoose = require('mongoose')
var Schema = mongoose.Schema
// 通过mongoose获得schema对象
var codeSchema = new Schema({
  mail: { type: String, required: true },//用户名即邮箱
  code: { type: Number, required: true },//6位数字验证码
  time: { type: Number, required: true }//该验证码的生效时间点，来自Date.now()，单位为毫秒
})

var Code = mongoose.model('codes', codeSchema) // 该数据对象和集合关联('集合名', schema对象)

module.exports = Code