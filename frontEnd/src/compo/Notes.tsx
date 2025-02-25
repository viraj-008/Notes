import React, { useEffect, useState } from "react";
import axios from "axios";
import  {ChromePicker}  from 'react-color';
import CreateNote from "./CreateNote";


interface NoteAPI {
  _id: string;
  title: string;
  content: string;
}


const Notes: React.FC = () => {


 const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('bg-gradient-to-r from-red-500 to-yellow-500 ');

const [noteState,setNoteState]=useState<NoteAPI[]>([])

  useEffect(()=>{
    axios.get("http://localhost:5000/api/notes/")
    .then((response) => {
      const sortedNotes = response.data.sort((a: NoteAPI, b: NoteAPI) => {
        if (a._id > b._id) return -1; 
        if (a._id < b._id) return 1;  
        return 0;
      });
      setNoteState(sortedNotes);
    })
    .catch(error => {
      console.error("Error fetching data from backend:", error);
    });
  
  },[noteState])

  const handleColorChange = (color: any) => {
    setBackgroundColor(color.hex);
    setShowColorPicker(false);
  };


  const handleDelete = (id: string) => {
    axios
    .delete(`http://localhost:5000/api/notes/${id}`)
    .then(() => {
        setNoteState((prevState) => prevState.filter((note) => note._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting the note:", error);
      });
    };
    return (
      <>
      <CreateNote/>
      <div className="  mt-6 py-4  ">
      <div className="flex justify-end w-[90%]  mx-auto">
        <button className=" my-3 text-red-600 bg-white  py-2 rounded-md font-bold  px-2"
         onClick={() => setShowColorPicker(!showColorPicker)}>
         Change color 
        </button>
        {showColorPicker && (
          <ChromePicker color={backgroundColor} onChange={handleColorChange} />
        )}
      </div>
      {noteState.length > 0 ? (
        noteState.map((note) => (
          <div   style={{ backgroundColor }}
            key={note._id} 
            className={` mx-auto w-[93%] shadow-lg py-4 p-2 rounded-md my-4  ${ backgroundColor }`}
          >
            <h3 className="text-white font-semibold"><span className="font-extrabold text-black">Title: </span>{note.title}</h3>
            <p className="text-white font-serif"><span className="font-extrabold extext-black">Containt: </span> {note.content}</p>

            <div className="flex justify-between ">
            <button
              className=" my-3 bg-white text-red-600  py-1 rounded-md font-bold shadow-md px-2 "
              onClick={() => handleDelete(note._id)}
            >
              Delete
            </button>

              </div>

          </div>
        ))
      ) : (
        <p className="text-center mx-auto font-serif font-bold my-8">
          No notes yet!
        </p>
      )}

    </div>
      </>
  );
};

export default Notes;

