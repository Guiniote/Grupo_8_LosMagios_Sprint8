const path = require('path');
const multer = require('multer');



const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../public/images'); //Acá había solo un punto, pero en router teníamos dos. Así que lo puse igual.
	},
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadFile = multer({ storage });



module.exports = uploadFile;