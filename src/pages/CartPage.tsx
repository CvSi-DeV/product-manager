import { Link } from "react-router-dom";
import Cart from "../components/Cart";
import { CartPageContainer, ProductsLink } from "../styles/theme";
import { useCart } from "../Contexts/CartContext";
import { h2Title } from "../styles/theme";

function CartPage() {

    // Cart Context
    const { productInCart, products } = useCart()

    return (
        <div style={CartPageContainer}>
            <h2 style={h2Title}>Mon Panier</h2>
            <Cart cart={productInCart} products={products} />
            <Link style={ProductsLink} to="/products">Retour aux produits</Link>
        </div>
    );
};

export default CartPage;