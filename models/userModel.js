import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userCollection = 'users';

const userSchema = new Schema({
    name: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    created: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;
