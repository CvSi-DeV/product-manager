import type { ProductFilterStock, ProductSortBy } from "../types/Product";
import { filterPanelContainer, inputRadioFilterPanel } from "../styles/theme";

interface FilterPanelProps {
    filterStock: ProductFilterStock;
    onFilterStock: (filter: ProductFilterStock) => void;
    sortBy: ProductSortBy;
    onSortBy: (sortBy: ProductSortBy) => void;

}
function FilterPanel({ filterStock, onFilterStock, sortBy, onSortBy }: FilterPanelProps) {
    return (
        <div style={filterPanelContainer}>
            <label>Filtre Stock</label>
            <div style={inputRadioFilterPanel}>
                <label>
                    <input type="radio" name="filterStock" value='all' checked={filterStock === 'all'}
                        onChange={(e) => onFilterStock(e.currentTarget.value as ProductFilterStock)} />
                    Tous</label>
                <label>
                    <input type="radio" name="filterStock" value="inStock" checked={filterStock === 'inStock'}
                        onChange={(e) => onFilterStock(e.currentTarget.value as ProductFilterStock)} />
                    En Stock</label>
                <label>
                    <input type="radio" name="filterStock" value={'outOfStock'} checked={filterStock === 'outOfStock'}
                        onChange={(e) => onFilterStock(e.currentTarget.value as ProductFilterStock)} />
                    Rupture de Stock</label>
            </div>
            <div>
                <label>Trier par : </label>
                <select value={sortBy} onChange={(e) => { onSortBy(e.currentTarget.value as ProductSortBy) }}>
                    <option value="name">Nom</option>
                    <option value="price">Prix</option>
                    <option value="stock">Stock</option>
                </select>
            </div>
        </div >);
}
export default FilterPanel; 