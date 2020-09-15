/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import lodash from 'lodash';
import { Fragment, useEffect, useCallback, useState, memo } from 'react';
import { useAlert } from 'react-alert';
import {
  FaDownload,
  FaFileDownload,
  FaFileImage,
  FaCopy,
  FaFileExport,
  FaFile,
  FaFileImport,
} from 'react-icons/fa';

import { useDispatch } from '../context/DispatchContext';
import { usePreferences } from '../context/PreferencesContext';
import MenuButton from '../elements/MenuButton';
import { useModal } from '../elements/Modal';
import ToolTip from '../elements/ToolTip/ToolTip';
import ToolBarWrapper from '../hoc/ToolBarWrapper';
import LoadJCAMPModal from '../modal/LoadJCAMPModal';
import { DISPLAYER_MODE } from '../reducer/core/Constants';
import {
  CHANGE_SPECTRUM_DISPLAY_VIEW_MODE,
  TOGGLE_REAL_IMAGINARY_VISIBILITY,
  SET_SPECTRUMS_VERTICAL_ALIGN,
  EXPORT_DATA,
  LOAD_JCAMP_FILE,
  SET_LOADING_FLAG,
} from '../reducer/types/Types';

const styles = css`
  background-color: transparent;
  border: none;
  width: 35px;
  height: 35px;
  min-height: 35px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: outline;
  :focus {
    outline: none !important;
  }
`;

const menuButton = css`
  background-color: transparent;
  border: none;
  border-bottom: 0.55px solid whitesmoke;
  height: 35px;
  outline: outline;
  display: flex;
  justify-content: flex-start;

  :focus {
    outline: none !important;
  }
  span {
    font-size: 10px;
    padding: 0px 10px;
  }
`;

