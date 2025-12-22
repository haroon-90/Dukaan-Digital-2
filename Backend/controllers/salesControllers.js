import Sale from '../models/Sales.js';
import Product from '../models/Product.js';

const createSale = async (req, res) => {
    try {
        const { items, customerName } = req.body;
        const userId = req.user;
        if (!items || items.length === 0) {
            return res.status(400).json({ msg: "Items are required" });
        }
        let totalAmount = 0;
        let saleProfit = 0;
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ msg: `Product not found with ID: ${item.productId}` });
            }
            item.productName = product.itemname;
            item.unit = product.unit;
            console.log(item.unit)
            if (product.quantity < item.quantity) {
                return res.status(400).json({ msg: `Not enough stock for ${product.itemname}` });
            }
            item.price = product.sellingPrice;
            product.quantity -= item.quantity;
            await product.save();
            totalAmount += (item.quantity * item.price);
            saleProfit += ((product.sellingPrice - product.purchasePrice)* item.quantity)
        }
        const sale = new Sale({
            userId,
            items,
            customerName,
            totalAmount,
            saleProfit
        });
        await sale.save();
        res.status(201).json({ msg: "Sale recorded successfully", sale });
    } catch (err) {
        console.log("Error :", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const getSales = async (req, res) => {
    try {
        console.log(req.body);
        const { startDate, endDate } = req.body;
        const userId = req.user;
        // const filter = { userId };
        // if (type) {
        //     filter.type = type;
        // }
        let createdAt;
        if (startDate && endDate) {
            createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999))
            };
        }
        const sales = await Sale.find({ userId, createdAt });
        if (!sales || sales.length === 0) {
             return res.status(200).json([]);
        }
        res.status(200).json(sales);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

// const getSingleSale = async (req, res) => {
//     res.send("getSingleSale");
// };

const deleteSale = async (req, res) => {
    try {
        const id = req.params.id;
        const sale = await Sale.findById(id);
        if (!sale) {
            return res.status(404).json({ msg: "Sale not found" });
        }
        await Sale.findByIdAndDelete(id);
        res.status(200).json({ msg: "Sale deleted successfully!" })
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export {
    createSale,
    getSales,
    // getSingleSale,
    deleteSale
};
