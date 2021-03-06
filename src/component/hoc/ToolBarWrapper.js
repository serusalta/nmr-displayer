import React, { useMemo, memo } from 'react';

import { useChartData } from '../context/ChartContext';

function ToolBarWrapper(WrappedComponent) {
  const Wrapper = (props) => {
    const {
      data,
      activeSpectrum,
      verticalAlign,
      displayerMode,
    } = useChartData();

    const { info = {}, spectrumsCount = 0 } = useMemo(() => {
      if (data && activeSpectrum && activeSpectrum.id) {
        const result = data.find((datum) => datum.id === activeSpectrum.id);
        return result !== null && result !== undefined
          ? { info: result.info, spectrumsCount: result.length }
          : {};
      }
      return {};
    }, [activeSpectrum, data]);

    const { forwardedRef, ...rest } = props;
    return (
      <WrappedComponent
        {...rest}
        info={info}
        activeSpectrum={activeSpectrum}
        spectrumsCount={spectrumsCount}
        verticalAlign={verticalAlign}
        displayerMode={displayerMode}
        ref={forwardedRef}
      />
    );
  };

  return memo(
    React.forwardRef((props, ref) => {
      return <Wrapper {...props} forwardedRef={ref} />;
    }),
  );
}
export default ToolBarWrapper;
