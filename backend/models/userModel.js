import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
}, { minimize: false });

const userModel = Mongoose.models.user || Mongoose.model("user", userSchema);

export default userModel;