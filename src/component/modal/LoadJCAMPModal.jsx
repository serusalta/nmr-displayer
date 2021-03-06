import { jsx, css } from '@emotion/core';
import { useRef, useCallback } from 'react';
/** @jsx jsx */
import { FaTimes } from 'react-icons/fa';

import { loadFile, extractFileMetaFromPath } from '../utility/FileUtility';

const styles = css`
  display: flex;
  flex-direction: column;
  width: 450px;
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
const allowedExtensions = ['dx', 'jdx'];

const LoadJCAMPModal = ({ onLoadClick, onClose, startLoading }) => {
  const pathReft = useRef();

  const loadJCAMPHandler = useCallback(() => {
    // ./data/xtc/XTC-814d_zg30.jdx
    const path = pathReft.current.value;
    const meta = extractFileMetaFromPath(path);
    if (allowedExtensions.includes(meta.extension)) {
      startLoading();
      loadFile(path).then((data) => {
        const file = {
          binary: data,
          name: meta.name,
          jcampURL: path,
        };
        onLoadClick(file);
      });
    } else {
      onLoadClick(null);
    }
  }, [onLoadClick, startLoading]);
  return (
    <div css={styles}>
      <div className="header">
        <span>Load JCAMP Dialog</span>
        <button onClick={onClose} type="button">
          <FaTimes />
        </button>
      </div>
      <div className="container">
        <input
          ref={pathReft}
          type="text"
          placeholder="Enter JCAMP file relative path ex: ./path/file.dx"
        />
        <button type="button" onClick={loadJCAMPHandler}>
          Load
        </button>
      </div>
    </div>
  );
};

LoadJCAMPModal.defaultProps = {
  onLoadButtonClick: () => {
    return null;
  },
  onClose: () => {
    return null;
  },
  startLoading: () => {
    return null;
  },
};
export default LoadJCAMPModal;
