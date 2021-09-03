const { User, Otp, Log, Token } = require('../../../models');
const mailer        = require('../../../config/gmail.js');
const Validator     = require('fastest-validator');
const uuid          = require('uuid');
const moment        = require('moment');
const bcrypt        = require('bcrypt');

const v = new Validator();

module.exports = async (req, res) => {

    const scope = req.params.scope;

    const schema = {
        email       : 'email|empty:false',
        password    : 'string|empty:false'
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

    const user = await User.findAll({
        where: { email: req.body.email, scope: req.params.scope }
    })

    if (user.length !== 1) {
        return res.status(404).json({
            status: false,
            message: 'email not found'
        });
    }

    bcrypt.compare(req.body.password, user[0].password, async (err, result) => {

        const user_find = user[0];

        if (result)
        {    

            const delete_token = await Token.destroy({
                where : { "user_id" : user_find.uuid }
            });

            const user_update = await User.update({
                lastLogin : moment().format('YYYY-MM-DD H:m:s')
            }, {
                where : { uuid : user_find.uuid }
            });

            const send_notif_by = "email";
            const code_otp      = Math.floor(100000 + Math.random() * 900000)
            
            const otp = {
                "uuid"      : uuid.v4(),
                "scope"     : scope,
                "code"      : code_otp,
                "vendor"    : send_notif_by,
                "userId"    : user_find.uuid,
                "hasBeenUse": "0", 
                "expire"    : moment().add(5, 'minutes').valueOf()
            }

            const created_otp = Otp.create(otp)

            // TODO send mail notification
            if (created_otp) {
                mailer({
                    from: process.env.EMAIL_ACCOUNT,
                    to: user[0].email,
                    subject: 'Anjasmara! Login Sukses ' + user_find.name,
                    html : '<strong>' + user_find.name + ',</strong> Kode OTP Anda Adalah <strong>' + otp.code + '</strong>'
                });
    
                console.log("otp will be send : " + otp.code)
    
                const data = {
                    "uuid"  : uuid.v4(),
                    "scope" : scope,
                    "data"  : "Mail Request OTP For Login Success",
                    "userId": user_find.uuid
                };
    
                Log.create(data);
            } else {
                const data = {
                    "uuid"  : uuid.v4(),
                    "scope" : scope,
                    "data"  : "Mail Request OTP For Login Fail",
                    "userId": user_find.uuid
                };
    
                Log.create(data);
            }

            const data = {
                "uuid"  : uuid.v4(),
                "scope" : scope,
                "data"  : "User Login Success",
                "userId": user_find.uuid
            };

            Log.create(data);

            return res.status(200).json({
                status  : true,
                message : 'success',
                data    : await User.findOne({
                    where: { uuid : user_find.uuid }
                })
            })
        }
        else {
            const data = {
                "uuid"  : uuid.v4(),
                "scope" : scope,
                "data"  : "User Login Failed, Password is wrong",
                "userId": user_find.uuid
            };

            Log.create(data);

            return res.status(401).json({
                status: false,
                message : "password anda salah",
            })
        }
     })
  
}