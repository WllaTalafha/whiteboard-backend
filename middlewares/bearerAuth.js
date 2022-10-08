'use strict';

const jwt = require('jsonwebtoken');
const { userModel } = require('../models');
require('dotenv').config();

async function bearerAuth(req, res, next) {
    try {
        let bearerAuth = req.headers.authorization;    // `Bearer sdasdas.sdeeer.werwerwer`
        let token = bearerAuth.split(' ')[1];          // sdasdas.sdeeer.werwerwer
        let userObject = jwt.verify(token, process.env.SECRET);  // {meow:"username" , "iat": "any"}
        let user = await userModel.findOne({ where: { username: userObject.meow } });
        if (user) {
            req.user = user;
            next();
        } else {
            next(`Invalid token`);
        }
    } catch (err) {
        next(`Error inside bearerAuth middleware : ${err}`);
    }
}


module.exports = { bearerAuth };