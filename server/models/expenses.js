import mongoose from 'mongoose';

const expenseSchema = mongoose.Schema({
    expenseType: { type: String, required: true },
    narration: { type: String, required: true, minLength: 10},
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: 'PENDING' },
},

{ timestamps: true }

);

const Expenses = mongoose.model('Expenses', expenseSchema);

export default Expenses;