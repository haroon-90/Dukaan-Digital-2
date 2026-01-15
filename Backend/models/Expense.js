import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

expenseSchema.index({ userId: 1, createdAt: -1 });       // har user ke expenses filter ke liye

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
