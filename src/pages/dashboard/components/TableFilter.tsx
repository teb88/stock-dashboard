import {Cancel} from '@mui/icons-material';
import {Input, ToggleButtonGroup, Button, Box, IconButton} from '@mui/joy';
import React from 'react';

interface FilterOption {
  key: string;
  label: string;
}

interface TableFilterProps {
  filterOptions: FilterOption[];
  selectedFilterOption: string;
  textFilter: string;
  setTextFilter: (value: string) => void;
  onChangeFilterOption: (key: string) => void;
  placeholder?: string;
}

const TableFilter: React.FC<TableFilterProps> = ({
  textFilter,
  setTextFilter,
  filterOptions,
  selectedFilterOption,
  onChangeFilterOption,
  placeholder,
}) => {
  const handleChangeFilterOption = (newValue: string | null) => {
    if (newValue) {
      onChangeFilterOption(newValue);
    }
  };
  return (
    <Box sx={{display: 'flex', gap: 1, justifyContent: 'center'}}>
      <Input
        endDecorator={
          <IconButton
            onClick={() => setTextFilter('')}
            sx={{visibility: textFilter ? 'visible' : 'hidden'}}
          >
            <Cancel />
          </IconButton>
        }
        type="text"
        placeholder={placeholder}
        size="md"
        value={textFilter}
        onChange={(ev) => setTextFilter(ev.target.value || '')}
      />
      <ToggleButtonGroup
        value={selectedFilterOption}
        onChange={(_, newVal) => handleChangeFilterOption(newVal)}
      >
        {filterOptions?.map(({key, label}) => (
          <Button key={key} value={key}>
            {label}
          </Button>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default TableFilter;
