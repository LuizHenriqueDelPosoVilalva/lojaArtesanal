var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const produtoRouter = require('./routes/produtoRoutes')
const usuarioRouter = require('./routes/usuarioRoutes')
const autenticacaoRouter = require('./routes/autenticacaoRoutes')
const itemPedidoRouter = require('./routes/itensPedidoRoutes')
const mongoose = require('mongoose')

var app = express();

const mongoURI = 'mongodb+srv://luizvilalva:luizhuebr7849497@lojaartesanal.bylbvdn.mongodb.net/lojaartesanal?retryWrites=true&w=majority'

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Un-035677',  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

app.use('/', produtoRouter);
app.use('/usuario', usuarioRouter);
app.use('/autenticacao', autenticacaoRouter)
app.use('/carrinho', itemPedidoRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.render('error', {mensagem: "Algo deu errado"});
});

module.exports = app;
