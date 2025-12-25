import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    itemname: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true,
        min:0
    },
    sellingPrice: {
        type: Number,
        required: true,
        min:0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    unit: {
        type: String,
        // enum: ['piece', 'kg', 'liter', 'pack', 'box'],
        default: 'units'
    }
}, {
    timestamps: true
});

// productSchema.index({ userId: 1 });
// productSchema.index({ itemname: 1 });
// productSchema.index({ category: 1 });


const Product = mongoose.model('Product', productSchema);
export default Product;
