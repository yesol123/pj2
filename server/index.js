const express = require('express')
const cors = require('cors')
const fs = require('fs');
const app = express()
//fs 모듈 - readFileSync(): 읽기,WriteFileSync():쓰기

const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // 파서 등록! 


app.get('/', function (req, res) { 
    const jD = fs.readFileSync('./gameData.json') 
    res.send( JSON.parse(jD) )
  })

app.post('/insert', function (req, res) {
    const jD = JSON.parse(fs.readFileSync('./gameData.json'))  //파서로 읽어올 수 있도록
    fs.writeFileSync('./gameData.json', JSON.stringify([...jD,req.body])); //기존 게임데이터와 신규 게임데이터를 쌓아주기 
    res.send("저장");
})



app.listen(3033)