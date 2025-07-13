const multer = require('multer');   // Import multer for handling file uploads\

// configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // specify the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`);  // specify the filename
    }
})


// file filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)) {
        cb(null, true);  // accept the file
    } else {
        cb(new Error('only .jpeg, .png, .jpg files are allowed'), false);  // reject the file
    }
}


const upload = multer({
    storage,
    fileFilter
});


module.exports = upload;
