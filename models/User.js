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
        telephone: {
            type: Number,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        }
    },
    {
        collection: "user",
        timestamps: true
    }
)

export default mongoose.model("User", UserSchema);