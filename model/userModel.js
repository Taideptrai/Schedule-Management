import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    noteTitle: {type: String, required: true},
    message:{type: String, required: true},
    chatId: { type: mongoose.Schema.Types.ObjectID, ref: 'UserLogin' },
    startDate:{type: String, required: true},
    endDate:{type:String, required:true},
    autoDelete: {type: Boolean, required:true}
},{
    timestamps: true
}
);
const User = mongoose.model("User",userSchema);
export default User;