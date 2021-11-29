module.exports = app => {
    const users = require("../controllers/user.controller.js")

    var router = require("express").Router();

    //create new User
    router.post("/", users.create)

    //get all Users
    router.get("/", users.findAll)

    //Get all registered users
    router.get("/registered", users.findAllRegistered)

    //retrieve 1 user with id
    router.get("/:id", users.findOne)

    //update one user
    router.put("/:id", users.update)

    //delete one user
    router.delete("/:id", users.delete)

    //delete all users
    router.delete("/", users.deleteAll)

    app.use("api/pinit", router)
}
