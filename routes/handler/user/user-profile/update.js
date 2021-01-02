const { User, Log } = require('../../../../models');
const uuid          = require('uuid');

module.exports = async (req, res) => {

    const scope = req.params.scope;
    const uid   = req.params.id;

    const user_detail = await User.findOne({
        where : { 'uuid' : uid }
    })

    if (!user_detail) {
        return res.status(404).json({
            'status' : false,
            'message' : 'data pengguna tidak ditemukan'
        });
    }

    const user_update = await User.update({
        "name"      : req.body.name,
        "phone"     : req.body.phone,
        "address"   : req.body.address,
    }, {
        where : { 'uuid' : uid }
    });

    if (user_update) {

        Log.create({
            "uuid"  : uuid.v4(),
            "scope" : scope,
            "data"  : "Update Profile is Success",
            "userId": uid
        })

        return res.json({
            status : true,
            message : "success",
            data : await User.findOne({
                where : { "uuid" : uid }
            })
        })
    } else {

        Log.create({
            "uuid"  : uuid.v4(),
            "scope" : scope,
            "data"  : "Update Profile is fail",
            "userId": uid
        })

        return res.status(500).json({
            status : false,
            message : "something is wrong"
        });
    }

}