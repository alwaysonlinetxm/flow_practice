type SetText = { type: "SET_TEXT", text: string };
type GetList = { type: "GET_LIST" };

type Action = SetText | GetList;

export { Action, SetText, GetList };
