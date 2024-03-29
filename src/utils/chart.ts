import {ColorType, createChart} from 'lightweight-charts';

import {TimeSeriesItem} from '../models/responses';
import {TimeSeries} from '../models/ViewModels/TimeSeries';
import {sort} from './array';

export function setupChart(data: TimeSeriesItem[], element: HTMLElement) {
  const chartOptions = {
    layout: {
      textColor: 'black',
      background: {type: ColorType.Solid, color: 'transparent'},
    },
  };

  const chart = createChart(element, chartOptions);

  chart.applyOptions({
    timeScale: {
      timeVisible: true,
    },
  });
  const candlestickSeries = chart.addCandlestickSeries({
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
  });

  const sortedData = sort(data.map(TimeSeries), 'time', 'asc');
  candlestickSeries.setData(sortedData);

  chart.timeScale().fitContent();

  return chart;
}
