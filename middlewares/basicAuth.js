'use strict';

const { userModel } = require('../models');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function basicAuth(req, res, next) {
    try {
        let basicAuth = req.headers.authorization;        // `Basic 34$%#$%$#$%@@RR@#$C$`
        let encodedData = basicAuth.split(' ')[1];        // `34$%#$%$#$%@@RR@#$C$`
        let decodedData = base64.decode(encodedData);     // username:password
        let [username, password] = decodedData.split(':');
        let user = await userModel.findOne({ where: { username } });
        if (user) {
            let checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                const token = jwt.sign({ meow: user.username }, process.env.SECRET);
                user.token = token;
                req.signedUser = user;
                next();
            } else {
                res.status(403).send('Password is incorrect');
            }
        } else {
            res.status(403).send(`No user found SIGNUP`);
        }
    } catch (err) {
        next(`Error inside basicAuth middleware : ${err}`);
    }
}
module.exports = { basicAuth };