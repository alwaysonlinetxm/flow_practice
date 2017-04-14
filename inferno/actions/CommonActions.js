// @flow
import type { SetText, GetList } from '../types/commonType';

function setText(text: string): SetText {
  return { type: "SET_TEXT", text };
}

function getList(): GetList {
  return { type: "GET_LIST" };
}

export default { setText, getList };
