/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const styles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.25);
  height: 100%;
  flex-direction: column;
  user-select: none;
  position: absolute;
  width: 100%;
  height: 100%;
  outline: 10px dashed rgba(0, 0, 0, 0.3);
  outline-offset: -10px;

  p {
    padding: 15px 30px;
    background-color:rgba(0, 0, 0, 0.5);
    border-radius: 39px;
    color: white;
    font-size: x-large;
    font-weight: bold;

  }
}
`;
const NoData = ({ isEmpty = true }) => {
  if (!isEmpty) {
    return null;
  }

  return (
    <div css={styles}>
      <p>Drag and drop here a Jcamp or NMRium file</p>
    </div>
  );
};

export default NoData;
