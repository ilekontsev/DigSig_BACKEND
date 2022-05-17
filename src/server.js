const { inject, errorHandler } = require('express-custom-error')
inject()

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/DigSigDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connected')
  })
  .catch((err) => {
    console.log('error', err)
  })

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')

const PORT = 3000
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))


app.use(errorHandler())
app.use(cookieParser())
app.use(cors({ origin: '*' }))
app.use(helmet())


app.use('/', (req,res, next) => {
    console.log(req.url + " " +  req.method);
    next();
})
app.use('/', require('./routes/logicSignRoute') )
app.use('/', require('./routes/userRouter'))
app.use('/', require('./routes/mailRouter'))


app.use('*', (req, res) => {
  res.status(404).json({ status: false, message: 'Endpoint Not Found' })
})

app.listen(PORT, () => console.info('Server listening on port ', PORT))
