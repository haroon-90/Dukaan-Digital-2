import Product from "../models/Product.js";

const addProduct = async (req, res) => {
    try {
        const { itemname, category, unit, purchasePrice, sellingPrice, quantity } = req.body;
        const userId = req.user;
        const existing = await Product.findOne({ itemname, category, userId })
        if (existing) {
            existing.quantity = existing.quantity + quantity;
            if (purchasePrice) {
                existing.purchasePrice = purchasePrice;
            }
            if (sellingPrice) {
                existing.sellingPrice = sellingPrice;
            }

            await existing.save();
            return res.status(200).json({
                msg: "Product detail updated successfully",
                product: existing
            });
        }
        if (!itemname || !category || !unit) {
            return res.status(400).json({ msg: "All fields are required to add new item" });
        }
        const newProduct = new Product({
            userId,
            itemname,
            category,
            purchasePrice: purchasePrice || 0,
            sellingPrice: sellingPrice || 0,
            quantity: quantity || 0,
            unit
        });
        await newProduct.save();
        res.status(201).json({ msg: "Product added successfully", product: newProduct });
    } catch (err) {
        console.log("Error:", err)
        res.status(500).json({ msg: "Internal server error" })
    }
};

const getProducts = async (req, res) => {
    try {
        const userId = req.user;
        const items = await Product.find({ userId })
        if (!items || items.length == 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(items)
    } catch (err) {
        console.log("Error:", err)
        res.status(500).json({ msg: "Internal server error" })
    }
};

const getProductById = async (req, res) => {
    try {
        const userId = req.user;
        const id = req.params.id;
        const item = await Product.findById(id)
        if (!item) {
            return res.status(404).json({ msg: "Item not found" })
        }
        res.status(200).json(item)
    } catch (err) {
        console.log("Error:", err)
        res.status(500).json({ msg: "Internal server error" })
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        if (product.userId == req.user) {
            if (updates.itemname) product.itemname = updates.itemname;
            if (updates.category) product.category = updates.category;
            if (updates.purchasePrice) product.purchasePrice = updates.purchasePrice;
            if (updates.sellingPrice) product.sellingPrice = updates.sellingPrice;
            if (updates.quantity !== undefined) product.quantity = updates.quantity;
            if (updates.unit) product.unit = updates.unit;
            await product.save();
            res.status(200).json({
                msg: "Product updated successfully",
                product
            });
        }
        res.status(402).json({ msg: "Access denied" })
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        if (product.userId === req.user) {
            await Product.findByIdAndDelete(id)
            res.status(200).json({ msg: 'Product deleted successfully!' });
        }
        else {
            return res.status(403).json({ msg: 'Access denied' })
        }
    }
    catch (err) {
        console.log("Error:", err)
        res.status(500).json({ msg: "Internal server error" })
    }
}

export {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
