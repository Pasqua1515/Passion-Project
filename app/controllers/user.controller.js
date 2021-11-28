const db = require("../models")
const User = db.user;

//create
exports.create = (req, res) => {
    //request valid ?
    if (!req.body.username) {
        res.status(400).send({ message: "Content can not be empty" });
        return
    };
    // create user
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        registered: req.body.registered
    })
    // save to db
    user.save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a new user"
            })
        })

};

//findAll
exports.findAll = (req, res) => {

}

//findOne
exports.findOne = (req, res) => {

}

//update
exports.update = (req, res) => {

}

//delete
exports.delete = (req, res) => {

}

//deleteAll
exports.deleteAll = (req, res) => {

}

//findAllRegistered
exports.findAllRegistered = (req, res) => {

}