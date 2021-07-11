const { User } = require('../database/models');

async function cookieLoginMiddleware(req, res, next) {
	res.locals.isLogged = false;	
	let emailInCookie = req.cookies.userEmail;
	if (emailInCookie) {
		let userFromCookie = await User.findOne({
			where: { email: emailInCookie }});	
		req.session.userLogged = userFromCookie;
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}
	/*
	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}  */  
	next();
}


module.exports = cookieLoginMiddleware;