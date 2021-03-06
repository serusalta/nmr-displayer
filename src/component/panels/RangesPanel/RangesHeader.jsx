import lodash from 'lodash';
import React, { useCallback } from 'react';
import { useAlert } from 'react-alert';
import { FaFileExport, FaUnlink, FaSitemap } from 'react-icons/fa';
import { getACS } from 'spectra-data-ranges';

import { useDispatch } from '../../context/DispatchContext';
import { useModal } from '../../elements/Modal';
import ToolTip from '../../elements/ToolTip/ToolTip';
import ChangeSumModal from '../../modal/ChangeSumModal';
import CopyClipboardModal from '../../modal/CopyClipboardModal';
import {
  CHANGE_RANGE_SUM,
  DELETE_RANGE,
  SET_SHOW_MULTIPLICITY_TREES,
} from '../../reducer/types/Types';
import { copyTextToClipboard } from '../../utility/Export';
import DefaultPanelHeader from '../header/DefaultPanelHeader';

const styles = {
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '0.55px solid rgb(240, 240, 240)',
  },
  sumButton: {
    borderRadius: '5px',
    marginTop: '3px',
    color: 'white',
    backgroundColor: '#6d6d6d',
    border: 'none',
    height: '16px',
    width: '18px',
    fontSize: '12px',
    padding: 0,
  },
  removeAssignmentsButton: {
    borderRadius: '5px',
    marginTop: '3px',
    marginLeft: '2px',
    border: 'none',
    height: '16px',
    width: '18px',
    fontSize: '12px',
    padding: 0,
  },
  setShowMultiplicityTreesButton: {
    borderRadius: '5px',
    marginTop: '3px',
    marginLeft: '5px',
    color: 'black',
    backgroundColor: 'transparent',
    border: 'none',
    height: '16px',
    width: '18px',
    fontSize: '12px',
    padding: 0,
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
  },
};

const RangesHeader = ({
  ranges,
  activeTab,
  molecules,
  onUnlink,
  onFilterActivated,
  onSettingClick,
  isFilterActive,
  filterCounter,
  showMultiplicityTrees,
}) => {
  const dispatch = useDispatch();
  const modal = useModal();
  const alert = useAlert();
  const currentSum = lodash.get(ranges, 'options.sum', null);

  const removeAssignments = useCallback(() => {
    ranges.values.forEach((range) => onUnlink(range));
  }, [ranges, onUnlink]);

  const changeRangesSumHandler = useCallback(
    (value) => {
      if (value !== undefined) {
        dispatch({ type: CHANGE_RANGE_SUM, value });
      }

      modal.close();
    },
    [dispatch, modal],
  );

  const showChangeRangesSumModal = useCallback(() => {
    modal.show(
      <ChangeSumModal
        onClose={() => modal.close()}
        onSave={changeRangesSumHandler}
        header={`Set new Ranges Sum (Current: ${currentSum})`}
        molecules={molecules}
        element={activeTab ? activeTab.replace(/[0-9]/g, '') : null}
      />,
    );
  }, [activeTab, changeRangesSumHandler, currentSum, modal, molecules]);

  const handleDeleteAll = useCallback(() => {
    modal.showConfirmDialog('All ranges will be deleted. Are You sure?', {
      onYes: () => {
        removeAssignments();
        dispatch({ type: DELETE_RANGE });
      },
    });
  }, [dispatch, modal, removeAssignments]);

  const saveToClipboardHandler = useCallback(
    (value) => {
      const success = copyTextToClipboard(value);
      if (success) {
        alert.success('Data copied to clipboard');
      } else {
        alert.error('copy to clipboard failed');
      }
    },
    [alert],
  );

  const saveAsHTMLHandler = useCallback(() => {
    const result = getACS(ranges.values);
    modal.show(
      <CopyClipboardModal
        text={result}
        onCopyClick={saveToClipboardHandler}
        onClose={() => modal.close()}
      />,
      {},
    );
  }, [modal, ranges.values, saveToClipboardHandler]);

  const handleOnRemoveAssignments = useCallback(() => {
    modal.showConfirmDialog('All assignments will be removed. Are you sure?', {
      onYes: removeAssignments,
    });
  }, [removeAssignments, modal]);

  const handleSetShowMultiplicityTrees = useCallback(() => {
    dispatch({
      type: SET_SHOW_MULTIPLICITY_TREES,
    });
  }, [dispatch]);

  return (
    <DefaultPanelHeader
      counter={ranges && ranges.values && ranges.values.length}
      onDelete={handleDeleteAll}
      deleteToolTip="Delete All Ranges"
      onFilter={onFilterActivated}
      filterToolTip={
        isFilterActive ? 'Show all ranges' : 'Hide ranges out of view'
      }
      filterIsActive={isFilterActive}
      counterFiltered={filterCounter}
      showSettingButton="true"
      onSettingClick={onSettingClick}
    >
      <ToolTip title="Preview publication string" popupPlacement="right">
        <button style={styles.button} type="button" onClick={saveAsHTMLHandler}>
          <FaFileExport />
        </button>
      </ToolTip>
      <ToolTip
        title={`Change Ranges Sum (${currentSum})`}
        popupPlacement="right"
      >
        <button
          style={styles.sumButton}
          type="button"
          onClick={showChangeRangesSumModal}
        >
          Σ
        </button>
      </ToolTip>
      <ToolTip title={`Remove all Assignments`} popupPlacement="right">
        <button
          style={styles.removeAssignmentsButton}
          type="button"
          onClick={handleOnRemoveAssignments}
          disabled={!ranges || !ranges.values || ranges.values.length === 0}
        >
          <FaUnlink />
        </button>
      </ToolTip>
      <ToolTip
        title={
          showMultiplicityTrees
            ? 'Hide Multiplicity Trees in Spectrum'
            : 'Show Multiplicity Trees in Spectrum'
        }
        popupPlacement="right"
      >
        <button
          style={
            showMultiplicityTrees && showMultiplicityTrees === true
              ? {
                  ...styles.setShowMultiplicityTreesButton,
                  backgroundColor: '#6d6d6d',
                  color: 'white',
                  fontSize: '10px',
                }
              : styles.setShowMultiplicityTreesButton
          }
          type="button"
          onClick={handleSetShowMultiplicityTrees}
          disabled={!ranges || !ranges.values || ranges.values.length === 0}
        >
          <FaSitemap />
        </button>
      </ToolTip>
    </DefaultPanelHeader>
  );
};

export default RangesHeader;
