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

//findAll with a confition regEx
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { $regex: new RegExp(username), $options: i } } : {};

    User.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Users"
            })
        })
}

//findOne
exports.findOne = (req, res) => {
    const id = req.pams.id;
    User.findById(id)
        .then(data => {
            if (!data) res.status(404).send({ message: "User not found with id " + id });
            else res.send(data);
        }).catch(err => {
            res.status(500).send({ message: "Error retrieving User with id = " + id });
        })
}

//update
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty"
        });
    }

    const id = req.params.id;

    User.findIdAndUpdate(id, req.body, { useFindAndModify: false }) //////////////////
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update information of User with id : " + id + ". Maybe the User was not found."
                });
            } else res.send({ message: "User was updated successfully" })
        })
        .catch(err => {
            res.status(500).send({ message: "Error uploading User with id " + id })
        })
}

//delete
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findIdAndRemove(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: "Cannot delete User with i: " + id + ". Maybe User was not found."
            });
        } else {
            res.send({
                message: "User was succesfully deleted"
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Couls not delete the User with id: " + id
        })
    })
}

//deleteAll
exports.deleteAll = (req, res) => {
    User.deleteMany({}).then(data => {
        res.send({
            message: `${data.deletedCount} Users were deleted succesfully `
        })
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while removing all the users."
            })
        })
}

//findAllRegistered  {registered :  true}
exports.findAllRegistered = (req, res) => {
    User.find({ registered: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving Users"
            })
        })
}