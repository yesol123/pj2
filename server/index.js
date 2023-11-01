const express = require('express')
const cors = require('cors')
const fs = require('fs');
const app = express()

const bodyParser = require('body-parser');
const axios = require('axios');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) // 파서 등록!

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const instant = axios.create({
  baseURL: 'https://opendict.korean.go.kr',
  params: { key: '4E4101E1F9C6B578FCE4D6CABE483676' },
  timeout: 5000,
  headers: { 'Content-Type': 'text/json', 'charset': 'UTF-8' }
})

app.get('/openapi', async function (req, res) {
  const {randomWord} = req.query;
  const a = await instant.get(`/api/search?target_type=search&req_type=json&part=word&q=${randomWord}`)
  res.send(a.data)
})

app.get('/', function (req, res) {
  const jD = fs.readFileSync('./gameData.json')
  res.send(JSON.parse(jD))
})

app.post('/insert', function (req, res) {
  const jD = JSON.parse(fs.readFileSync('./gameData.json'))  //파서로 읽어올 수 있도록
  fs.writeFileSync('./gameData.json', JSON.stringify([...jD, req.body])); //기존 게임데이터와 신규 게임데이터를 쌓아주기 
  res.send("저장");
})



app.listen(3033)