import * as types from '../actions/ActionTypes';

const initialState = {
  gameId: 0,
};

export default function game(state = initialState, action) {
  switch (action.type) {
  case types.NEXT_GAME:
    return {
      gameId: state.gameId + 1,
    };
  case types.PREV_GAME:
    return {
      gameId: state.gameId - 1,
    };

  case types.RESET_GAME:
    return {
      gameId: 0,
    };

  default:
    return state;
  }
}
