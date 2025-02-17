import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Email does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect password" });
        }
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occurred, please try again later" });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Email already exists" });
        } 
        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occurred, please try again later" });
    }
}

const changePassword = async (req, res) => {
    const { email, password, newPassword } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'An error occurred, please try again later' });
    }
};

//Lấy danh sách user
const UserList = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({ success: true, data: users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error!" });
    }
};

//xoa user
const Userremove = async (req, res) => {
    try {
        const users = await userModel.findById(req.body.id);
        await userModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "User removed!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error!" });
    }
};

export { loginUser, registerUser, changePassword, UserList, Userremove };