const jsonWebToken = require('jsonwebtoken');
const moment       = require('moment');
const multer       = require('multer');
const path         = require('path')
const express      = require('express');

const router = express.Router();

const otpHandler          = require('./handler/otp')
const userHandler         = require('./handler/user')
const userProfileHandler  = require('./handler/user/user-profile');

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

function json_web_token_verified (req, res, next) {

  try {
    const authorization = req.headers.authorization;
    const token         = authorization.split(" ");
    const decode = jsonWebToken.verify(token[1], process.env.SECRET_KEY)
    if (decode) {
      if (decode.exp > moment().valueOf()) {
        next()
      } else {
          res.status(404).json({
              status : false,
              message : 'token kadaluarsa'
          })
      }
    }
  } catch (error) {

    res.status(500).json({
      'status' : false,
      'message' : 'token tidak valid'
    });

  }
  
}

function scope_checking(req, res, next) {
  const scope_of_scope = ["customer", "partner", "dashboard"];

  if (scope_of_scope.includes(req.params.scope)) {
    next()
  } else {
    res.status(404).json({
      'status' : false,
      'message' : 'url not found'
    });
  }

}

router.post('/v1/:scope/register', scope_checking, userHandler.register)
router.post('/v1/:scope/login', scope_checking, userHandler.login)
router.post('/v1/:scope/aktivasi', scope_checking, userHandler.aktivasi)
router.post('/v1/:scope/lupa_password', scope_checking, userHandler.forgot_password)

router.get('/v1/:scope/detail/:id', [scope_checking, json_web_token_verified], userProfileHandler.detail)
router.put('/v1/:scope/update/:id', [scope_checking, json_web_token_verified], userProfileHandler.update)
router.put('/v1/:scope/latlng/:id', [scope_checking, json_web_token_verified], userProfileHandler.latlng)
router.put('/v1/:scope/chng-email', [scope_checking, json_web_token_verified], userProfileHandler.cemail)
router.put('/v1/:scope/chng-passw', [scope_checking, json_web_token_verified], userProfileHandler.cpassw)
router.put('/v1/:scope/photo-profile', [scope_checking, json_web_token_verified, multer({storage:diskStorage}).single('photo')], userProfileHandler.photo)

router.post('/v1/:scope/send_otp', scope_checking, otpHandler.send_otp)
router.post('/v1/:scope/send_email', scope_checking, otpHandler.send_email)
router.post('/v1/:scope/receive_otp', scope_checking, otpHandler.receive_otp)

router.post('/v1/:scope/verify', [scope_checking, json_web_token_verified], userHandler.verify)

module.exports = router;
