import { searchBar, searchInput } from "../styles/theme";

interface SearchBarProps{
    searchTerm: string;
    onSearchChange: (searchTerm : string) => void ;
}

function SearchBar({searchTerm, onSearchChange} : SearchBarProps){

    return(<div style={searchBar}>
        <span>🔍</span>
        <input placeholder="Saisir la recherche" style={searchInput} value={searchTerm} onChange={(e) =>onSearchChange(e.currentTarget.value)}/>
    </div>);

};

export default SearchBar;