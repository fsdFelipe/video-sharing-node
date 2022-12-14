import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        nome:{
            type : String,
            required : true,
            unique : true,
        },
        email:{
            type : String,
            required : true,
            unique : true,
        },
        senha:{
            type : String,
        },
        img:{
            type : String,
        },
        subscribers:{
            type : Number,
            default : 0,
        },
        subscribedUsers:{
            type : [String],
        },
        fromGoogle:{
            type: Boolean,
            default: false,
        },
    },
    {timestamps : true}
)
export default mongoose.model('Usuarios', UserSchema)