import { Box, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { getFlatProduct } from 'src/utils/getFlatProduct';
import { ProductAttributeType, ProductList } from 'src/types/Product';
import './SearchProductDropdown.style.scss';
import React, { memo, useState } from 'react';

interface Props {
  stringSearch: string;
  onsetSearchString: (value: string) => void;
  result: ProductList;
  onSelectOption: (atrribute: ProductAttributeType) => void;
}
const SearchProductDropdown = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { stringSearch, onsetSearchString, result, onSelectOption } = props;
  return (
    <div
      className="search-result"
      onBlur={(e) => {
        // e.stopPropagation();
        // setOpen(false);
      }}
    >
      <TextField
        id="search-field"
        fullWidth
        size="small"
        onFocus={() => {
          setOpen(true);
        }}
        placeholder="Tìm kiếm theo tên hoặc mã sản phẩm"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={stringSearch}
        onChange={(e) => {
          onsetSearchString(e.target.value);
        }}
      />
      {open && (
        <div className="search-result-value">
          {getFlatProduct(result?.data)?.map((result, index) => (
            <React.Fragment key={index}>
              {result.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    onSelectOption(item.product);
                    setOpen(false);
                  }}
                >
                  {item.message}
                </MenuItem>
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(SearchProductDropdown);
