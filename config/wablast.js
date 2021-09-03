"use strict";

const axios = require('axios');

const {
    WA_URL,
    WA_TOKEN,
} = process.env

let send_text_message_by_wa = (data) => axios({
    url: WA_URL + '/send-message',
    method : 'POST',
    headers : {
        'Authorization': WA_TOKEN
    },
    data : data
}).then((res) => {
    console.log("otp will be send from wa")
}).catch((err) => {
    console.log(err)
})

module.exports =  {
    text_message: send_text_message_by_wa
}