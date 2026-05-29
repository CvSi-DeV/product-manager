import { useState } from "react";
import { borderRadius, button, colors, spacing } from "../styles/theme";
import type { Category, Product } from "../types/Product"

interface ProductFormProps {
    onAddProduct: (product: Omit<Product, 'id'>) => void;
}

function ProductForm({ onAddProduct }: ProductFormProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState<Category>('Autre');


    const handleSubmit = () => {
        if (name.trim() === '') {
            console.log('Nom incorrect');
            return;  // ← Stoppe la fonction
        }
        if (price <= 0) {
            console.log('Prix incorrect');
            return;
        }
        if (stock < 0) {
            console.log('Stock incorrect');
            return;
        }

        // Si on arrive ici → tout est valide
        onAddProduct({ name, price, stock, category });

        // Reset seulement si succès
        setName('');
        setPrice(0);
        setStock(0);
        setCategory('Autre');
    };

    return (
        <div style={{
            backgroundColor: colors.gray[50],
            border: `1px solid ${colors.gray[200]}`,
            borderRadius: borderRadius.xl,
            padding: spacing.xl,
            marginBottom: spacing.xl
        }}>
            <div style={{ marginBottom: spacing.xxl }}>➕ Ajouter un produit
            </div>
            <div style={{
                display: 'flex',
                gap: spacing.md,
                flexWrap: 'wrap',
                alignItems: 'flex-end'
            }}>
                <input placeholder='Nom' type="text" id="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                <input placeholder='Prix' type="number" id="price" value={price} onChange={(e) => setPrice(Number(e.currentTarget.value))} min={0} />
                <input placeholder='Stock' type="number" id="stock" value={stock} onChange={(e) => setStock(Number(e.currentTarget.value))} min={0} />
                <select value={category} onChange={(e) => setCategory(e.currentTarget.value as Category)}>
                    <option value={'Électronique'}>Electronique</option>
                    <option value="Vêtements">Vêtements</option>
                    <option value="Alimentation">Alimentation</option>
                    <option value="Autre">Autre</option>
                </select>
                <button style={{
                    ...button,
                    backgroundColor: colors.success,
                    color: colors.white
                }} onClick={handleSubmit}>Ajouter ✅</button>
            </div>
        </div >
    );
}

export default ProductForm;