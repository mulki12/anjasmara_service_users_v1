const env                   = require('dotenv').config();
const jsonWebToken          = require('jsonwebtoken');
const moment                = require('moment');
const { Token, User, Pin }  = require('../../../models')

module.exports = async (req, res) => {

    const authorization = req.headers.authorization;
    const token         = authorization.split(" ");
    const decode        = jsonWebToken.verify(token[1], process.env.SECRET_KEY)

    if (decode.exp > moment().valueOf())
    {
        const exp_new   = moment().add(1, 'months').valueOf();
        const iat_new   = decode.iat;
        const uid       = decode.user_id; 

        const fresh_token = await Token.update({
            exp : exp_new
        },{
            where : { "user_id" : decode.user_id }
        });

        const fcm_update = await User.update({
            fcm : req.body.fcm
        },{
            where : { "uuid" : decode.user_id }
        });

        const pin_data = await Pin.findOne({
            where : { "user_id": uid }
        })

        const user_information = await User.findOne({
            where: { uuid: decode.user_id }
        })

        const token = await jsonWebToken.sign({
            user_id : uid,
            user : user_information,
            iat: iat_new,
            exp: exp_new
        }, process.env.SECRET_KEY);

        return res.status(200).json({
            status: true,
            message : "success",
            data: {
                user: user_information,
                pin : (pin_data ==  null ? null : pin_data.pin),
                accessToken : token
            }
        })
    }
    else
    {
        return res.status(404).json({
            status : false,
            message : 'token invalid'
        })
    }

}