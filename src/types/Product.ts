export type Category = 'Électronique' | 'Vêtements' | 'Alimentation' | 'Autre';
export type ProductFilterStock = 'all' | 'inStock' |'outOfStock' ;
export type ProductSortBy = 'name' | 'price' | 'stock';

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: Category;
};

