import { statisticsDiv, statisticsLabel, statisticsPanel, statisticValue } from "../styles/theme";
import type { Product } from "../types/Product";

interface StatisticsProps {
    products: Product[];
}

function Statistics({ products }: StatisticsProps) {
    const totalProducts = products.length;
    const totalStockValue = products.reduce((acc, product) => { return acc + product.price * product.stock }, 0);
    const averagePrice =
        (totalProducts > 0) ?
            Math.round(products.reduce((acc, product) => { return acc + product.price }, 0) / totalProducts)
            : 0;

    return (
        <div style={statisticsPanel}>
            <div style={statisticsDiv}>
                <label style={statisticsLabel}>📦</label>
                <span style={statisticValue}>{totalProducts}</span>
                <label style={statisticsLabel}>{totalProducts > 1 ? 'produits' : 'produit'}</label>
            </div>
            <div style={statisticsDiv}>
                <label style={statisticsLabel}>💰</label>
                <span style={statisticValue}>{totalStockValue}</span>
                <label style={statisticsLabel}>€</label>
            </div>
            {totalProducts > 0 ?
                <div style={statisticsDiv}>
                    <label style={statisticsLabel}>📊</label>
                    <span style={statisticValue}>{averagePrice}</span>
                    <label style={statisticsLabel}>€ moy</label>
                </div>
                :
                <div style={statisticsDiv}>
                    <label style={{...statisticsLabel, color: 'red' }}>calcul impossible</label>
                </div>
            }
        </div >
    );
};

export default Statistics;