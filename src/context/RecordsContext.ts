import { useContext } from "react";
import { Record } from "../models/Record";
import { filterRecords } from "../utils/filterRecords";
import createDataContext from "./createDataContext";

const MAX_RECORD_PER_PAGE = 40;

const SET_RECORDS = "SET_RECORDS";
const NEXT_PAGE = "NEXT_PAGE";
const FILTER_RECORDS = "FILTER_RECORDS";

const iniState = {
  records: [],
  filteredRecords: [],
  visibleRecords: [],
  currentPage: 0,
  nbPages: 0,
  total: 0,
  isSearching: false,
  recordsPerYear: [],
  recordsPerArdt: [],
  recordsPerType: [],
  isLoading: true,
};

const recordsReducer = (state: any = iniState, action: any) => {
  switch (action.type) {
    case SET_RECORDS:
      return {
        ...state,
        records: action.payload.records,
        filteredRecords: action.payload.records,
        visibleRecords: action.payload.records.slice(0, MAX_RECORD_PER_PAGE),
        nbPages: Math.ceil(
          action.payload.records.length / MAX_RECORD_PER_PAGE - 1
        ),
        total: action.payload.records.length,
        recordsPerYear: action.payload.yearsGroup,
        recordsPerArdt: action.payload.ardtsGroup,
        recordsPerType: action.payload.typesGroup,
        isLoading: false,
      };
    case NEXT_PAGE:
      return {
        ...state,
        visibleRecords: state.filteredRecords.slice(
          0,
          (state.currentPage + 1) * MAX_RECORD_PER_PAGE + MAX_RECORD_PER_PAGE
        ),
        currentPage: state.currentPage + 1,
      };
    case FILTER_RECORDS:
      const { years, ardts, types } = action.payload;
      const newRecords: Record[] = filterRecords(
        years,
        ardts,
        types,
        state.records
      );
      return {
        ...state,
        filteredRecords: newRecords,
        visibleRecords: newRecords.slice(0, MAX_RECORD_PER_PAGE),
        currentPage: 0,
        total: newRecords.length,
        isSearching: years.length > 0 || ardts.length > 0 || types.length > 0,
      };
    default:
      return state;
  }
};

const setRecords = (dispatch: any) => {
  return (records: any, yearsGroup: any, ardtsGroup: any, typesGroup: any) => {
    dispatch({
      type: SET_RECORDS,
      payload: { records, yearsGroup, ardtsGroup, typesGroup },
    });
  };
};

const nextPage = (dispatch: any) => {
  return () => {
    dispatch({ type: NEXT_PAGE });
  };
};

const filter = (dispatch: any) => {
  return (years: string[], ardts: string[], types: string[]) => {
    dispatch({ type: FILTER_RECORDS, payload: { years, ardts, types } });
  };
};

export const { Context, Provider } = createDataContext(
  recordsReducer,
  { setRecords, nextPage, filter },
  iniState
);

export const useRecords: any = () => {
  return useContext(Context);
};
