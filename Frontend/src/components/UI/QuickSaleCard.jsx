import { Package } from "lucide-react";

const QuickSaleCard = ({ product, onAddToCart }) => {
    return (
        <button
            onClick={() => onAddToCart(product)}
            disabled={product.quantity <= 0}
            className="text-left group glass-panel p-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all hover:shadow-lg active:scale-95 disabled:opacity-50"
        >
            <div className="font-medium text-[var(--color-foreground)] truncate">
                {product.itemname}
            </div>
            <div className="text-[var(--color-primary)] font-bold mt-1">
                Rs {product.sellingPrice}
            </div>
            <div className="text-xs text-[var(--color-muted-foreground)] mt-2 flex items-center gap-1">
                <Package size={12} /> {product.quantity} left
            </div>
        </button>
    );
};

export default QuickSaleCard;
