import React, { useMemo } from 'react';
import { XY } from 'ml-spectra-processing';

import { useChartData } from '../context/ChartContext';

export const Line = ({ x, y, id, color, index }) => {
  const {
    xDomain,
    scaleX,
    scaleY,
    activeSpectrum,
    verticalAlign,
  } = useChartData();

  const isActive = useMemo(() => {
    return activeSpectrum === null
      ? true
      : id === activeSpectrum.id
      ? true
      : false;
  }, [activeSpectrum, id]);

  const vAlign = useMemo(() => {
    return verticalAlign.flag
      ? verticalAlign.stacked
        ? index * verticalAlign.value
        : 0
      : verticalAlign.value;
  }, [index, verticalAlign.flag, verticalAlign.stacked, verticalAlign.value]);

  const paths = useMemo(() => {
    if (x && y) {
      const pathPoints = XY.reduce(
        { x, y },
        {
          from: xDomain[0],
          to: xDomain[1],
        },
      );
      const _scaleY = scaleY(id);
      const _scaleX = scaleX();
      let path = `M ${_scaleX(pathPoints.x[0])} ${_scaleY(pathPoints.y[0])} `;
      path += pathPoints.x.slice(1).reduce((accumulator, point, i) => {
        accumulator += ` L ${_scaleX(point)} ${_scaleY(pathPoints.y[i + 1])}`;
        return accumulator;
      }, '');
      return path;
    } else {
      return null;
    }
  }, [id, scaleX, scaleY, x, xDomain, y]);

  return (
    <path
      className="line"
      key={id}
      stroke={color}
      fill="none"
      style={{
        opacity: isActive ? 1 : 0.2,
      }}
      d={paths}
      transform={`translate(0,-${vAlign})`}
    />
  );
};

export default Line;
