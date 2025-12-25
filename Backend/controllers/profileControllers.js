import User from "../models/User.js";
import Product from "../models/Product.js";
import Sale from "../models/Sales.js";
import Purchase from "../models/Purchase.js";
import Udhaar from "../models/Udhaar.js";
import Expense from "../models/Expense.js";
import Report from "../models/Report.js";
import bcrypt from 'bcrypt'

const GetProfile = async (req, res) => {
    const id = req.user;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ msg: "User not found" })
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        shopname: user.shopname,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt
    });
}

const getAllUsers = async (req, res) => {
    const id = req.user;

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ msg: "User not found" })
    }

    if (user.role === 'admin') {
        const allUsers = await User.find().select("-password");
        res.status(200).json(allUsers);
    } else {
        res.status(403).json({ msg: "Access denied" });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        const userId = req.user;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        const updateData = { name, phone };
        if (password && password.trim() !== "") {
            const hashed = await bcrypt.hash(password, 10);
            updateData.password = hashed;
        }
        await User.findByIdAndUpdate(userId, updateData,
            { new: true }
        );
        res.status(200).json({ message: 'User profile updated successfully!' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
        console.log(err)
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.user;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        const delUser = await User.findByIdAndDelete(userId);
        if (!delUser) {
            return res.status(404).json({ msg: "User not found" })
        }
        await Product.deleteMany({ userId });
        await Sale.deleteMany({ userId });
        await Purchase.deleteMany({ userId });
        await Udhaar.deleteMany({ userId });
        await Expense.deleteMany({ userId });
        await Report.deleteMany({ userId });
        res.status(200).json({ msg: "User deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
        console.log(err)
    }
}

export {
    GetProfile,
    getAllUsers,
    updateProfile,
    deleteUser
}