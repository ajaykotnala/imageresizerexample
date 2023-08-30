const multer = require("multer");

const timestamp = Date.now();
const multerStorage = multer.diskStorage({
  destination: "./uploads/source",
  filename: (req, file, cb) => {
    cb(null, `${timestamp}--${file.originalname}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({ 
  storage: multerStorage, 
  fileFilter: multerFilter
});


const uploadFiles = upload.array("images", 10); 

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) { 
      if (err.code === "LIMIT_UNEXPECTED_FILE") { 
         console.log('Too many images exceeding the allowed limit');
      }
    } else if (err) {
      console.log('error on multer', err)
    }

    if (!req.files) return next();

    req.body.images = [];
    req.files.map(async file => {
      const newFilename = `${timestamp}--${file.originalname}`;
      req.body.images.push(newFilename);
    })
    next();
  });
};

module.exports = {
  uploadImages
}