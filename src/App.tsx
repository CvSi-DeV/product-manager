import { useState } from 'react';
import { appContainer, h2Title, productCountSpan, productGrill } from './styles/theme';
import { type ProductFilterStock, type ProductSortBy, type Product } from './types/Product';
import { INITIAL_PRODUCTS } from './data/initialDatas';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Statistics from './components/Statistics';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ProductForm from './components/ProductForm';

function App() {
  //STATES
  //Products
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  //Cart 
  const [productsInCart, setProductsInCart] = useState<number[]>([]);

  //Search
  const [searchedTerm, setSearchedTerm] = useState('');

  //FilterPanel
  const [filterStock, setFilterStock] = useState<ProductFilterStock>("all");
  const [sortBy, setSortBy] = useState<ProductSortBy>('name');

  //ProductForm
  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    //Déterminer un nouvel Id
    const newId = Math.max(...products.map(p => p.id), 0) + 1;

    //Créer un nouveau produit
    const newProduct = { ...product, id: newId };

    //Ajouter le nouveau produit à la liste
    setProducts([...products, newProduct]);
  };

  const handleAddToCart = (id: number) => {
    const productToCart = products.find(p => (p.id === id));
    if (!productToCart) {
      return console.log(`Produit inexistant '${id}': impossible d'ajouter au panier`);
    }
    setProductsInCart([...productsInCart, id]);
    console.log("Ajout panier:", id);
    console.log("panier: ", productsInCart);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateStock = (id: number, newStock: number) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, stock: newStock } : p
    ));
  };

  // Rechercher par le nom 
  const searchedProducts = products.filter((product) => (product.name.toLowerCase().includes(searchedTerm.toLowerCase())));

  // Filtrer par le stock
  const filteredProducts = searchedProducts.filter((p) => {
    if (filterStock === 'inStock') return p.stock > 0;
    if (filterStock === 'outOfStock') return p.stock === 0;
    return true;  // 'all'
  });

  // tri par le critère
  const sortedProducts = [...filteredProducts].sort((p1, p2) => {
    if (sortBy === 'name')
      return p1.name.localeCompare(p2.name);

    if (sortBy === 'price')
      return p1.price - p2.price;

    if (sortBy === 'stock')
      return p1.stock - p2.stock

    return 0;
  });

  return (
    <div style={appContainer}>
      <h1>Product Manager</h1>
      <div>
        <h2 style={h2Title}>Mon Panier</h2>
        <Cart cart={productsInCart} products={products} />
      </div>
      <div>
        <h2 style={h2Title}>Mes Statistiques</h2>
        <Statistics products={products} />
      </div>
      <div>
        <h2 style={h2Title}>Ma Recherche</h2>
        <SearchBar searchTerm={searchedTerm} onSearchChange={setSearchedTerm} />
      </div>
      <div>
        <h2 style={h2Title}>Mes Filtres</h2>
        <FilterPanel filterStock={filterStock} onFilterStock={setFilterStock} sortBy={sortBy} onSortBy={setSortBy} />
      </div>
      <div>
        <h2 style={h2Title}>Mes Produits</h2>
        <ProductForm onAddProduct={handleAddProduct} />
        <span style={productCountSpan}>
          {sortedProducts.length === 1 ? `${sortedProducts.length} produit affiché` : `${sortedProducts.length} produits affichés`}
        </span>
        <div style={productGrill}>
          {sortedProducts.map(
            (product) => <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onDelete={handleDelete} onUpdateStock={handleUpdateStock} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;