import { Package, Edit2, Trash2, ShoppingCart } from "lucide-react";

const ProductCard = ({ product, isSale, onAddToCart, onEdit, onDelete, isDemo }) => {
    return (
        <div className="group glass-panel rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-[var(--color-border)] flex flex-col h-full">
            <div className="relative aspect-[4/3] bg-[var(--color-surface)] overflow-hidden">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.itemname}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--color-muted)] bg-[var(--color-surface)]">
                        <Package size={48} />
                    </div>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                    {!isSale && (
                        <>
                            <button
                                disabled={isDemo}
                                onClick={onEdit}
                                className="p-2 rounded-xl bg-white/90 text-blue-600 shadow-lg hover:scale-110 transition-transform"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                disabled={isDemo}
                                onClick={onDelete}
                                className="p-2 rounded-xl bg-white/90 text-red-600 shadow-lg hover:scale-110 transition-transform"
                            >
                                <Trash2 size={16} />
                            </button>
                        </>
                    )}
                </div>
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/60 text-white text-xs backdrop-blur-md">
                    {product.category}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1 gap-3">
                <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-[var(--color-foreground)] line-clamp-1" title={product.itemname}>
                            {product.itemname}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${product.quantity > 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                            }`}>
                            {product.quantity > 0 ? "In Stock" : "Out"}
                        </span>
                    </div>
                    <div className="text-xl font-bold text-[var(--color-primary)] mt-1">
                        Rs {product.sellingPrice?.toLocaleString()}
                    </div>
                </div>

                {isSale ? (
                    <button
                        onClick={() => onAddToCart(product)}
                        disabled={product.quantity <= 0}
                        className="w-full py-2.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium shadow-lg shadow-[var(--color-primary)]/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={18} />
                        Add to Cart
                    </button>
                ) : (
                    <div className="flex items-center justify-between text-sm text-[var(--color-muted-foreground)] pt-3 border-t border-[var(--color-border)]">
                        <span>Stock: {product.quantity}</span>
                        <span>Sales: {product.totalSales || 0}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;