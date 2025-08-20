const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')

const app = express()
const PORT = 3000;

app.use(bodyParser.json())

app.use('/', authRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})