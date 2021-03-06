import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';

import ReactTableFlexLayout from '../elements/ReactTable/ReactTableFlexLayout';
import InfoWrapper from '../hoc/InfoWrapper';

const styles = {
  searchInput: {
    width: '100%',
    borderRadius: '5px',
    border: '0.55px solid gray',
    padding: '5px',
    marginBottom: '2px',
  },
};

// information panel
const InformationPanel = memo(({ info, meta }) => {
  const [information, setInformation] = useState([]);
  const [matches, setMatchesData] = useState([]);

  const handleSearch = useCallback(
    (input) => {
      const values = Object.keys(information).filter((key) =>
        key.toLowerCase().includes(input.target.value.toLowerCase()),
      );
      setMatchesData(values);
    },
    [information],
  );

  useEffect(() => {
    if (info && meta) {
      const keys = Object.keys(info).concat(Object.keys(meta));

      setMatchesData(keys);
      setInformation({
        ...info,
        ...meta,
      });
    }
  }, [info, meta]);

  const columns = useMemo(
    () => [
      {
        Header: 'Parameter',
        sortType: 'basic',
        minWidth: 100,
        width: 20,
        maxWidth: 20,
        Cell: ({ row }) => (
          <p style={{ padding: '5px', backgroundColor: 'white' }}>
            {row.original}
          </p>
        ),
      },
      {
        Header: 'Value',
        sortType: 'basic',
        resizable: true,
        Cell: ({ row }) => (
          <p
            style={{
              backgroundColor: '#efefef',
              width: '100%',
              height: '100%',
              padding: '5px',
              fontFamily: 'monospace',
              whiteSpace: 'pre',
            }}
          >
            {information[row.original].toString()}
          </p>
        ),
      },
    ],
    [information],
  );

  return (
    <>
      <div>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search for parameter..."
          onChange={handleSearch}
        />
      </div>

      <ReactTableFlexLayout data={matches} columns={columns} />
    </>
  );
});

export default InfoWrapper(InformationPanel);
