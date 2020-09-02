/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import lodash from 'lodash';
import { useMemo, useCallback, useState } from 'react';

import { useAssignment } from '../../assignment';
import { useHighlight, useHighlightData } from '../../highlight';
import { HighlightSignalConcatenation } from '../extra/constants/ConcatenationStrings';
import { SignalKindsToConsiderInIntegralsSum } from '../extra/constants/SignalsKinds';
import { isCloumnVisible } from '../extra/preferences/ColumnsHelper';

import AbsoluteColumn from './TableColumns/AbsoluteColumn';
import ActionsColumn from './TableColumns/ActionsColumn';
import CouplingColumn from './TableColumns/CouplingColumn';
import RangeAssignmentsColumn from './TableColumns/RangeAssignmentsColumn';
import RangeColumn from './TableColumns/RangeColumn';
import RelativeColumn from './TableColumns/RelativeColumn';
import SignalAssignmentsColumn from './TableColumns/SignalAssignmentsColumn';
import SignalColumn from './TableColumns/SignalColumn';
import useFormat from './TableColumns/format';

const HighlightedRowStyle = css`
  background-color: #ff6f0057;
`;

const ConstantlyHighlightedRowStyle = css`
  background-color: #f5f5dc;
`;

const RangesTableRow = ({ rowData, onUnlink, onContextMenu, preferences }) => {
  const assignmentRange = useAssignment(rowData.id);
  const highlightRange = useHighlight(
    [assignmentRange.id].concat(assignmentRange.assigned.x || []),
  );
  const assignmentSignal = useAssignment(rowData.tableMetaInfo.id);
  const highlightSignal = useHighlight(
    [assignmentSignal.id].concat(assignmentSignal.assigned.x || []),
  );
  const highlightData = useHighlightData();

  const [unlinkRangeButtonVisibility, showUnlinkRangeButton] = useState(false);
  const [unlinkSignalButtonVisibility, showUnlinkSignalButton] = useState(
    false,
  );

  const getFormat = useFormat(preferences);

  const rowSpanTags = useMemo(() => {
    return {
      rowSpan: rowData.tableMetaInfo.rowSpan,
      style: lodash.get(rowData.tableMetaInfo, 'hide', false)
        ? { display: 'none' }
        : null,
    };
  }, [rowData.tableMetaInfo]);

  const unlinkHandler = useCallback(
    (e, isOnRangeLevel) => {
      // event handling here in case of unlink button clicked
      // to also exit the assignment mode then
      onUnlink(rowData, isOnRangeLevel);
      if (isOnRangeLevel !== undefined) {
        if (isOnRangeLevel) {
          showUnlinkRangeButton(false);
          assignmentRange.removeAll('x');
        } else {
          showUnlinkSignalButton(false);
          assignmentSignal.removeAll('x');
        }
      } else {
        showUnlinkRangeButton(false);
        showUnlinkSignalButton(false);
      }
    },
    [assignmentRange, assignmentSignal, onUnlink, rowData],
  );

  const linkHander = useCallback((e, assignment) => {
    assignment.onClick(e, 'x');
  }, []);

  const onHoverRange = useMemo(() => {
    return {
      onMouseEnter: () => {
        assignmentRange.onMouseEnter('x');
        highlightRange.show();
      },
      onMouseLeave: () => {
        assignmentRange.onMouseLeave('x');
        highlightRange.hide();
      },
    };
  }, [assignmentRange, highlightRange]);

  const onHoverSignal = useMemo(() => {
    return {
      onMouseEnter: () => {
        assignmentSignal.onMouseEnter('x');
        highlightSignal.show();
      },
      onMouseLeave: () => {
        assignmentSignal.onMouseLeave('x');
        highlightSignal.hide();
      },
    };
  }, [assignmentSignal, highlightSignal]);

  const trCss = useMemo(() => {
    return highlightRange.isActive || assignmentRange.isActive
      ? HighlightedRowStyle
      : lodash.get(
          rowData,
          'rowData.tableMetaInfo.isConstantlyHighlighted',
          false,
        )
      ? ConstantlyHighlightedRowStyle
      : null;
  }, [assignmentRange.isActive, highlightRange.isActive, rowData]);

  return (
    <tr
      onContextMenu={(e) => onContextMenu(e, rowData)}
      css={trCss}
      {...highlightRange.onHover}
    >
      <td {...rowSpanTags} {...onHoverRange}>
        {rowData.tableMetaInfo.rowIndex + 1}
      </td>

      {isCloumnVisible(preferences, 'showFrom') && (
        <RangeColumn
          value={rowData.from}
          rowSpanTags={rowSpanTags}
          onHoverRange={onHoverRange}
          format={getFormat('showFrom')}
        />
      )}
      {isCloumnVisible(preferences, 'showTo') && (
        <RangeColumn
          value={rowData.showTo}
          rowSpanTags={rowSpanTags}
          onHoverRange={onHoverRange}
          format={getFormat('toFormat')}
        />
      )}

      <SignalColumn
        rowData={rowData}
        onHoverSignal={onHoverSignal}
        preferences={preferences}
      />

      {isCloumnVisible(preferences, 'showRelative') && (
        <RelativeColumn
          rowData={rowData}
          rowSpanTags={rowSpanTags}
          onHoverRange={onHoverRange}
          SignalKindsToConsiderInIntegralsSum={
            SignalKindsToConsiderInIntegralsSum
          }
          format={getFormat('relativeFormat')}
        />
      )}

      {isCloumnVisible(preferences, 'showAbsolute') && (
        <AbsoluteColumn
          value={rowData.absolute}
          rowSpanTags={rowSpanTags}
          onHoverRange={onHoverRange}
          format={getFormat('absoluteFormat')}
        />
      )}

      <td {...onHoverSignal}>
        {lodash.get(rowData, 'tableMetaInfo.signal.multiplicity', '')}
      </td>

      <CouplingColumn rowData={rowData} onHoverSignal={onHoverSignal} />

      <SignalAssignmentsColumn
        rowData={rowData}
        assignment={assignmentSignal}
        highlight={highlightSignal}
        onHover={onHoverSignal}
        unlinkVisibility={unlinkSignalButtonVisibility}
        onUnlinkVisibilityChange={(flag) => showUnlinkSignalButton(flag)}
        onLink={linkHander}
        onUnlink={unlinkHandler}
      />

      <RangeAssignmentsColumn
        rowData={rowData}
        assignment={assignmentRange}
        highlight={highlightRange}
        onHover={onHoverRange}
        unlinkVisibility={unlinkRangeButtonVisibility}
        onUnlinkVisibilityChange={(flag) => showUnlinkSignalButton(flag)}
        onLink={linkHander}
        onUnlink={unlinkHandler}
        rowSpanTags={rowSpanTags}
        highlightData={highlightData}
        HighlightSignalConcatenation={HighlightSignalConcatenation}
      />

      <ActionsColumn
        rowData={rowData}
        onHoverSignal={onHoverSignal}
        onHoverRange={onHoverRange}
        rowSpanTags={rowSpanTags}
        onUnlink={unlinkHandler}
      />
    </tr>
  );
};

export default RangesTableRow;
