import {Box, Button} from '@mui/joy';
import React, {useState} from 'react';

import {DateRange} from '../../../models/generic';

interface DateRangeFilterProps {
  onChange: (arg: DateRange) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({onChange}) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date().toString(),
    to: '',
  });

  const createFieldUpdater =
    (name: keyof typeof dateRange) =>
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const newState: typeof dateRange = {
        ...dateRange,
        [name]: ev.target.value,
      };

      // Swap if from is more recent than to
      if (
        new Date(newState.from)?.getTime() > new Date(newState.to)?.getTime()
      ) {
        const to = newState.from;
        newState.from = newState.to;
        newState.to = to;
      }

      setDateRange(newState);
    };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    onChange(dateRange);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="from"
          value={dateRange.from}
          onChange={createFieldUpdater('from')}
        />
        <input
          type="date"
          name="to"
          value={dateRange.to}
          onChange={createFieldUpdater('to')}
        />
        <Button
          type="submit"
          disabled={getIsSubmitDisabled(dateRange)}
          variant="solid"
          size="sm"
        >
          Search Date Range
        </Button>
      </form>
    </Box>
  );
};

const getIsSubmitDisabled = (dateRange: DateRange) => {
  try {
    const {from, to} = dateRange;
    // check if dates are valid
    return (
      Number.isNaN(new Date(from).getTime()) ||
      Number.isNaN(new Date(to).getTime())
    );
  } catch (error) {
    return true;
  }
};

export default React.memo(DateRangeFilter);
