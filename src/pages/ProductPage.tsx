import { useState, useEffect, useCallback, useMemo } from 'react';
import { API_URL, getAuthHeaders, PRODUCT_URL } from './../config/api';
import { Link, useNavigate } from 'react-router-dom';
import { type ProductFilterStock, type ProductSortBy, type Product } from './../types/Product';
import { appContainer, h2Title, productCountSpan, productGrill } from './../styles/theme';
import Cart from './../components/Cart';
import ProductCard from './../components/ProductCard';
import Statistics from './../components/Statistics';
import FilterPanel from './../components/FilterPanel';
import ProductForm from './../components/ProductForm';
import SearchBar from './../components/SearchBar';
import { useCart } from '../Contexts/CartContext';
import { useAuth } from '../Contexts/AuthContext';

function ProductPage() {

    //-------
    //STATES
    //_______

    //Search
    const [searchedTerm, setSearchedTerm] = useState('');

    //FilterPanel
    const [filterStock, setFilterStock] = useState<ProductFilterStock>("all");
    const [sortBy, setSortBy] = useState<ProductSortBy>('name');

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { logout } = useAuth();
    const { productInCart, products, addToCart, setCartProducts, clearCart } = useCart();

    //-------
    //UseEffect
    //_______
    useEffect(() => {
        const loadProduct = async () => {

            try {
                setIsLoading(true);
                //appel fetch 
                const response = await fetch(`${API_URL}${PRODUCT_URL}`);

                if (!response.ok) throw new Error(`Error ${response.status}`);

                const data = await response.json();
                if (data === undefined) throw new Error(`Aucun produit à charger`);
                setCartProducts(data);
            } catch {
                setError('Impossible de charger les produits');

            } finally {
                setIsLoading(false);
            }
        };

        loadProduct();
    }, [setCartProducts]);

    const handleLogOut = useCallback(() => {
        //fonction logout de useAuth();
        logout();
        //effacer le panier 
        clearCart();
        navigate('/login');
    }, [logout, clearCart, navigate]);

    //Ajouter un produit
    const handleAddProduct = useCallback(async (product: Omit<Product, 'id'>) => {
        const response = await fetch(`${API_URL}${PRODUCT_URL}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(product)
        });

        if (!response.ok) throw new Error(`Ajout du nouveau produit ${product.name} impossible. ` + `Code Erreur : ${response.status}`);
        //Ajouter le nouveau produit à la liste
        const stageProduct = await response.json();
        const newProducts = [...products, stageProduct];

        //mettre à jour la liste des produits 
        setCartProducts(newProducts);
    }, [products, setCartProducts]);

    //Supprimer un produit
    const handleDelete = useCallback(async (id: number) => {
        console.log('🔄 handleDelete recréé');

        if (!products.find(p => p.id === id)) throw new Error(`Produit inexistant ${id} : impossible de supprimer le produit`);

        const response = await fetch(`${API_URL}${PRODUCT_URL}/${id}`,
            {
                method: 'DELETE',
                headers: getAuthHeaders()
            }
        );

        if (!response.ok)
            throw new Error(`Error ${response.status}`);

        //mettre à jour la liste des produits dans le cart (useCart contexte)
        const newProductsList = products.filter(p => p.id !== id);
        setCartProducts(newProductsList);
    }, [products, setCartProducts]);

    const handleUpdateStock = useCallback(async (id: number, newStock: number) => {
        if (!products.find(p => p.id === id)) throw new Error(`Produit inexistant ${id} : impossible de mettre à jour le stock`);

        const response = await fetch(`${API_URL}${PRODUCT_URL}/${id}`,
            {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ stock: newStock })
            });

        if (!response.ok) throw new Error(`Error ${response.status}`);

        setCartProducts(products.map(p =>
            p.id === id ? { ...p, stock: newStock } : p
        ));
    }, [setCartProducts, products]);

    const handleAddToCart = useCallback((id: number) => {
        const productToCart = products.find(p => (p.id === id));
        if (!productToCart) {
            return console.log(`Produit inexistant '${id}': impossible d'ajouter au panier`);
        }
        addToCart(id);
        console.log("Ajout panier:", id);
    }, [products, addToCart]);

    // Rechercher par le nom 
    const searchedProducts = useMemo(() => {
        console.log('🔄 Recalcul searchedProducts');

        return products.filter((product) => (product.name.toLowerCase().includes(searchedTerm.toLowerCase())));
    }, [products, searchedTerm]);

    // Filtrer par le stock
    const filteredProducts = useMemo(() => {
        console.log('🔄 Recalcul filteredProducts');

        return searchedProducts.filter((p) => {
            if (filterStock === 'inStock') return p.stock > 0;
            if (filterStock === 'outOfStock') return p.stock === 0;
            return true;  // 'all'
        });
    }, [searchedProducts, filterStock]);

    // Trier par le critère
    const sortedProducts = useMemo(() => {
        console.log('🔄 Recalcul sortedProducts');

        return [...filteredProducts].sort((p1, p2) => {
            if (sortBy === 'name')
                return p1.name.localeCompare(p2.name);

            if (sortBy === 'price')
                return p1.price - p2.price;

            if (sortBy === 'stock')
                return p1.stock - p2.stock

            return 0;
        });
    }, [filteredProducts, sortBy]);

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
                <Link to="/cart">
                    <h2 style={h2Title}>Mon Panier</h2>
                </Link>
                <Cart cart={productInCart} products={products} />
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

export default ProductPage;