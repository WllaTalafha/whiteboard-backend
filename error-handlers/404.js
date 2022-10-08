'use strict';

function notFound(req, res, next) {
    res.status(404).json(
        {
            code: 404,
            message: "Not found",
        }
    );
}
module.exports = { notFound };