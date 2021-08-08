const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = '3000'
const table = 'cadastro'
const mysql = require('mysql')
const ejs = require('ejs')

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydatabase',
})

app
    .set('view engine', 'ejs')
    // .use(express.static('views'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .get('/', (req, res) => {
        res.render('index')
    })

    .post('/agendamento', (req, res) => {
        db.connect((err) => {
            // if(err)throw err //CAUSA UM ERRO DE HANDSHAKE
            console.log("=== Mysql mydatabase connected ===")

            let sql = 'INSERT INTO cadastro (nome,cpf,idade,comorbidade,endereco) VALUES (?,?,?,?,?)'
            let values = [
                req.body.nome,
                req.body.cpf,
                req.body.idade,
                req.body.comorbidade,
                req.body.endereco
            ]

            db.query(sql, values, (err, result, fields) => {
                if (err) {
                    return console.log(err.message)
                }
            })
        })
        db.connect((err) => {
            let sql = 'SELECT * FROM cadastro'
            db.query(sql, (err, result, fields) => {
                if (err) throw err
                res.render('agendamento', {foo: result})
            })
        })
    })

    .listen(port, () => console.log(`=== SERVER LISTEN ON localhost:${port} ===`))