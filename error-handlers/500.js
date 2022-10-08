'use strict';

function errorHandler(err, req, res, next) {
    res.status(500).json(
        {
            code: 500,
            message: err,
        }
    );
}
module.exports = { errorHandler };