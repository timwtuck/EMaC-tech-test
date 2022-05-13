exports.invalidID = {status: 400, msg: "Invalid ID"};
exports.IDNotFound = {status: 404, msg: "ID not found"}

exports.pathNotFound = (req, res, next) => {

    res.status(404).send({msg: 'Path not found'});
}

exports.customError = (err, req, res, next) => {

    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg});
    } else {
        next(err);
    }
}