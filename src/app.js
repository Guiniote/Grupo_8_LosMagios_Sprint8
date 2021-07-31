const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const methodOverride = require ('method-override')

const app = express();
const path = require('path');
const puerto = process.env.PORT;

const homeRouter = require('./routes/homeRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const servicesRouter = require('./routes/servicesRouter');
const coursesRouter = require('./routes/coursesRouter');
const apiUsersRouter = require('./routes/api/apiUsersRouter');
const apiProductsRouter = require('./routes/api/apiProductsRouter');
const apiServicesRouter = require('./routes/api/apiServicesRouter');
const apiCoursesRouter = require('./routes/api/apiCoursesRouter');


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
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/services', servicesRouter);
app.use('/courses', coursesRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);
//app.use('/api/services', apiServicesRouter);
//app.use('/api/courses', apiCoursesRouter);


app.listen (puerto || 3000, () => {
    console.log('Servidor levantado en el puerto 3000');
});