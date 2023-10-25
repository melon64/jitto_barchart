import React, { useState, useEffect } from 'react';
import './BarChart.css';

interface BarChartProps {
  data: number[];
  labels?: string[];
  horizontal?: boolean;
  theme?: {
    barColor: string;
    labelColor: string;
  };
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  labels,
  horizontal = false,
  theme = { barColor: 'blue', labelColor: 'black' },
}) => {
  //state to track bar width and hovered bar index
  const [barWidth, setBarWidth] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  //find the max in data
  const maxValue = Math.max(...data);

  //state to track if animation has started
  const [animationStarted, setAnimationStarted] = useState<boolean>(false);

  //calculate bar width and start animation after a delay
  useEffect(() => {
    const numBars = data.length;
    const barWidth = 100 / (numBars * 2);
    setBarWidth(barWidth);

    setTimeout(() => {
      setAnimationStarted(true);
    }, 500); //start animation after 0.5 seconds
  }, [data, horizontal]);

  //define chart dimensions based on horizontal flag
  const yAxisHeight = 20;
  const xAxisHeight = 20;
  const chartHeight = horizontal ? 100 : 100 - xAxisHeight;
  const chartWidth = horizontal ? 100 - yAxisHeight : 100;

  return (
    <div className={`bar-chart ${horizontal ? 'horizontal' : ''}`}>
      <svg width="100%" height="100%">
        {/* Y Axis */}
        {horizontal && (
          <line
            x1={chartWidth + '%'}
            y1={'0'}
            x2={chartWidth + '%'}
            y2={'100%'}
            stroke="gray"
            className="x-axis"
          />
        )}
        {/* X Axis */}
        <line
          x1="0"
          y1={horizontal ? '100%' : chartHeight + '%'}
          x2={chartWidth + '%'}
          y2={horizontal ? '100%' : chartHeight + '%'}
          stroke="gray"
          className="x-axis"
        />

        {data.map((value, index) => {
          const label = labels ? labels[index] : '';
          const scaledValue = (value / maxValue) * (horizontal ? chartWidth : chartHeight);
          const x = horizontal ? chartWidth - scaledValue : index * barWidth * 2;
          const y = horizontal ? index * barWidth * 2 : chartHeight - scaledValue;
          const width = horizontal ? scaledValue : barWidth;
          const height = horizontal ? barWidth : scaledValue;
          const labelX = horizontal ? chartWidth + 4 + '%' : x + barWidth / 2 + '%';
          const labelY = horizontal ? y + barWidth / 2 + '%' : chartHeight + 4 + '%';
          const hoverX = horizontal ? chartWidth - (3 * scaledValue) / 4 + '%' : x + barWidth / 2 + '%';
          const hoverY = horizontal ? labelY : chartHeight - (3 * scaledValue) / 4 + '%';
          const isHovered = index === hoveredIndex;

          return (
            <g
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Bar */}
              <rect
                x={x + '%'}
                y={y + '%'}
                width={width + '%'}
                height={height + '%'}
                fill={theme.barColor}
                className={`bar ${animationStarted ? 'bar' : 'bar-initial'}`}
              />
              {/* Hover Text */}
              {isHovered && (
                <text
                  x={hoverX}
                  y={hoverY}
                  fill={theme.labelColor}
                  textAnchor={horizontal ? 'start' : 'middle'}
                  alignmentBaseline={horizontal ? 'middle' : 'hanging'}
                  className="hover-label"
                >
                  {value}
                </text>
              )}
              {/* Label */}
              <text
                x={labelX}
                y={labelY}
                fill={theme.labelColor}
                textAnchor={horizontal ? 'start' : 'middle'}
                alignmentBaseline={horizontal ? 'middle' : 'hanging'}
                className="bar-label"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BarChart;