const BasicToolBar = ({
  isViewButtonVisible = true,
  info,
  verticalAlign,
  displayerMode,
  spectrumsCount,
}) => {
  const dispatch = useDispatch();
  const preferences = usePreferences();
  const [isRealSpectrumShown, setIsRealSpectrumShown] = useState(false);
  const [isStacked, activateStackView] = useState(false);
  const alert = useAlert();
  const modal = useModal();

  const selectedSpectrumInfo = { isComplex: false, isFid: false, ...info };

  const saveAsSVGHandler = useCallback(() => {
    dispatch({
      type: EXPORT_DATA,
      exportType: 'svg',
    });
  }, [dispatch]);

  const saveAsPNGHandler = useCallback(
    () => dispatch({ type: EXPORT_DATA, exportType: 'png' }),
    [dispatch],
  );
  const saveToClipboardHandler = useCallback(() => {
    dispatch({ type: EXPORT_DATA, exportType: 'copy' });
       alert.show('Espectro copiado al clipboard');
    // alert.show('Spectrum copied to clipboard');
  }, [alert, dispatch]);
  const saveAsJSONHandler = useCallback(
    () => dispatch({ type: EXPORT_DATA, exportType: 'json' }),
    [dispatch],
  );

  const handleChangeDisplayViewMode = useCallback(() => {
    const flag = !isStacked;
    activateStackView(flag);
    dispatch({
      type: CHANGE_SPECTRUM_DISPLAY_VIEW_MODE,
      flag: flag,
    });
  }, [dispatch, isStacked]);

  const changeSpectrumViewHandler = useCallback(() => {
    dispatch({
      type: TOGGLE_REAL_IMAGINARY_VISIBILITY,
      isRealSpectrumVisible: !isRealSpectrumShown,
    });
    setIsRealSpectrumShown(!isRealSpectrumShown);
  }, [dispatch, isRealSpectrumShown]);

  const alignSpectrumsVerticallyHandler = useCallback(() => {
    dispatch({
      type: SET_SPECTRUMS_VERTICAL_ALIGN,
      flag: !verticalAlign.flag,
    });
  }, [dispatch, verticalAlign.flag]);

  const handleOnKeyPressed = useCallback(
    (e) => {
      if (
        e.target.localName !== 'input' &&
        !e.shiftKey &&
        !e.metaKey &&
        !e.ctrlKey
      ) {
        switch (e.key) {
          case 'c':
            alignSpectrumsVerticallyHandler();
            break;
          case 's':
            handleChangeDisplayViewMode();
            break;
          default:
        }
      }

      if (!e.shiftKey && (e.metaKey || e.ctrlKey)) {
        switch (e.key) {
          case 'c':
            saveToClipboardHandler();
            e.preventDefault();
            break;
          case 's':
            saveAsJSONHandler();
            e.preventDefault();
            break;
          default:
        }
      }
    },
    [
      alignSpectrumsVerticallyHandler,
      handleChangeDisplayViewMode,
      saveAsJSONHandler,
      saveToClipboardHandler,
    ],
  );

  const LoadJacmpHandler = useCallback(
    (file) => {
      if (file) {
        dispatch({ type: LOAD_JCAMP_FILE, files: [file] });
        modal.close();
      } else {
        alert.error('su archivo debe tener una de estas extensiones [ .jdx, dx ] ');
        //alert.error('you file must be one of those extensions [ .jdx, dx ] ');
      }
    },
    [alert, dispatch, modal],
  );

  const startLoadingHandler = useCallback(() => {
    modal.close();
    dispatch({ type: SET_LOADING_FLAG, isLoading: true });
  }, [dispatch, modal]);

  const importJCAMPFile = useCallback(() => {
    modal.show(
      <LoadJCAMPModal
        onLoadClick={LoadJacmpHandler}
        onClose={() => modal.close()}
        startLoading={startLoadingHandler}
      />,
      {},
    );
  }, [LoadJacmpHandler, modal, startLoadingHandler]);

  useEffect(() => {
    document.addEventListener('keydown', handleOnKeyPressed, false);

    return () => {
      document.removeEventListener('keydown', handleOnKeyPressed, false);
    };
  }, [handleOnKeyPressed]);

  const isButtonVisible = useCallback(
    (key) => {
      return !lodash.get(preferences, `toolsBarButtons.${key}`);
    },
    [preferences],
  );

  return (
    <Fragment>
      {isButtonVisible('hideImport') && (
        <MenuButton
          style={styles}
          component={<FaFileImport />}
          toolTip="Import"
        >
          <button type="button" css={menuButton} onClick={importJCAMPFile}>
            <FaFile />
            <span>Add jcamp from URL</span>
          </button>
        </MenuButton>
      )}
      {isButtonVisible('hideExportAs') && (
        <MenuButton
          style={styles}
          component={<FaFileExport />}
          toolTip="Export As"
        >
          <button type="button" css={menuButton} onClick={saveAsSVGHandler}>
            <FaDownload />
            <span>Export as SVG</span>
          </button>
          <button type="button" css={menuButton} onClick={saveAsPNGHandler}>
            <FaFileImage />
            <span>Export as PNG</span>
          </button>
          <button type="button" css={menuButton} onClick={saveAsJSONHandler}>
            <FaFileDownload />
            <span>Save data ( Press Ctrl + S )</span>
          </button>
          <button
            type="button"
            css={menuButton}
            onClick={saveToClipboardHandler}
          >
            <FaCopy />
            <span>Copy image to Clipboard ( Press Ctrl + C )</span>
          </button>
        </MenuButton>
      )}

      {displayerMode === DISPLAYER_MODE.DM_1D &&
        isButtonVisible('hideSpectraStackAlignments') &&
        isViewButtonVisible &&
        spectrumsCount > 1 && (
          <button
            type="button"
            css={[styles, { display: 'block' }]}
            onClick={handleChangeDisplayViewMode}
            className={
              !isStacked
                ? 'ci-icon-nmr-overlay3-aligned'
                : 'ci-icon-nmr-overlay3'
            }
          >
            <ToolTip title="Spectra alignment" popupPlacement="right">
              <div />
              {/* {verticalAlign !== 0 ? <FaMinus /> : <FaBars />} */}
            </ToolTip>
          </button>
        )}
      {displayerMode === DISPLAYER_MODE.DM_1D &&
        isButtonVisible('hideRealImaginary') &&
        selectedSpectrumInfo &&
        selectedSpectrumInfo.isComplex && (
          <button
            css={styles}
            type="button"
            onClick={changeSpectrumViewHandler}
            className={'ci-icon-nmr-real-imag'}
          >
            <ToolTip
              title={
                isRealSpectrumShown ? 'Real Spectrum' : 'Imaginary Spectrum'
              }
              popupPlacement="right"
            />
          </button>
        )}
      {displayerMode === DISPLAYER_MODE.DM_1D &&
        isButtonVisible('hideSpectraCenterAlignments') && (
          <button
            css={styles}
            type="button"
            onClick={alignSpectrumsVerticallyHandler}
          >
            <ToolTip
              title={!verticalAlign.flag ? 'Align Center' : 'Bottom Align'}
              popupPlacement="right"
            >
              {!verticalAlign.flag ? 'CA' : 'BA'}
            </ToolTip>
          </button>
        )}
    </Fragment>
  );
};

export default ToolBarWrapper(memo(BasicToolBar));
