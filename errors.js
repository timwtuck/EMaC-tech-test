exports.invalidID = {status: 400, msg: "Invalid ID"};
exports.IDNotFound = {status: 404, msg: "ID Not Found"}

exports.pathNotFound = (req, res, next) => {

    res.status(404).send({msg: 'Path not found'});
}