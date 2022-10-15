const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const router = require('./routes/route')
const MY_Configuration = require('./constante/constante');
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
app.use(router)
const port = 3001
app.listen(process.env.PORT || port , (err) => {
    if(err)
      console.log('¡No se puede iniciar el servidor!')
  else
      console.log('El servidor comenzó a ejecutarse en:' + port);
  })