import type { ProductFilterStock, ProductSortBy } from "../types/Product";
import { filterPanelContainer, inputRadioFilterPanel, spacing } from "../styles/theme";

interface FilterPanelProps {
    filterStock: ProductFilterStock;
    onFilterStock: (filter: ProductFilterStock) => void;
    sortBy: ProductSortBy;
    onSortBy: (sortBy: ProductSortBy) => void;

}
function FilterPanel({ filterStock, onFilterStock, sortBy, onSortBy }: FilterPanelProps) {
    return (
        <div style={filterPanelContainer}>
            <div style={{display:'flex'}}>
                <span style={{ fontWeight: '600', marginRight: spacing.sm }}>
                    <u>Filtre Stock : </u>
                </span>
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
            </div>
            <div style={{display:'flex'}}>
                <span style={{ fontWeight: '600', marginRight: spacing.sm }}>
                    <u>Trier par :</u>
                </span>
                <div>
                    <select value={sortBy} onChange={(e) => { onSortBy(e.currentTarget.value as ProductSortBy) }}>
                        <option value="name">Nom</option>
                        <option value="price">Prix</option>
                        <option value="stock">Stock</option>
                    </select>
                </div>
            </div>
        </div >);
}
export default FilterPanel; 