
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: String,
            password: String,
            registered: Boolean
        },
        {
            timestamps: true
        }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("Pin-It", schema);
    return User

}