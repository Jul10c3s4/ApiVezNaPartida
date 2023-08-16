const express = require('express')
const app = express()
const admin = require("../routes/admin")

//Conexão com o mongo
const mongoose= require("mongoose")
const { encode } = require('punycode')


const Db_User = "julio"
const Db_Password = encodeURIComponent("96545146")

  const url = `mongodb://${Db_User}:${Db_Password}@ac-djbanuf-shard-00-00.qhiu5ry.mongodb.net:27017,ac-djbanuf-shard-00-01.qhiu5ry.mongodb.net:27017,ac-djbanuf-shard-00-02.qhiu5ry.mongodb.net:27017/Api-VezNaPartida?ssl=true&replicaSet=atlas-e2e8c0-shard-0&authSource=admin&retryWrites=true&w=majority` 
  mongoose.connect(url, {
    }).then(() => {
      console.log("MongoDB Conectado!!!");
    }).catch((erro) => {
      console.log("erro ao se connectar ao mongoDB"+erro);
    })

//forma de ler json
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())
//rotas

app.use("/admin", admin)

app.listen(8081, () => {
  console.log("servidor rodando na porta 8081");
})