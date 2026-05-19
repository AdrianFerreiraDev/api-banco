import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        cpf: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        telephone: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        age: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        collection: "user",
        timestamps: true
    }
)

export default mongoose.model("User", UserSchema);