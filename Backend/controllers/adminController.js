import User from "../models/User.js"
import UserStatus from "../models/UserStatus.js";
import Product from "../models/Product.js";
import Sale from "../models/Sales.js";
import Purchase from "../models/Purchase.js";
import Udhaar from "../models/Udhaar.js";
import Expense from "../models/Expense.js";
import Report from "../models/Report.js";
import bcrypt from "bcrypt";

const GetAdminDashboard = async (req, res) => {
    try {
        const shops = await User.find({},"-password");
        if (!shops || shops.length === 0) {
            return res.status(404).json({ msg: "Not found" });
        }

        const shopsWithStatus = await Promise.all(
            shops.map(async (shop) => {
                const userStatus = await UserStatus.findOne({ userId: shop._id });
                console.log(userStatus)
                return {
                    ...shop.toObject(),
                    status: userStatus ? userStatus.status : null,
                };
            })
        );
        console.log(shopsWithStatus);
        res.status(200).json({
            shops: shopsWithStatus,
        });

    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const getAdminProfile = async (req, res) => {
    try {
        const userId = req.user;
        const admin = await User.findById(userId, "-password");
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const updateshop = async (req, res) => {
    try {
        const { name, email, address, shopname, phone, password } = req.body;
        const userId = req.params.id;

        const shop = await User.findById(userId);
        if (!shop) {
            return res.status(404).json({ msg: "User not found" });
        }

        const updateData = { name, email, address, shopname, phone };

        if (password && password.trim() !== "") {
            const hashed = await bcrypt.hash(password, 10);
            updateData.password = hashed;
        }

        await User.findByIdAndUpdate(userId, updateData, { new: true });
        res.status(200).json({ message: 'User details updated successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
        console.log(err);
    }
};

const editUserstatus = async (req, res) => {
    try {
        const userId = req.params.id;
        const Shop = await UserStatus.findOne({userId})
        if(!Shop){
            return res.status(404).json({ msg: "Shop not found" })
        }
        if (Shop.status === "active") {
            Shop.status = "suspended";
        } else if (Shop.status === "suspended") {
            Shop.status = "active";
        } else {
            return res.status(400).json({ msg: "Invalid shop status" });
        }
        await Shop.save();
        res.status(200).json({ message: 'Shop status updated successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
        console.log(err)
    }
}

const deleteshop = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "Shop not found" })
        }
        const delUser = await User.findByIdAndDelete(userId);
        if (!delUser) {
            return res.status(404).json({ msg: "Shop not found" })
        }
        await Product.deleteMany({ userId });
        await Sale.deleteMany({ userId });
        await Purchase.deleteMany({ userId });
        await Udhaar.deleteMany({ userId });
        await Expense.deleteMany({ userId });
        await Report.deleteMany({ userId });
        await UserStatus.deleteOne({ userId });
        res.status(200).json({ msg: "Shop deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
        console.log(err)
    }
}

export {
    GetAdminDashboard,
    getAdminProfile,
    updateshop,
    editUserstatus,
    deleteshop
}