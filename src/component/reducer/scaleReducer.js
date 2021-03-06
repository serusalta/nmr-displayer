import { produce } from 'immer';

import { getXScale, getYScale } from '../1d/utilities/scale';

export const SET_X_SCALE = 'SET_X_SCALE';
export const SET_Y_SCALE = 'SET_Y_SCALE';

export const scaleInitialState = {
  scaleX: null,
  scaleY: null,
};

export function scaleReducer(state, action) {
  switch (action.type) {
    case SET_X_SCALE:
      return produce(state, (draft) => {
        draft.scaleX = (spectrumId = null) => getXScale(spectrumId, action);
      });
    case SET_Y_SCALE:
      return produce(state, (draft) => {
        draft.scaleY = (spectrumId = null) => getYScale(spectrumId, action);
      });
    default:
      return state;
  }
}
