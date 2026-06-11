import { createContext, useContext, useState } from "react";
import type { Product } from "../types/Product";

interface CartContextType {
    productInCart: number[],
    products: Product[],
    setCartProducts: (products: Product[]) => void,
    addToCart: (id: number) => void
}

const CartContext = createContext<CartContextType>({
    productInCart: [],
    products: [],
    setCartProducts: () => { },
    addToCart: () => { }
});

function CartProvider({ children }: { children: React.ReactNode }) {
    const [productInCart, setProductsInCart] = useState<number[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const setCartProducts = (products: Product[]) => {
        setProducts(products);
    };

    const addToCart = (id: number) => {
        setProductsInCart([...productInCart, id])
    };

    return (
        <CartContext.Provider value={{ productInCart, products, setCartProducts, addToCart }}>
            {children}
        </CartContext.Provider>
    );

};

// Custom hook exporté avec le Provider : pattern Context standard
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context)
        throw new Error("useCart doit être dans CartProvider");
    return context;

};

export default CartProvider;