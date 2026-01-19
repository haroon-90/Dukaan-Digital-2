import { Edit2, MessageCircleWarning, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

const ProductCard = ({ product, isSale, handleCartAdd, handleSaleChange, saleQuantities, incrementQuantity, decrementQuantity }) => {
    const quantity = saleQuantities[product._id] || 0;
    const isLowStock = product.quantity < 3;

    return (
        <div className="group relative bg-[var(--color-surface)] rounded-2xl p-4 border border-[var(--color-border)] hover:shadow-xl hover:shadow-[var(--color-primary)]/10 transition-all duration-300 hover:-translate-y-1">
            {/* Stock Badge */}
            {isLowStock && (
                <div className="absolute group top-2 right-2 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full">
                        <MessageCircleWarning size={12} />
                        <span className="text-xs font-medium hidden group-hover:block">Low Stock</span>
                    </span>
                </div>
            )}

            {/* Product Image Placeholder */}
            {/* <div className="relative w-full h-40 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
          <Package size={48} className="text-[var(--color-primary)] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div> */}

            {/* Product Info */}
            <div className="space-y-2">
                <div>
                    <h3 className="font-bold text-[var(--color-foreground)] text-lg truncate group-hover:text-[var(--color-primary)] transition-colors">
                        {product.itemname}
                    </h3>
                    <p className="text-xs text-[var(--color-muted-foreground)] font-medium">
                        {product.category}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xl font-bold text-[var(--color-foreground)]">
                            Rs {product.sellingPrice.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-[var(--color-muted-foreground)]">
                            {product.quantity} {product.unit}
                        </p>
                        <p className="text-xs text-[var(--color-muted-foreground)]">
                            in stock
                        </p>
                    </div>
                </div>

                {/* Sale Actions */}
                {isSale && (
                    <div className="pt-3 border-t border-[var(--color-border)] space-y-2">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => decrementQuantity(product._id)}
                                className="p-2 py-3 rounded-lg bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors"
                            >
                                <Minus size={16} />
                            </button>
                            <input
                                type="number"
                                min="0"
                                value={quantity}
                                onChange={(e) => handleSaleChange(product, e.target.value)}
                                className="min-w-12 text-center p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none font-bold"
                            />
                            <button
                                onClick={() => incrementQuantity(product._id)}
                                className="p-2 py-3 rounded-lg bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                        <button
                            onClick={() => handleCartAdd(product)}
                            disabled={quantity <= 0}
                            className="w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20"
                        >
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>
                    </div>
                )}

                {/* Product Actions */}
                {!isSale && (
                    <div className="flex gap-2 pt-3 border-t border-[var(--color-border)]">
                        <button
                            onClick={() => navigate("/products/edit/" + product._id)}
                            className="flex-1 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <Edit2 size={16} />
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(product)}
                            className="flex-1 py-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
