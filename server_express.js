const express = require('express')
const app = express()
const routes = require('./routes/routes')

app
    .set('view engine', 'ejs')
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .get('/', routes)
    .get('/agendamento', routes)
    .post('/agendamento', routes)
    .listen(3000, () => console.log(`=== NODE SERVER LISTEN ON localhost:3000 ===`))