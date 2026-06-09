import { useEffect, useState } from 'react';
import { appContainer, h2Title, productCountSpan, productGrill } from './styles/theme';
import { type ProductFilterStock, type ProductSortBy, type Product } from './types/Product';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Statistics from './components/Statistics';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ProductForm from './components/ProductForm';
import { API_URL, getAuthHeaders, PRODUCT_URL } from './config/api';
import LoginForm from './components/LoginForm';

function App() {
  //STATES

  //LoginForm
  const [isConnected, setIsConnected] = useState(!!localStorage.getItem('token'));

  //Products
  const [products, setProducts] = useState<Product[]>([]);

  //Cart 
  const [productsInCart, setProductsInCart] = useState<number[]>([]);

  //Search
  const [searchedTerm, setSearchedTerm] = useState('');

  //FilterPanel
  const [filterStock, setFilterStock] = useState<ProductFilterStock>("all");
  const [sortBy, setSortBy] = useState<ProductSortBy>('name');

  //Indicateur de chargement de données
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {

      try {
        setIsLoading(true);
        //appel fetch 
        const response = await fetch(`${API_URL}${PRODUCT_URL}`);

        if (!response.ok) throw new Error(`Error ${response.status}`);

        const data = await response.json();
        if (data === undefined) throw new Error(`Aucun produit à charger`);
        setProducts(data);

      } catch {
        setError('Impossible de charger les produits');

      } finally {
        setIsLoading(false);
      }
    };

    if (!isConnected) return;
    loadProduct();
  }, [isConnected]);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('token', token);
    setIsConnected(true);
  }
  const handleLogOut = () => {
    localStorage.removeItem('token');
    setIsConnected(false);
  }

  //Ajouter un produit
  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    const response = await fetch(`${API_URL}${PRODUCT_URL}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(product)
    });

    if (!response.ok) throw new Error(`Ajout du nouveau produit ${product.name} impossible. ` + `Code Erreur : ${response.status}`);
    //Ajouter le nouveau produit à la liste
    const stageProduct = await response.json();
    setProducts([...products, stageProduct])
  };

  //Supprimer un produit
  const handleDelete = async (id: number) => {
    if (!products.find(p => p.id === id)) throw new Error(`Produit inexistant ${id} : impossible de supprimer le produit`);

    const response = await fetch(`${API_URL}${PRODUCT_URL}/${id}`,
      {
        method: 'DELETE',
        headers: getAuthHeaders()
      }
    );

    if (!response.ok) throw new Error(`Error ${response.status}`)

    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdateStock = async (id: number, newStock: number) => {
    if (!products.find(p => p.id === id)) throw new Error(`Produit inexistant ${id} : impossible de mettre à jour le stock`);

    const response = await fetch(`${API_URL}${PRODUCT_URL}/${id}`,
      {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ stock: newStock })
      });

    if (!response.ok) throw new Error(`Error ${response.status}`);

    setProducts(products.map(p =>
      p.id === id ? { ...p, stock: newStock } : p
    ));
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


  // Rechercher par le nom 
  const searchedProducts = products.filter((product) => (product.name.toLowerCase().includes(searchedTerm.toLowerCase())));

  // Filtrer par le stock
  const filteredProducts = searchedProducts.filter((p) => {
    if (filterStock === 'inStock') return p.stock > 0;
    if (filterStock === 'outOfStock') return p.stock === 0;
    return true;  // 'all'
  });


  // Trier par le critère
  const sortedProducts = [...filteredProducts].sort((p1, p2) => {
    if (sortBy === 'name')
      return p1.name.localeCompare(p2.name);

    if (sortBy === 'price')
      return p1.price - p2.price;

    if (sortBy === 'stock')
      return p1.stock - p2.stock

    return 0;
  });

  if (!isConnected) return (
    <LoginForm onLoginSuccess={handleLoginSuccess} />
  );
  if (isLoading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      ⏳ Chargement des produits...
    </div>
  );

  if (error) return (
    <div style={{
      color: '#ef4444',
      padding: '40px',
      textAlign: 'center'
    }}>
      ❌ {error}
    </div>
  );

  return (
    <div style={appContainer}>
      <h1>Product Manager</h1>
      <button style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        zIndex: 1000
      }} onClick={handleLogOut}>Deconnexion</button>
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