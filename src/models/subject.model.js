import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    name: {
        type: String,
        required: true,
    },

    totalClasses: {
        type : Number,
        default : 0,
    },
    attendedClasses: {
        type : Number,
        default  : 0,
    }
}, { timestamps: true })

export const Subject = mongoose.model('SubjectModel', subjectSchema)