import mongoose from 'mongoose';

const userloginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password:{type: String, required: true},
    chatId: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
},{
    timestamps: true
}
);
const UserLogin = mongoose.model("UserLogin",userloginSchema);
export default UserLogin;