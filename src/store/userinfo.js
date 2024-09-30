import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants";
// import { BASE_URL } from "../CONSTS";
let localData=localStorage.getItem('elzekr_data');
let userData=localData&&JSON.parse(localData);
const initialState={
}
export const fetchInfoData= createAsyncThunk("Site/data",async()=>{
  const data= await axios.get(`${BASE_URL}user/user_info/${userData?.id||0}`)
  // console.log(data.data.result)
  return data.data.result;
})
export const SiteDataSlice=createSlice({
  name:'userinfo',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchInfoData.fulfilled,(state,action)=>{
      return action.payload;
    })
  }
})


export const {}=SiteDataSlice.actions;

export default SiteDataSlice.reducer;
