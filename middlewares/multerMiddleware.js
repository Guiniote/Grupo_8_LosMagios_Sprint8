const path = require('path');
const multer = require('multer');



const storageProduct = multer.diskStorage({
	destination: path.resolve(__dirname, '../public/images'), //Acá había solo un punto, pero en router teníamos dos. Así que lo puse igual.
	
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadProduct = multer({ storage: storageProduct });

const storageAvatar = multer.diskStorage({
	destination: path.resolve(__dirname, '../public/images/avatars'),

	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadAvatar= multer({ storage: storageAvatar });



module.exports = {uploadProduct, uploadAvatar}