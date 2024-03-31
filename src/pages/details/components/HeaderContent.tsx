import {ChevronLeft} from '@mui/icons-material';
import {IconButton, Typography} from '@mui/joy';
import React from 'react';

interface HeaderContentProps {
  onClickGoBack: () => void;
  symbol: string;
}

const HeaderContent: React.FC<HeaderContentProps> = ({
  onClickGoBack,
  symbol,
}) => {
  return (
    <>
      <IconButton sx={{color: 'neutral.200'}} onClick={onClickGoBack}>
        <ChevronLeft />
      </IconButton>
      <Typography sx={{color: 'inherit'}}>{symbol}</Typography>
    </>
  );
};

export default HeaderContent;
