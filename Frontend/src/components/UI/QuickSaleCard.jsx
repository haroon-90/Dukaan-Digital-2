import { Minus, Package, Plus, ShoppingCart } from "lucide-react";

const QuickSaleCard = ({ product, saleQuantities, incrementQuantity, decrementQuantity, handleSaleChange, handleCartAdd }) => {
    const quantity = saleQuantities[product._id] || 0;

    return (
        <div className="group bg-[var(--color-surface)] rounded-xl p-3 border border-[var(--color-border)] hover:shadow-lg transition-all duration-200 hover:border-[var(--color-primary)]">
            <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 hidden md:flex items-center justify-center flex-shrink-0">
                    <Package size={24} className="text-[var(--color-primary)]" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--color-foreground)] truncate">
                        {product.itemname}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold text-[var(--color-primary)]">
                            Rs {product.sellingPrice.toLocaleString()}
                        </span>
                        <span className="text-[var(--color-muted-foreground)]">•</span>
                        <span className="text-[var(--color-muted-foreground)]">
                            {product.quantity} {product.unit}
                        </span>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1 bg-[var(--color-muted)] rounded-lg p-1">
                        <button
                            onClick={() => decrementQuantity(product._id)}
                            className="p-1 hover:bg-[var(--color-background)] rounded transition-colors"
                        >
                            <Minus size={14} />
                        </button>
                        <input
                            type="number"
                            min="0"
                            value={quantity}
                            onChange={(e) => handleSaleChange(product, e.target.value)}
                            className="w-12 text-center bg-transparent font-bold text-sm outline-none"
                        />
                        <button
                            onClick={() => incrementQuantity(product._id)}
                            className="p-1 hover:bg-[var(--color-background)] rounded transition-colors"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                    <button
                        onClick={() => handleCartAdd(product)}
                        disabled={quantity <= 0}
                        className="p-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuickSaleCard;
