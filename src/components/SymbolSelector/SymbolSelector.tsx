import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: 'black', // Dropdown background
          color: 'white', // Dropdown text
        },
        inputRoot: {
          color: 'white', // Input text
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'grey',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiAutocomplete-clearIndicator': {
            color: 'white' // Clear icon color
          },
        },
        popupIndicator: {
          color: 'white', // Dropdown icon
        }
      }
    }
  }
});

type SymbolSelectorProps = {
    symbols: string[];
    value: string;
    onChange: (newSymbol: string) => void;
};

export const SymbolSelector: React.FC<SymbolSelectorProps> = ({ symbols, value, onChange }) => {
    return (
        <ThemeProvider theme={theme}>
            <Autocomplete
                disablePortal
                id="symbol-selector"
                options={symbols}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Company" />}
                value={value}
                onChange={(event, newValue) => {
                    if (newValue) onChange(newValue);
                }}
            />
        </ThemeProvider>
    );
};

export default SymbolSelector;
