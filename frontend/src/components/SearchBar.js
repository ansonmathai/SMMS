import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import './SearchBar.css'; // Import the stylesheet

const SearchBar = ({ searchInput, handleSearch, handleSelectProduct, myOptions }) => {
  const searchInputRef = useRef(null);

  return (
    <div className="search-bar-container">
      <Autocomplete
        style={{ width: 400 }}
        freeSolo
        options={myOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Product"
            value={searchInput}
            onChange={handleSearch}
            inputRef={searchInputRef}
          />
        )}
        onChange={(event, value) => handleSelectProduct(event, value)}
      />
    </div>
  );
};

export default SearchBar;
