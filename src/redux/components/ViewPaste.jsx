import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const ViewPaste = () => {
  const {id} =useParams();
  const allPastes=useSelector((state)=> state.paste.pastes);
  const paste= allPastes.filter((p) => p._id === id) [0];
  console.log("final Paste:",paste);
  return (
    <div>
    <div className='flex flex-row gap-7 place-content-between'>
          <input disabled className="p-1 bg-black rounded-2xl w-[66%] pl-4 mt-2"type='text' placeholder='enter title here'
          value={paste.title} onChange={(e) => settitle(e.target.value)}
          >
          </input>
          {/* <button onClick={createPaste} className="p-2 rounded-2xl   mt-2">
            {pasteId ?"Update Paste":"create My Paste"}
          </button> */}
        </div>
        <div className='mt-8 '>
            <textarea disabled className='rounded-2xl bg-stone-950 min-w-[500px] p-4' rows={20} value={paste.content} onChange={(e) =>setvalue(e.target.value)} placeholder='enter content here'></textarea>
        </div>
    </div>
  )
}

export default ViewPaste
