import React, { useMemo, memo } from 'react';

import { useChartData } from '../context/ChartContext';

function MoleculeWrapper(WrappedComponent) {
  const Wrapper = (props) => {
    const {
      data,
      activeSpectrum,
      molecules,
      displayerMode,
      activeTab,
    } = useChartData();

    const { ranges = {}, zones = {} } = useMemo(() => {
      if (data && activeSpectrum && activeSpectrum.id) {
        const { ranges, zones } = data.find(
          (datum) => datum.id === activeSpectrum.id,
        );
        return { ranges, zones };
      }
      return {};
    }, [activeSpectrum, data]);

    const { forwardedRef, ...rest } = props;
    return (
      <WrappedComponent
        {...rest}
        ranges={ranges}
        zones={zones}
        molecules={molecules}
        displayerMode={displayerMode}
        activeTab={activeTab}
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
export default MoleculeWrapper;
