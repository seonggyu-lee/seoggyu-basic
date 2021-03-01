const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded --> 이렇게된 데이터를 가져올수 있게함
app.use(bodyParser.urlencoded({extended: true}));
//application/json --> json 타입으로 된 정보를 가져올수 있게함 
app.use(bodyParser.json());

//bodyParser는 client에서 오는정보를 서버에서 분석해서 가져올수 있게 해주는것
//
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongooseDB Connection...'))
.catch(err => console.log(err ))

app.get('/', (req, res) => {
  res.send('Hello World!~~ 안녕하세요 새해복 많이 받으세요 오오오나')
})

app.post('/register', (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면 
  //그것들을 데이터 베이스에 넣어준다 .

    const user = new User(req.body)

    user.save((err, userInfo) => {
      if(err) return res.json({ success: false, err})
      return res.status(200).json({
        success: true
      }) 
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})