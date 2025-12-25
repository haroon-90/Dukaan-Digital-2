import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager'],
        default: 'manager'
    },
    shopname: {
        type: String,
        required: function () {
            return this.role === "manager"; // only required for manager
        }
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date
    }

}, {
    timestamps: true
});

// userSchema.index({ email: 1 }, { unique: true });
// userSchema.index({ phone: 1 });
// userSchema.index({ role: 1 });


const User = mongoose.model('User', userSchema);

export default User;
