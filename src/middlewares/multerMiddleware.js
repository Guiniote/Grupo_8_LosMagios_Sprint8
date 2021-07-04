const path = require('path');
const multer = require('multer');



const storageProduct = multer.diskStorage({
	destination: path.resolve(__dirname, '../../public/images'), 
	
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadProduct = multer({ storage: storageProduct });


const storageAvatar = multer.diskStorage({
	destination: path.resolve(__dirname, '../../public/images/avatars'),

	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadAvatar= multer({ storage: storageAvatar });


const storageService = multer.diskStorage({
	destination: path.resolve(__dirname, '../../public/images'), 
	
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadService = multer({ storage: storageService });


const storageCourse = multer.diskStorage({
	destination: path.resolve(__dirname, '../../public/images'), 
	
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadCourse = multer({ storage: storageCourse });




module.exports = {uploadProduct, uploadAvatar, uploadService, uploadCourse}