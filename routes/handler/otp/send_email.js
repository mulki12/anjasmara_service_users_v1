const { User, Otp, Log }    = require('../../../models');
const mailer                = require('../../../config/gmail.js');
const Validator             = require('fastest-validator');
const uuid                  = require('uuid');
const moment                = require('moment');

const v = new Validator();

module.exports = async (req, res) => {

    const scope     = req.params.scope;

    const schema = {
        email : 'email|empty:false'
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

    const user = await User.findOne({
        where : { "email" : req.body.email, "scope" : scope }
    })

    if (!user) {
        return res.status(404).json({
            status : false,
            message : "data pengguna tidak ditemukan"
        })
    }

    const send_notif_by = "gmail";
    const code_otp = Math.floor(100000 + Math.random() * 900000)
    
    const created_otp = await Otp.create({
        "uuid"      : uuid.v4(),
        "scope"     : scope,
        "code"      : code_otp,
        "vendor"    : send_notif_by,
        "userId"    : user.uuid,
        "hasBeenUse": "0", 
        "expire"    : moment().add(5, 'minutes').valueOf()
    })

    if (created_otp) {

        let data = {
            from: process.env.EMAIL_ACCOUNT,
            to: user.email,
            subject: 'Anjasmara! Rahasiakan Kode OTP ' + user.name,
            html : '<strong>' + user.name + ',</strong> Kode OTP Anda Adalah <strong>' + created_otp.code + '</strong>!'
            
        };
            
        mailer(data);

        Log.create({
            "uuid"  : uuid.v4(),
            "scope" : scope,
            "data"  : "Mail Request OTP For Forgot Password Is Success",
            "userId": user.uuid
        });

        return res.status(200).json({
            status : true,
            message : "kode otp telah terkirim",
            data : {
                uuid : user.uuid
            }
        })
        
    } else {

        Log.create({
            "uuid"  : uuid.v4(),
            "scope" : scope,
            "data"  : "Mail Request OTP For Forgot Password Is Failed",
            "userId": user.uuid
        });

        return res.status(404).json({
            status : false,
            message : "something is wrong"
        })
    }

}