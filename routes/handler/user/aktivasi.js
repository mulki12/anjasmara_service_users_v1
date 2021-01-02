const uuid                              = require('uuid');
const { User, Otp, Token, Pin, Log }    = require('../../../models');
const jsonWebToken                      = require('jsonwebtoken');
const Validator                         = require('fastest-validator');
const moment                            = require('moment');

const v = new Validator();

module.exports = async (req, res) => {

    const scope = req.params.scope;

    const schema = {
        userId  : 'string|empty:false',
        otp     : 'string|length:6'
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

    const otp_user = await Otp.findOne({
        where: { userId: req.body.userId, scope: scope, hasBeenUse: 0, code: req.body.otp }
    })

    const expire_token = (otp_user == null ? 0 : otp_user.expire);

    if (expire_token > moment().valueOf()) {

        const user_information = await User.findOne({
            where: { uuid: otp_user.userId }
        })

        const otp_update = await Otp.update({
            hasBeenUse: "1"
        },{
            where: { uuid: otp_user.uuid }
        })

        const user_status = await User.update({
            status: "1",
            fcm : req.body.fcm
        }, {
            where: {uuid: user_information.uuid}
        });

        if (! otp_update) {
            const data = {
                "uuid"  : uuid.v4(),
                "scope" : scope,
                "data"  : "PIN Fail to Activation",
                "userId": uid
            };
    
            Log.create(data);

            return res.status(500).json({
                status: false,
                message: "something is wrong"
            })
        }

        const uid = user_information.uuid;
        const iat = moment().valueOf();
        const exp = moment().add(1, 'months').valueOf();

        const token = await jsonWebToken.sign({
            user_id : uid,
            user : user_information,
            iat: iat,
            exp: exp
        }, process.env.SECRET_KEY);

        const refresh_token_new = Token.create({
            "iat" : iat,
            "exp" : exp,
            "userId" : uid
        });

        const pin_data = await Pin.findOne({
            where : { userId : uid }
        })

        const data = {
            "uuid"  : uuid.v4(),
            "scope" : scope,
            "data"  : "PIN Success to Activation",
            "userId": uid
        };

        Log.create(data);

        return res.status(200).json({
            status: true,
            message : 'success',
            data: {
                user: user_information,
                pin : (pin_data == null) ? null : pin_data.pin,
                accessToken : token
            }
        })
    } else {

        const data = {
            "uuid"  : uuid.v4(),
            "scope" : scope,
            "data"  : "PIN Expired to Activation",
            "userId": req.body.userId
        };

        Log.create(data);

        return res.status(404).json({
            status: false,
            message: 'kode otp kadaluarsa'
        })
    }
}