function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('/user/login');
        //modificar ruteo cuando se realice el login
	}
	next();
}

module.exports = guestMiddleware;