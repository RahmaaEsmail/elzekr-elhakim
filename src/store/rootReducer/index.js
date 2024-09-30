import { combineReducers } from "redux";
import languageReducer from "../languageReducer";
import UserDataSlice from '../userinfo';
// import listSliceReducer from "../slices/listSlice";
import listSlice from '../slices/listSlice'
import scheduleSlice from "../slices/scheduleSlice";
export default combineReducers({
  language: languageReducer,
  userData:UserDataSlice,
  listSlice,
  scheduleSlice
  // listSlice:listSliceReducer
});
