
// routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
const controllermal = require('../controllers/controllerMail');

const path = require('path');


// configuración de almacenamiento y guardado de immagenes
const multer  = require('multer')

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
     cb(null, './uploads')
    },
    filename: (req,file,cb)=>{
     const ext = path.extname(file.originalname);
     cb(null, file.originalname+ '-' + Date.now() + ext);
     //cb(null,file.originalname)
    }
 
 })

 const upload = multer({storage})


router.get('/youtubev2', controller.youtube);

router.post('/formdata', upload.single('imagen'),controllermal.upimg)




module.exports = router;

