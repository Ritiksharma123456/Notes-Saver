import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { addToPastes, updateToPastes } from '../redux/PasteSlice';

const Home = () => {
    const[title,settitle]=useState('');
    const[value,setvalue]=useState('');
    const[searchparams,setsearchparams]=useSearchParams();
    const pasteId =searchparams.get("pasteId");
    console.log("pasteId:", pasteId); 

    const dispatch = useDispatch();
    const allPaste=useSelector((state)=>state.paste.pastes);
    useEffect( () => 
      {
        // console.log("pasteId:", pasteId); // Debug pasteId
        // console.log("allPaste:", allPaste); // Debug allPaste to check if data is loaded
      
        if(pasteId && allPaste.length > 0)
          {
            const paste=allPaste.find((p) => 
            p._id===pasteId);
            if(paste) {
              settitle(paste.title);
              setvalue(paste.content);
            }

            else {
              // If paste is not found, reset the fields or handle the error
              settitle('');
              setvalue('');
              
            }
            }
        
        } ,[pasteId,allPaste]);
      function createPaste() {
        const paste = {
          title: title,
         content: value,
         _id: pasteId ||
         Date.now().toString(36),
         createdAt:new Date().toISOString(),
        };
        console.log(paste);
       if(pasteId){
         //update
         dispatch(updateToPastes(paste));
       }
       else{
         //create
         dispatch(addToPastes(paste));
       }
       setsearchparams({});
       settitle(" ");
       setvalue( " ");
     }
       // Show loading if data is not ready
  if (pasteId && allPaste.length === 0) {
    return <div>Loading...</div>;
  }

   

  return (
<div>
<div className='flex flex-row gap-7 place-content-between'>
      <input className="p-1 bg-black rounded-2xl w-[66%] pl-4 mt-2"type='text' placeholder='enter title here'
      value={title} onChange={(e) => settitle(e.target.value)}
      >
      </input>
      <button onClick={createPaste} className="p-2 rounded-2xl   mt-2">
        {pasteId ?"Update Paste":"create My Paste"}
      </button>
    </div>
    <div className='mt-8 '>
        <textarea className='rounded-2xl bg-stone-950 min-w-[500px] p-4' rows={20} value={value} onChange={(e) =>setvalue(e.target.value)} placeholder='enter content here'></textarea>
    </div>
</div>
  )
}

export default Home
