function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	} else {

	//if (!req.session.userLogged) {
		return res.redirect('/users/login');
	}
	next();
}



module.exports = userLoggedMiddleware;