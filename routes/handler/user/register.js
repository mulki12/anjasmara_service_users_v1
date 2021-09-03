const uuid          = require('uuid');
const UniqueString  = require('unique-string');
const bcrypt        = require('bcrypt');
const moment        = require('moment');
const mailer        = require('../../../config/gmail.js');
const { User, Otp, Log } = require('../../../models');
const Validator     = require('fastest-validator');

const v = new Validator();

module.exports = async (req, res) => {

    const saltR  = 8;
    
    const schema = {
        name    : 'string|empty:false',
        email   : 'email|empty:false',
        password: 'string|empty:false',
        nohp    : 'string|empty:false'
    }

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

    const email_user = await User.findOne({
        where: { email: req.body.email, scope: req.params.scope }
    });
    
    if (email_user) {
        return res.status(200).json({
            status  : false,
            message : 'email telah terdaftar'
        });
    }

    const nohp_user = await User.findOne({
        where: { phone: req.body.nohp, scope: req.params.scope }
    });
    
    if (nohp_user) {
        return res.status(200).json({
            status  : false,
            message : 'nohp telah terdaftar'
        });
    }

    bcrypt.genSalt(saltR, async (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {

            const data = {
                "uuid"      : uuid.v4(),
                "name"      : req.body.name,
                "email"     : req.body.email,
                "password"  : hash,
                "phone"     : req.body.nohp,
                "scope"     : req.params.scope,
                "token"     : UniqueString()
            }

            const created_user = await User.create(data)

            if (created_user)
            { 
                const send_notif_by = "email";

                const code_otp = Math.floor(100000 + Math.random() * 900000)
                
                const otp = {
                    "uuid"      : uuid.v4(),
                    "scope"     : req.params.scope,
                    "code"      : code_otp,
                    "vendor"    : send_notif_by,
                    "userId"    : data.uuid,
                    "hasBeenUse": "0", 
                    "expire"    : moment().add(5, 'minutes').valueOf()
                }

                const created_otp = await Otp.create(otp)

                // TODO send mail notification
                if (created_otp) {
                    mailer({
                        from: process.env.EMAIL_ACCOUNT,
                        to: req.body.email,
                        subject: 'Anjasmara! Registrasi Sukses ' + req.body.name,
                        html : '<strong>' + req.body.name + ',</strong> Kode OTP Anda Adalah <strong>' + otp.code + '</strong> untuk aktifasi akun!'
                    });
        
                    console.log("otp will be send : " + otp.code)
        
                    const data_log = {
                        "uuid"  : uuid.v4(),
                        "scope" : req.params.scope,
                        "data"  : "Mail Request OTP For Login Success",
                        "userId": data.uuid
                    };
        
                    Log.create(data_log);
                } else {
                    const data_log = {
                        "uuid"  : uuid.v4(),
                        "scope" : req.params.scope,
                        "data"  : "Mail Request OTP For Login Fail",
                        "userId": data.uuid
                    };
        
                    Log.create(data_log);
                    console.log("otp fail")
                }

                const data_log = {
                    "uuid"  : uuid.v4(),
                    "scope" : req.params.scope,
                    "data"  : "User Register is Success",
                    "userId": data.uuid
                };
    
                Log.create(data_log);

                // TODO send to message broker to Service Wallet

                return res.json({
                    status : true,
                    message : 'success',
                    data : data
                });
            }
            else
            {
                const data_log = {
                    "uuid"  : uuid.v4(),
                    "scope" : req.params.scope,
                    "data"  : "User Register is Success",
                    "userId": data.uuid
                };
    
                Log.create(data_log);

                return res.status(500).json({
                    status : false,
                    message : 'something is wrong'
                });
            }
        });
    });
}