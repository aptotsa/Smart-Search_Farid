import { useContext } from "react";
import createDataContext from "./createDataContext";

const SAVE_SEARCH = "SAVE_SEARCH";
const SET_OPTIONS = "SET_OPTIONS";
const SET_CURRENT_SEARCH = "SET_CURRENT_SEARCH";
const ADD_TO_SEARCH = "ADD_TO_SEARCH";

const iniState = {
  options: [],
  saved: [],
  current: [],
};

const recordsReducer = (state: any = iniState, action: any) => {
  switch (action.type) {
    case SET_OPTIONS:
      return {
        ...state,
        options: [...action.payload.options],
      };
    case SET_CURRENT_SEARCH:
      return {
        ...state,
        current: [...action.payload.search],
      };
    case ADD_TO_SEARCH:
      return {
        ...state,
        current: [...state.current, action.payload.search].filter(
          (value, index, self) => self.indexOf(value) === index
        ),
      };
    case SAVE_SEARCH:
      return {
        ...state,
        saved: [state.current.join(" "), ...state.saved],
      };
    default:
      return state;
  }
};

const setOptions = (dispatch: any) => {
  return (options: Array<string>) => {
    dispatch({ type: SET_OPTIONS, payload: { options } });
  };
};

const setCurrentSearch = (dispatch: any) => {
  return (search: Array<string>) => {
    dispatch({ type: SET_CURRENT_SEARCH, payload: { search } });
  };
};

const addToSearch = (dispatch: any) => {
  return (search: string) => {
    dispatch({ type: ADD_TO_SEARCH, payload: { search } });
  };
};

const saveSearch = (dispatch: any) => {
  return (search: Array<string>) => {
    dispatch({ type: SAVE_SEARCH, payload: { search } });
  };
};

export const { Context, Provider } = createDataContext(
  recordsReducer,
  { saveSearch, setOptions, setCurrentSearch, addToSearch },
  iniState
);

export const useSearch: any = () => {
  return useContext(Context);
};
