import { Input, Button } from "@nextui-org/react";
import SearchIcon from "@mui/icons-material/Search"; // Correct import statement for SearchIcon

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center justify-center rounded-md">
      <SearchIcon /> {/* Using SearchIcon from Material-UI */}
      <Input placeholder="Search Twitter" className="w-96"/>

    </div>
  );
};
export default SearchBar;
