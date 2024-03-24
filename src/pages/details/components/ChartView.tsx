import {TimeChartOptions, createChart} from 'lightweight-charts';
import React, {useEffect, useRef} from 'react';
import {TimeSeriesItem} from '../../../models/responses';
import {TimeSeries} from '../../../models/ViewModels/TimeSeries';
import {Box} from '@mui/joy';
import {sort} from '../../../utils/array';

interface ChartViewProps {
  data?: TimeSeriesItem[];
}

const ChartView: React.FC<ChartViewProps> = ({data}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !data) {
      return;
    }

    const chartOptions = {
      layout: {
        textColor: 'black',
        background: {type: 'solid', color: 'transparent'},
      },
    };

    const chart = createChart(
      containerRef.current,
      chartOptions as TimeChartOptions
    );

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeries.setData(sort(data.map(TimeSeries), 'time', 'asc'));

    chart.timeScale().fitContent();

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
    <Box component="section" ref={containerRef} sx={{height: '100%'}}></Box>
  );
};

export default ChartView;
