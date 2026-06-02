import type { Product } from "../types/Product"
import { button, card, colors, input, spacing, borderRadius } from "../styles/theme"

interface ProductCardProps {
    product: Product;
    onAddToCart: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdateStock: (id: number, newStock: number) => void;
}
type StockConfig = {
    color: string,
    label: string
}

function ProductCard({ product, onAddToCart, onDelete, onUpdateStock }: ProductCardProps) {
    const config: Record<"rupture" | "faible" | "stock", StockConfig> = {
        rupture: {
            color: colors.error,
            label: "Rupture de stock"
        },
        faible: {
            color: colors.warning,
            label: "Stock faible"
        },
        stock: {
            color: colors.success,
            label: "En Stock"
        }
    };

    const currentStock = product.stock === 0 ? config["rupture"]
        : product.stock <= 10 ? config["faible"]
            : config["stock"];

    return (
        <div style={card}>
            <div style={{ fontWeight: '700', fontSize: '18px' }}>
                {product.name}
            </div>
            <div style={{ color: colors.gray[500], marginBottom: spacing.md }}>
                {product.category}
            </div>
            <div style={{ marginBottom: spacing.sm }}>
                💶 Prix : {product.price} €
            </div>
            <div style={{ color: currentStock.color, marginBottom: spacing.md }}>
                <label>Stock : </label>
                <input style={{
                    ...input, width: '60px',
                    padding: spacing.sm,
                    textAlign: 'center',
                    border: `1px solid ${colors.gray[300]}`,
                    borderRadius: borderRadius.md
                }}
                    type="number"
                    min={0}
                    value={product.stock}
                    onChange={
                        (e) => onUpdateStock(product.id, Number.parseInt(e.currentTarget.value, 10) || 0)
                    } />
                <span> unités </span>
                <div style={{ fontSize: '12px', marginTop: spacing.xs }}>
                    {currentStock.label}
                </div>
            </div>
            <div style={{ display: 'flex', gap: spacing.sm }}>
                <button style={{
                    ...button,
                    backgroundColor: colors.primary,
                    color: colors.white
                }}
                    onClick={() => onAddToCart(product.id)}>🛒 Ajouter au panier</button>
                <button style={{
                    ...button,
                    backgroundColor: colors.error,
                    color: colors.white
                }}
                    onClick={() => onDelete(product.id)}>🗑️ Supprimer</button>
            </div>
        </div>
    );
};

export default ProductCard;