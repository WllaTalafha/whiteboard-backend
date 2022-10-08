'use strict';

function acl(capability) {
    return function aclMiddleware(req, res, next) {
        try {
            let includeOrNot = req.user.actions.includes(capability);
            if (includeOrNot) {
                next();
            } else {
                res.status(403).send(`Access Denied`);
            }
        } catch (err) {
            next(`Error inside acl middleware :${err}`);
        }
    };
}



module.exports = { acl };