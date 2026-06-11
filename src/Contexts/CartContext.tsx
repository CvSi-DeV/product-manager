import { createContext, useContext, useState } from "react";
import type { Product } from "../types/Product";
import { useCallback } from "react";

interface CartContextType {
    productInCart: number[],
    products: Product[],
    setCartProducts: (products: Product[]) => void,
    addToCart: (id: number) => void,
    clearCart: () => void
}

const CartContext = createContext<CartContextType>({
    productInCart: [],
    products: [],
    setCartProducts: () => { },
    addToCart: () => { },
    clearCart: () => { }
});

function CartProvider({ children }: { children: React.ReactNode }) {
    const [productInCart, setProductsInCart] = useState<number[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    //Liste des produits possible dans le panier
    const setCartProducts = useCallback((products: Product[]) => {
        setProducts(products);
    }, []);

    //Liste des Id produit dans le panier
    const addToCart = useCallback((id: number) => {
        setProductsInCart(prev => [...prev, id])
    }, []);

    const clearCart = () => {
        //on remet les tableaux à zéro
        setProducts([]);
        setProductsInCart([])
    }

    return (
        <CartContext.Provider value={{ productInCart, products, setCartProducts, addToCart, clearCart }}>
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