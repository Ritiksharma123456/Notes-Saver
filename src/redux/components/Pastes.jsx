import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { removeFromPastes } from '../redux/PasteSlice';

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  const handleShare = async (paste) => {
    const shareData = {
      title: paste.title,
      text: paste.content,
      url: `https://yourapp.com/pastes/${paste._id}`, // Replace with your app's URL
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Paste shared successfully!');
      } catch (error) {
        toast.error('Error sharing paste.');
        console.error('Share failed:', error);
      }
    } else {
      // Fallback: Copy URL to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Share link copied to clipboard!');
      } catch (error) {
        toast.error('Failed to copy share link.');
        console.error('Clipboard error:',error);
      }
    }
  };

  return (
    <div>
      <input className="mt-5 pl-4 py-2 bg-black rounded-2xl min-w-[600px]" type='search' onChange={(e) =>
         setSearchTerm(e.target.value)} placeholder='search here' value={searchTerm}></input>
      <div className='flex flex-col gap-5 mt-2'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='border py-3' key={paste?._id}>
                  <div>
                    {paste.title}

                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex gap-4 place-content-evenly flex-row mt-3'>
                    <button>
                    <NavLink to={`/?pasteId=${paste?._id}`}>
                    Edit
                   </NavLink>
                    </button>
                    <button>
                    <NavLink to={`/pastes/${paste?._id}`}>
                     View
                    </NavLink>
                    </button>
                    <button onClick={() => handleDelete
                      (paste?._id)}>Delete </button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success(" copied to clipboard");
                    }}>Copy</button>
               <button onClick={() => handleShare(paste)}>Share</button>

                  </div>
                  <div className='mt-2'>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }

      </div>
    </div>
  )
}

export default Pastes
