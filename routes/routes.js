const express = require('express')
const router = express.Router()
const db = require('../config/db_mysql')

router
    .get('/', (req, res, next) => {
        res.render('index')
    })

    .get('/agendamento', (req, res) => {
        db.connect((err) => {
            let sql = 'SELECT * FROM cadastro'
            db.query(sql, (err, result, fields) => {
                if (err) throw err
                res.render('agendamento', {
                    foo: result
                })
            })
        })
    })

    .post('/agendamento', (req, res) => {
        db.connect((err) => {
            // if(err)throw err //CAUSA UM ERRO DE HANDSHAKE

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
                console.log("=== SQL INSERT query success! ===")
            })
            res.redirect('/agendamento')
        })
    })

    module.exports = router