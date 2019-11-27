import * as types from './ActionTypes';

export function nextGame() {
  return {
    type: types.NEXT_GAME,
  };
}

export function prevGame() {
  return {
    type: types.PREV_GAME,
  };
}

export function resetGame() {
  return {
    type: types.RESET_GAME,
  };
}
