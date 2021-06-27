const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const methodOverride = require ('method-override')

const app = express();
const path = require('path');
const puerto = process.env.PORT;

const homeRouter = require('./routes/homeRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const servicesRouter = require('./routes/servicesRouter');

const cookieLoginMiddleware = require('./middlewares/cookieLoginMiddleware');


app.set('views', path.resolve(__dirname, './views'));
app.set ('view engine', 'ejs');



app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());
app.use(cookieLoginMiddleware);
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));

app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/services', servicesRouter);


app.listen (puerto || 3000, () => {
    console.log('Servidor levantado en el puerto 3000');
});