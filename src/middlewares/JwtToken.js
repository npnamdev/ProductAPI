var jwt = require('jsonwebtoken');
require('dotenv').config();



const createAccessToken = (pl) => {
    let payload = pl;
    let key = process.env.JWT_SECRET_LOGIN;
    let token = null;

    try {
        token = jwt.sign(payload, key);
    } catch (err) {
        console.log(err);
    }

    return token;
}

const createRefreshToken = (pl) => {
    let payload = pl;
    let key = process.env.JWT_SECRET_LOGOUT;
    let token = null;

    try {
        token = jwt.sign(payload, key);
    } catch (err) {
        console.log(err);
    }

    return token;
}





const verifyRefreshToken = (token) => {
    let key = process.env.JWT_SECRET_LOGOUT;
    let data = null;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (err) {
        console.log(err);
    }
    return data;
}



module.exports = { createAccessToken, createRefreshToken, verifyRefreshToken }