import {Box} from '@mui/joy';
import React, {useEffect, useRef} from 'react';

import {TimeSeriesItem} from '../../../models/responses';
import {setupChart} from '../../../utils/chart';

interface ChartViewProps {
  data?: TimeSeriesItem[];
}

const ChartView: React.FC<ChartViewProps> = ({data}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !data) {
      return;
    }

    const chart = setupChart(data, containerRef.current);

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      chart.remove();
    };
  }, [data]);

  return (
    <Box component="section" ref={containerRef} sx={{height: '100%'}}>
      {/** CHART CONTENT */}
    </Box>
  );
};

export default ChartView;
