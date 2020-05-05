const express = require('express')

// 使用mongoose
const mongoose = require('mongoose') 

const app = express()

// 链接mongo 并使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL);
mongoose.connection.once('open', function() {
  // we're connected!
  console.log('mongo connected')
});

// 类似于mysql的表， mongo有文档、字段的概念
// users: 表名， username,age: 字段名
const User = mongoose.model('users', new mongoose.Schema({
  username: {type: String, require: true},
  age: {type: Number, require: true}
}))
// find findOne update remove create
// User.create({
//   username: '刘翔',
//   age: 24
// }, function(err, doc){
//   if(!err){
//     console.log(doc)
//   }else{
//     console.log(err)
//   }
// })


app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>')
})

app.get('/data', function(req, res){
  User.find({}, function(err, doc){
    return res.json(doc)
  })
  // res.json({
  //   "name": "马瑞华"
  // })
})
app.get('/delete', function(req, res){
  User.remove({age: 12}, function(err, doc){
    res.send('ok')
  })
})
app.update({"name":"马瑞华"}, {'$set':{age: 18 }}, function(err, doc){
  console.log(doc)
})


app.listen(9093, function(){
  console.log('Node app listen at port 9093')
})

// res.send res.json res.sendfile 相应不同的内容