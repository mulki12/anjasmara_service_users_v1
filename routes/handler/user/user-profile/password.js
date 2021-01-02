const { User, Log } = require('../../../../models')
const uuid          = require('uuid')
const bcrypt        = require('bcrypt')
const Validator     = require('fastest-validator')

const v = new Validator();

module.exports = async (req, res) => {

    const saltR = 8
    const scope = req.params.scope;

    const schema = {
        user_id            : 'string|empty:false',
        password_lama      : 'string|empty:false',
        password_baru      : 'string|empty:false'
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

    if (!user_detail) {
        return res.status(404).json({
            status : false,
            message : 'data pengguna tidak ditemukan'
        })
    }

    bcrypt.compare(req.body.password_lama, user_detail.password, async (err, result) => {

        if (!result) {

            Log.create({
                "uuid"  : uuid.v4(),
                "scope" : scope,
                "data"  : "Old Password is wrong",
                "userId": req.body.user_id
            });

            return res.status(401).json({
                status: false,
                message : "password lama anda salah",
            })
        }
        
    });

    bcrypt.genSalt(saltR, async (err, salt) => {
        bcrypt.hash(req.body.password_baru, salt, async (err, hash) => {

            const user_updated = await User.update({
                password : hash
            }, {
                where : { 'uuid' : req.body.user_id }
            })

            if (user_updated) {
                Log.create({
                    "uuid"  : uuid.v4(),
                    "scope" : scope,
                    "data"  : "Update New Password is success",
                    "userId": req.body.user_id
                });
                
                return res.status(200).json({
                    status : true,
                    message : "success"
                })
            } else {
                Log.create({
                    "uuid"  : uuid.v4(),
                    "scope" : scope,
                    "data"  : "Update New Password is fail",
                    "userId": req.body.user_id
                });
                
                return res.status(500).json({
                    status : false,
                    message : "something is wrong"
                })
            }

        })
    })

}