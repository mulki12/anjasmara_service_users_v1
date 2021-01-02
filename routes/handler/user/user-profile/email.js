const { User, Log } = require('../../../../models')
const uuid          = require('uuid')
const Validator     = require('fastest-validator')

const v = new Validator();

module.exports = async (req, res) => {

    const scope = req.params.scope;

    const schema = {
        user_id         : 'string|empty:false',
        email_baru      : 'string|empty:false'
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

    const user_detail = await User.findOne({
        where : { 'uuid' : req.body.user_id }
    });

    if (! user_detail) {
        return res.status(404).json({
            status : false,
            message : 'data pengguna tidak ditemukan'
        });
    }

    const user_update = await User.update({
        email : req.body.email_baru
    }, {
        where : { 'uuid' : req.body.user_id }
    })

    if (user_update) {
        Log.create({
            "uuid"  : uuid.v4(),
            "scope" : scope,
            "data"  : "Change Email is Success",
            "userId": req.body.user_id
        })
        return res.status(200).json({
            status : true,
            message : 'success',
            data : await User.findOne({
                where : {'uuid':req.body.user_id}
            })
        })
    } else {
        Log.create({
            "uuid"  : uuid.v4(),
            "scope" : scope,
            "data"  : "Change Email is fail",
            "userId": req.body.user_id
        })
        return res.status(500).json({
            status : false,
            message : 'something is wrong'
        })
    }


}