import mongoose from "mongoose";


//Liên kết database 

export const DBconnect = async() => {
    await mongoose.connect('mongodb+srv://tam:215052015@cluster0.yhdgb.mongodb.net/Final-P').then(()=>console.log("DB connected"));
}