import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: "admin" | "user";
    gender: "male" | "female";
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    age: number;
}

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please enter ID"]
    },
    photo: {
        type: String,
        required: [true, "Please enter photo"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        unique: [true, "Email already exist"],
        required: [true, "Please enter email"],
        validate: validator.default.isEmail
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please enter Gender"]
    },
    dob: {
        type: Date,
        required: [true, "Please enter DOB"]
    }

}, { timestamps: true })

userSchema.virtual('age').get(function () {
    const today = new Date();
    const dob: Date = this.dob;
    let age = today.getFullYear() - dob.getFullYear();

    if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
        age--;
    }

    return age;
})

export const User = mongoose.model<IUser>("User", userSchema)