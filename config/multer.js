const multer = require("multer")

const path = require("path")

//onde fica as configurações de onde serão salvas as imagens
const storage = multer.diskStorage({
  //onde se configura qual o lugar onde o arquivo será salvo
  destination: function(req, file, cb) {
    cb(null, "uploads/")
  },
  //
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
})

const upload = multer({ storage });

module.exports = upload;