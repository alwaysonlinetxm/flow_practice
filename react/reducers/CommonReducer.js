// @flow
import type { Action } from '../types/commonType';

type State = {
  +text: string,
  +total: number,
  +list: Array<string>
};

const initState: State = {
  text: 'init common',
  total: 1,
  list: []
};

export default function common(state: State = initState, action: Action): State {
  switch (action.type) {
    case "SET_TEXT": return { ...state, text: action.text };
    case "GET_LIST": return { ...state, list: ['001', '002', '003'] };
    default:
      (action: empty);
      return state;
  }
}
