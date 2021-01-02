const { User, Log } = require('../../../../models')
const uuid          = require('uuid')

module.exports = async (req, res) => {

    let scope = req.params.scope;
    
    const user_detail = await User.findOne({
        where : { uuid : req.params.id }
    })

    if (user_detail) {

        Log.create({
            "uuid"  : uuid.v4(),
            "scope" : scope,
            "data"  : "Get Profile Data is Success",
            "userId": req.params.id
        })

        return res.status(200).json({
            status : true,
            message : 'success',
            data : user_detail
        })
    } else {
        return res.status(404).json({
            status : false,
            message : 'data pengguna tidak ditemukan'
        })
    }

}