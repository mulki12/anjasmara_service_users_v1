const { User, Log, Token } = require('../../../models');
const mailer        = require('../../../config/gmail.js');
const uuid          = require('uuid');
const Validator     = require('fastest-validator');
const bcrypt        = require('bcrypt');

const v = new Validator();

module.exports = async (req, res) => {

    const saltR = 8;
    const scope = req.params.scope;

    const schema = {
        user_id         : 'string|empty:false',
        password_baru   : 'string|empty:false'
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
        where: { uuid : req.body.user_id }
    })

    if (user.length !== 1) {
        return res.status(404).json({
            status: false,
            message: 'user not found'
        });
    }

    bcrypt.genSalt(saltR, async (err, salt) => {
        bcrypt.hash(req.body.password_baru, salt, async (err, hash) => {
            
            const user_find = user[0];

            const user_update = await User.update({
                password : hash
            }, {
                where : { uuid : user_find.uuid }
            });

            const delete_token = await Token.destroy({
                where : { "user_id" : user_find.uuid }
            });

            if (user_update) {
                Log.create({
                    "uuid"  : uuid.v4(),
                    "scope" : scope,
                    "data"  : "Reset Password is Success",
                    "userId": user_find.uuid
                })

                return res.json({
                    status : true,
                    message : "success"
                });
            } else {
                Log.create({
                    "uuid"  : uuid.v4(),
                    "scope" : scope,
                    "data"  : "Reset Password is Failed",
                    "userId": data.uuid
                })

                return res.status(500).json({
                    status : false,
                    message : "something is wrong"
                })
            }

        })
    })

}