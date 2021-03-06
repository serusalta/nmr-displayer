import React, { memo } from 'react';

const styles = {
  width: '100%',
  height: '100%',
  padding: '0px',
  display: 'flex',
  flexDirection: 'column',
};
const Table = memo(({ children, className, style }) => {
  return (
    <div className={className} style={{ ...styles, ...style }}>
      {children}
    </div>
  );
});

export default Table;
