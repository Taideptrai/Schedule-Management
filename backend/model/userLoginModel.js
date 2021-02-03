import mongoose from 'mongoose';

const userloginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password:{type: String, required: true}
},{
    timestamps: true
}
);
const UserLogin = mongoose.model("UserLogin",userloginSchema);
export default UserLogin;