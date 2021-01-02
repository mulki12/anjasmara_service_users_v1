const uuid              = require('uuid');
const { User, Log, Otp }     = require('../../../models');
const Validator         = require('fastest-validator');
const moment            = require('moment');

const v = new Validator();

module.exports = async (req, res) => {

    const scope = req.params.scope;

    const schema = {
        user_id : 'string|empty:false',
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
    
    const user = await User.findOne({
        where : { uuid : req.body.user_id }
    })

    if (!user) {
        return res.status(404).json({
            status : false,
            message : "data pengguna tidak ditemukan"
        })
    }

    const otp_user = await Otp.findOne({
        where: { userId: req.body.user_id, scope: scope, hasBeenUse: 0, code: req.body.otp }
    })

    if (!otp_user) {
        return res.status(404).json({
            status : false,
            message : "otp tidak valid"
        })
    }

    const expire_token = (otp_user == null ? 0 : otp_user.expire);

    if (expire_token > moment().valueOf()) {

        const otp_update = await Otp.update({
            hasBeenUse: "1"
        },{
            where: { uuid: otp_user.uuid }
        })

        if (! otp_update) {
            return res.status(500).json({
                status: false,
                message: "something is wrong"
            })
        } 
          
        Log.create({
            "uuid"  : uuid.v4(),
            "scope" : scope,
            "data"  : "OTP Success to Receive",
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
            "data"  : "OTP expired",
            "userId": req.body.user_id
        });

        return res.status(404).json({
            status: false,
            message: 'kode otp kadaluarsa'
        })
    }

}