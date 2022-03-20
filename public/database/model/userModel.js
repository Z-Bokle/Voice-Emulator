const mongoose = require('mongoose')
var Schema = mongoose.Schema
// 通过mongoose获得schema对象
var userSchema = new Schema({
  mail: { type: String, required: true },
  ps: { type: String, required: true },
  age: Number,
  sex: { type: Number, default: 0 }
})

var User = mongoose.model('users', userSchema) // 该数据对象和集合关联('集合名', schema对象)

module.exports = User