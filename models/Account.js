import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        accountNumber: {
            type: Number,
            required: true,
            unique: true
        },
        agency: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        balance: {
            type: Number,
            default: 0
        },
        limit: {
            type: Number,
            required: true,
            default: 0
        },
        active: {
            type: Boolean,
            required: true
        },
        blocked: {
            type: Boolean,
            required: true
        }
    },
    {
        collection: "account",
        timestamps: true
    }
);

export default mongoose.model("Account", AccountSchema);