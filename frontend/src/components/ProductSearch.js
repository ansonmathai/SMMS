import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SearchBar = ({ searchInput, handleSearch, handleSelectProduct, myOptions }) => {
  return (
    <Autocomplete
      style={{ width: 400 }}
      freeSolo
      options={myOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Search Box"
          value={searchInput}
          onChange={handleSearch}
        />
      )}
      onChange={handleSelectProduct}
    />
  );
}

export default ProductSearch;
