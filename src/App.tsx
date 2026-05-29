import { useState } from 'react';
import type { Product } from './types/Product';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop Pro", price: 999, stock: 5, category: "Électronique" },
    { id: 2, name: "Souris Gaming", price: 29, stock: 50, category: "Électronique" },
    { id: 3, name: "T-Shirt", price: 19, stock: 0, category: "Vêtements" }
  ]);

  const handleAddToCart = (id: number) => {
    console.log("Ajout panier:", id);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateStock = (id: number, newStock: number) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, stock: newStock } : p
    ));
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Product Manager</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onDelete={handleDelete}
            onUpdateStock={handleUpdateStock}
          />
        ))}
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;