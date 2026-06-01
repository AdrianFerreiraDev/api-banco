import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        type: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        value: {
            type: Number,
            required: true
        },
        previousBalace: {
            type: Number,
            required: true
        },
        currentBalance: {
            type: Number,
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        }
    },
    {
        collection: "transaction",
        timestamps: true
    }
)

export default mongoose.model("Transaction", TransactionSchema);