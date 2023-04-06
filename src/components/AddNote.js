import React, { useState } from 'react'

import { useContext } from "react"
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context   //Destructuring 

    const [note, setNote] = useState({title:"", description:"", tag:""})

    const AddingNote =(e)=>{
      e.preventDefault()   //Added this so that the page does not load when we click submit.
      addNote(note.title, note.description, note.tag)
      setNote({title:"", description:"", tag:""})
      props.showAlert("Added successfully", "success")
      

    }

    const onchange = (e)=>{
        //The significane of "...note" here is that a new object is created with setnote which hass all the properties of note just the updation is
        //[e.target.name]:e.target.value .
        setNote({...note, [e.target.name]:e.target.value})   
      //The [e.target.name]: e.target.value syntax creates a new property on the object with the key equal to the value of e.target.name and
      //the value equal to e.target.value. This allows you to update a specific property of the note object based on the name attribute of the
      //input element that triggered the event.
    }
  return (
    <div>
    <div className="row">
      <div className="container my-3 mx-auto col-10 col-md-6 col-lg-10 ">
        <h2>Add your notes here</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title'value={note.title} aria-describedby="emailHelp"
             onChange={onchange} minLength={3} required/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description"value={note.description} name='description'
             onChange={onchange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onchange} value={note.tag} minLength={3} required/>
          </div> 
          <button type="submit" disabled={note.title<3 || note.description<5 } className="btn btn-outline-light" onClick={AddingNote}>Add Note</button>
        </form>
        </div>
        </div>

        
      
    </div>
  )
}

export default AddNote
