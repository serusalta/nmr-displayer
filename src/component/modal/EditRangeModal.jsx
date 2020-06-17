import { jsx, css } from '@emotion/core';
/** @jsx jsx */
import { useCallback, useMemo, useEffect } from 'react';
import { FaTimes, FaSearchPlus } from 'react-icons/fa';

import { useChartData } from '../context/ChartContext';
import { useDispatch } from '../context/DispatchContext';
import RangeForm from '../elements/forms/editRange/RangeForm';
import {
  UNSET_RANGE_IN_EDITION,
  SET_NEW_SIGNAL_DELTA_SELECTION_IS_ENABLED,
  UNSET_SELECTED_NEW_SIGNAL_DELTA,
  SET_RANGE_IN_EDITION,
} from '../reducer/types/Types';

const styles = css`
  overflow: auto;
  width: 600px;
  height: 500px;
  padding: 5px;
  button:focus {
    outline: none;
  }
  .header {
    height: 24px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    span {
      color: #464646;
      font-size: 15px;
      flex: 1;
    }

    button {
      background-color: transparent;
      border: none;
      svg {
        height: 16px;
      }
    }
    .zoom-button {
      background-color: transparent;
      border: none;
      svg {
        height: 16px;
      }
      margin-right: 10px;
    }
  }
  .container {
    display: flex;
    margin: 30px 5px;
    input,
    button {
      padding: 5px;
      border: 1px solid gray;
      border-radius: 5px;
      height: 36px;
      margin: 2px;
    }
    input {
      flex: 10;
    }
    button {
      flex: 2;
      color: white;
      background-color: gray;
    }
  }
`;

const EditRangeModal = ({ onSave, onClose, onZoom, rangeID }) => {
  const { data: spectraData, activeSpectrum } = useChartData();
  const dispatch = useDispatch();

  const rangeData = useMemo(() => {
    return activeSpectrum && spectraData
      ? spectraData[activeSpectrum.index].ranges.values.find(
          (_range) => _range.id === rangeID,
        )
      : null;
  }, [activeSpectrum, spectraData, rangeID]);

  const handleOnZoom = useCallback(() => {
    onZoom(rangeData);
  }, [onZoom, rangeData]);

  useEffect(() => {
    handleOnZoom();
    dispatch({ type: SET_RANGE_IN_EDITION, rangeID: rangeData.id });
  }, [dispatch, handleOnZoom, rangeData]);

  const handleOnClose = useCallback(() => {
    dispatch({ type: UNSET_RANGE_IN_EDITION });
    dispatch({
      type: SET_NEW_SIGNAL_DELTA_SELECTION_IS_ENABLED,
      isEnabled: false,
    });
    dispatch({ type: UNSET_SELECTED_NEW_SIGNAL_DELTA });

    onClose();
  }, [dispatch, onClose]);

  const handleOnSave = useCallback(
    async (formValues) => {
      rangeData.signal = formValues.signals.slice();

      await onSave(rangeData);
      handleOnClose();
    },
    [handleOnClose, onSave, rangeData],
  );

  return (
    <div css={styles}>
      <div className="header">
        <span>Range Information and Editing</span>
        <button type="button" onClick={handleOnZoom} className="zoom-button">
          <FaSearchPlus title="Set to default view on range in spectrum" />
        </button>
        <button type="button" onClick={handleOnClose} title="Close">
          <FaTimes />
        </button>
      </div>

      <RangeForm
        rangeData={rangeData}
        handleOnClose={handleOnClose}
        handleOnSave={handleOnSave}
      />
    </div>
  );
};

EditRangeModal.defaultProps = {
  onSave: () => {
    return null;
  },
  onClose: () => {
    return null;
  },
  onZoom: () => {
    return null;
  },
};

export default EditRangeModal;
