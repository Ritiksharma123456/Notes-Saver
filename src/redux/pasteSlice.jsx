import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
const initialState = {
  pastes:localStorage.getItem("pastes")
? JSON.parse(localStorage.getItem("pastes"))
: []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
   const paste =action.payload;
   state.pastes.push(paste);
   localStorage.setItem("pastes",JSON.stringify(state.pastes));
   toast.success("Paste successfully created ")
    },
    updateToPastes: (state,action) => {
      const paste =action.payload;
      const index =state.pastes.findIndex((item)=>  
      item._id=== paste._id)
  if(index>=0) {
    state.pastes[index] =paste;
    localStorage.setItem("pastes",JSON.stringify(state.pastes));
    toast.success("paste updated");
  }  else {
    toast.error("Paste not found to update");
  }

    },
    resetAllPastes: (state,action) => {
   state.pastes =[];
   localStorage.removeItem("pastes");
   toast.success("All pastes reset")

    },
    removeFromPastes: (state,action) => {
      const pasteId =action.payload;
      console.log(pasteId);
      const index =state.pastes.findIndex(item => 
      item._id===pasteId);
      if(index>=0) {
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("pastes deleted");
      }  else {
        toast.error("Paste not found to delete");
      }
    },
    
    
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes,removeFromPastes,resetAllPastes,updateToPastes } = pasteSlice.actions;

export default pasteSlice.reducer;