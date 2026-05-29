import type { Product } from "../types/Product";
import { cartPanel } from "../styles/theme";

interface CartProps {
    cart: number[];
    products: Product[]
}

function Cart({ cart, products }: CartProps) {

    const itemCount = cart.length;
    const totalValue = cart.reduce((acc, cartProductId) => {
        const cartedProduct = (products.find((p) => cartProductId === p.id));
        const price = cartedProduct ? cartedProduct.price : 0;

        return (acc + price);
    }, 0)

    return (
        <div style={cartPanel}>
            <label>🛒 Panier : {itemCount} {itemCount === 1 ? 'article' : 'articles'}
            </label>
            <label>💰 Total : {totalValue} €</label>
        </div>
    )
};


export default Cart;
