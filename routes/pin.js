const jsonWebToken       = require('jsonwebtoken');
const moment             = require('moment');
const Validator          = require('fastest-validator');
const uuid               = require('uuid');
const bcrypt             = require('bcrypt');
const { Pin, Log, User } = require('../models');
const express            = require('express');

const router = express.Router();

const v = new Validator();

function json_web_token_verified (req, res, next) {

    try {
      const authorization = req.headers.authorization;
      const token         = authorization.split(" ");
      const decode        = jsonWebToken.verify(token[1], process.env.SECRET_KEY)
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
        console.log(error)
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

router.post('/v1/:scope/pin', [scope_checking, json_web_token_verified], async (req, res) => {
    
    const saltR     = 8;
    const scope     = req.params.scope;

    const schema = {
        user_id : 'string|empty:false',
        pin     : 'string|empty:false'
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {

        let field = '';

        validate.forEach(element => {
            field += element.field + ' '
        });

        return res.status(404).json({
            status  : false,
            message : 'kolom ' + field + 'tidak boleh kosong',
            error : validate
        });

    }

    const user_detail = await User.findOne({
        where : { "uuid" : req.body.user_id }
    });

    if (!user_detail) {
        return res.status(404).json({
            status : false,
            message : 'data pengguna tidak ditemukan'
        });
    }

    const pin_detail = await Pin.findOne({
        where : { "userId" : req.body.user_id }
    });

    if (pin_detail) {

        if (req.body.reset == "reset") {
            bcrypt.genSalt(saltR, async (err, salt) => {
                bcrypt.hash(req.body.pin, salt, async (err, hash) => {
                    const pin_updated = await Pin.update({
                        pin : hash
                    }, {
                        where : { "user_id" : req.body.user_id }
                    });
        
                    if (pin_updated) {
                        Log.create({
                            "uuid"  : uuid.v4(),
                            "scope" : scope,
                            "data"  : "Passowrd Reset is Success",
                            "userId": req.body.user_id
                        })
                        return res.status(200).json({
                            status : true,
                            message : "pin reset is success"
                        })
                    } else {
                        Log.create({
                            "uuid"  : uuid.v4(),
                            "scope" : scope,
                            "data"  : "Passowrd Reset is fail",
                            "userId": req.body.user_id
                        })
                        return res.status(500).json({
                            status : false,
                            message : "something is wrong"
                        })
                    }
                })
            })
        } else {
            return res.status(200).json({
                status : true,
                message : 'pin anda telah terdaftar'
            });
        }
    }

    bcrypt.genSalt(saltR, async (err, salt) => {
        bcrypt.hash(req.body.pin, salt, async (err, hash) => {
            const pin_created = await Pin.create({
                uuid : uuid.v4(),
                pin : hash,
                is_locked : "0",
                userId : req.body.user_id
            });

            if (pin_created) {
                Log.create({
                    "uuid"  : uuid.v4(),
                    "scope" : scope,
                    "data"  : "Passowrd Created is Success",
                    "userId": req.body.user_id
                })
                return res.status(200).json({
                    status : true,
                    message : "pin success"
                })
            } else {
                Log.create({
                    "uuid"  : uuid.v4(),
                    "scope" : scope,
                    "data"  : "Passowrd Created is fail",
                    "userId": req.body.user_id
                })
                return res.status(500).json({
                    status : false,
                    message : "something is wrong"
                })
            }
        })
    })

});

router.put('/v1/:scope/pin', [scope_checking, json_web_token_verified], async (req, res) => {
    
    const saltR     = 8;
    const scope     = req.params.scope;

    const schema = {
        user_id     : 'string|empty:false',
        pin_lama    : 'string|empty:false',
        pin_baru    : 'string|empty:false'
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {

        let field = '';

        validate.forEach(element => {
            field += element.field + ' '
        });

        return res.status(404).json({
            status  : false,
            message : 'kolom ' + field + 'tidak boleh kosong',
            error : validate
        });

    }

    const user_detail = await User.findOne({
        where : { "uuid" : req.body.user_id }
    });

    if (!user_detail) {
        return res.status(404).json({
            status : false,
            message : 'data pengguna tidak ditemukan'
        });
    }

    const pin_detail = await Pin.findOne({
        where : { "userId" : req.body.user_id }
    });

    if (!pin_detail) {
        return res.status(404).json({
            status : false,
            message : 'pin belum dibuat'
        });
    }

    const check_pin = await bcrypt.compare(req.body.pin_lama, pin_detail.pin);

    if (check_pin) {
        bcrypt.genSalt(saltR, async (err, salt) => {
            bcrypt.hash(req.body.pin_baru, salt, async (err, hash) => {

                const update_pin = await Pin.update({
                    pin : hash
                }, {
                    where : { "userId" : req.body.user_id }
                })
    
                if (update_pin) {
            
                    Log.create({
                        "uuid"  : uuid.v4(),
                        "scope" : scope,
                        "data"  : "PIN Success to updated",
                        "userId": req.body.user_id
                    });

                    return res.json({
                        status : true,
                        message : "success"
                    })

                } else {
            
                    Log.create({
                        "uuid"  : uuid.v4(),
                        "scope" : scope,
                        "data"  : "PIN Updated is fail",
                        "userId": req.body.user_id
                    });

                    return res.status(500).json({
                        status : false,
                        message : "something is wrong!"
                    })
                }
                
            });
        });
    } else {

        Log.create({
            "uuid"  : uuid.v4(),
            "scope" : scope,
            "data"  : "PIN Old not match",
            "userId": req.body.user_id
        });

        return res.status(401).json({
            status : false,
            message : "pin tidak cocok"
        });
    }
})

module.exports = router;