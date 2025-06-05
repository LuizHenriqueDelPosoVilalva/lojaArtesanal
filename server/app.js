var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const session = require('express-session')
const produtoRouter = require('./routes/produtoRoutes')
const usuarioRouter = require('./routes/usuarioRoutes')
const autenticacaoRouter = require('./routes/autenticacaoRoutes')
const itemPedidoRouter = require('./routes/itensPedidoRoutes')
const mongooseConfig = require('./config/db')

var app = express()

mongooseConfig

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: 'Un-035677',  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}))


app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null
  next()
})

app.use('/', produtoRouter);
app.use('/usuario', usuarioRouter);
app.use('/autenticacao', autenticacaoRouter)
app.use('/carrinho', itemPedidoRouter)

module.exports = app
