import mongoose from "mongoose";
import Purchase from "./models/Purchase.js";
import Product from "./models/Product.js";

// MongoDB connection URI
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Dummy userId (replace with a valid ObjectId from your database)
const userId = "68be738f8051ff94501f95f0";
const today = new Date().toISOString().split("T")[0];

const purchases = [
    {
        userId,
        suppliername: "Tech World Electronics",
        category: "Mobiles & Accessories",
        date: today,
        items: [
            { itemname: "Samsung Galaxy A15", purchasePrice: 45000, quantity: 10, unit: "piece" },
            { itemname: "iPhone 13 128GB", purchasePrice: 145000, quantity: 5, unit: "piece" },
            { itemname: "Infinix Hot 12", purchasePrice: 32000, quantity: 8, unit: "piece" },
            { itemname: "Oppo Reno 8", purchasePrice: 65000, quantity: 6, unit: "piece" },
            { itemname: "Fast Charging Cable (Type-C)", purchasePrice: 500, quantity: 50, unit: "piece" },
            { itemname: "Original Samsung Charger", purchasePrice: 2500, quantity: 30, unit: "piece" },
            { itemname: "Wireless Earbuds", purchasePrice: 3500, quantity: 20, unit: "piece" }
        ]
    },
    {
        userId,
        suppliername: "Electro Wholesale Hub",
        category: "Home Appliances",
        date: today,
        items: [
            { itemname: "Haier LED TV 43 inch", purchasePrice: 48000, quantity: 4, unit: "piece" },
            { itemname: "Orient Refrigerator 14 cu.ft", purchasePrice: 95000, quantity: 3, unit: "piece" },
            { itemname: "Kenwood Washing Machine", purchasePrice: 38000, quantity: 5, unit: "piece" },
            { itemname: "Philips Electric Kettle", purchasePrice: 4500, quantity: 15, unit: "piece" },
            { itemname: "Gree Inverter AC 1.5 Ton", purchasePrice: 125000, quantity: 2, unit: "piece" },
            { itemname: "Microwave Oven Dawlance", purchasePrice: 22000, quantity: 4, unit: "piece" }
        ]
    },
    {
        userId,
        suppliername: "Smart Gadgets Suppliers",
        category: "Electronics & Gadgets",
        date: today,
        items: [
            { itemname: "Bluetooth Speaker", purchasePrice: 2500, quantity: 25, unit: "piece" },
            { itemname: "Power Bank 20000mAh", purchasePrice: 4000, quantity: 20, unit: "piece" },
            { itemname: "Smart Watch Series 7", purchasePrice: 7500, quantity: 15, unit: "piece" },
            { itemname: "Laptop HP i5 11th Gen", purchasePrice: 125000, quantity: 5, unit: "piece" },
            { itemname: "Dell Monitor 24 inch", purchasePrice: 35000, quantity: 6, unit: "piece" }
        ]
    }
];

const insertData = async () => {
    try {
        for (const p of purchases) {
            // 1. Calculate total and insert into Purchase collection
            p.total = p.items.reduce((sum, i) => sum + i.purchasePrice * i.quantity, 0);
            await Purchase.create(p);

            // 2. Loop through items and insert/update Product collection
            for (const item of p.items) {
                // Check if product already exists
                const exists = await Product.findOne({ userId, itemname: item.itemname });
                if (!exists) {
                    await Product.create({
                        userId,
                        itemname: item.itemname,
                        category: p.category,
                        purchasePrice: item.purchasePrice,
                        sellingPrice: Math.round(item.purchasePrice * 1.15), // 15% markup for electronics
                        quantity: item.quantity,
                        unit: item.unit
                    });
                }
            }
        }
        console.log("✅ Electronics purchases and products added successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error adding electronics data:", err);
        process.exit(1);
    }
};

mongoose.connection.once("open", insertData);
